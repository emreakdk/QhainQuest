// Vercel Serverless Function for Token Claiming
// This function handles secure token distribution for claimable balances

// Import stellar-sdk for CommonJS environment
const StellarSdk = require('stellar-sdk');

// Initialize Stellar server for testnet
const server = new StellarSdk.default.Horizon.Server('https://horizon-testnet.stellar.org');

// --- Configuration ---
const TOKEN_CODE = process.env.TOKEN_CODE || 'CQT';
const TOKEN_ISSUER = process.env.TOKEN_ISSUER_PUBLIC_KEY;
const DISTRIBUTOR_SECRET_KEY = process.env.DISTRIBUTOR_SECRET_KEY;
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

// Initialize Stellar SDK Network
StellarSdk.default.Network.use(new StellarSdk.default.Network(NETWORK_PASSPHRASE));

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const { userAddress, amount } = req.body;

    // Validate required fields
    if (!userAddress || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userAddress and amount are required.'
      });
    }

    // Validate Stellar address format
    if (!userAddress.match(/^G[A-Z2-7]{55}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Stellar address format. Must start with G and be 56 characters long.'
      });
    }

    // Validate amount is a positive number
    const claimAmount = parseFloat(amount);
    if (isNaN(claimAmount) || claimAmount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount. Must be a positive number.'
      });
    }

    // Check environment variables
    if (!TOKEN_ISSUER || !DISTRIBUTOR_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Token configuration missing. Please set TOKEN_ISSUER_PUBLIC_KEY and DISTRIBUTOR_SECRET_KEY environment variables.'
      });
    }

    // Perform Stellar token payment
    const paymentResult = await performTokenPayment(userAddress, claimAmount);

    if (!paymentResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Token payment failed.',
        details: paymentResult.error
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Tokens claimed successfully!',
      data: {
        transactionHash: paymentResult.transactionHash,
        amount: claimAmount,
        tokenCode: TOKEN_CODE,
        claimedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Token claim error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
      details: error.message
    });
  }
}

// Perform the actual Stellar token payment
async function performTokenPayment(userAddress, amount) {
  try {
    console.log('--- TOKEN CLAIM DIAGNOSTIC ---');
    console.log('User Address:', userAddress);
    console.log('Claim Amount:', amount);
    console.log('Token Code:', TOKEN_CODE);
    console.log('Token Issuer:', TOKEN_ISSUER);

    // Create the custom asset
    const customAsset = new StellarSdk.default.Asset(TOKEN_CODE, TOKEN_ISSUER);

    // Load the distributor account
    const distributorKeypair = StellarSdk.default.Keypair.fromSecret(DISTRIBUTOR_SECRET_KEY);
    const distributorPublicKey = distributorKeypair.publicKey();
    const distributorAccount = await server.loadAccount(distributorPublicKey);

    console.log('Distributor Account:', distributorPublicKey);
    console.log('User Destination:', userAddress);

    // Create the payment operation
    const paymentOperation = StellarSdk.default.Operation.payment({
      destination: userAddress,
      asset: customAsset,
      amount: amount.toString()
    });

    // Build the transaction
    const transaction = new StellarSdk.default.TransactionBuilder(distributorAccount, {
      fee: '100', // Base fee
      networkPassphrase: StellarSdk.default.Networks.TESTNET
    })
      .addOperation(paymentOperation)
      .setTimeout(30) // 30 seconds timeout
      .build();

    // Sign the transaction
    transaction.sign(distributorKeypair);

    // Submit the transaction
    const result = await server.submitTransaction(transaction);

    console.log('Transaction successful:', result.hash);

    return {
      success: true,
      transactionHash: result.hash
    };

  } catch (error) {
    console.error('Token payment error:', error);
    
    // More detailed error handling for Stellar SDK errors
    if (error.response && error.response.data && error.response.data.extras) {
      console.error('Stellar Transaction Error:', error.response.data.extras.result_codes);
      return {
        success: false,
        error: `Stellar transaction failed: ${JSON.stringify(error.response.data.extras.result_codes)}`
      };
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}
