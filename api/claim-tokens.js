
const StellarSdk = require('stellar-sdk');

let server, Network, Keypair, Asset, Operation, TransactionBuilder;

try {
  const SDK = StellarSdk.default || StellarSdk;
  
  server = new SDK.Horizon.Server('https://horizon-testnet.stellar.org');
  
  Network = SDK.Network;
  Keypair = SDK.Keypair;
  Asset = SDK.Asset;
  Operation = SDK.Operation;
  TransactionBuilder = SDK.TransactionBuilder;
  
  console.log('Stellar SDK initialized successfully');
} catch (error) {
  console.error('Stellar SDK initialization failed:', error);
  throw new Error('Failed to initialize Stellar SDK');
}

const TOKEN_CODE = process.env.TOKEN_CODE || 'CQT';
const TOKEN_ISSUER = process.env.TOKEN_ISSUER_PUBLIC_KEY;
const DISTRIBUTOR_SECRET_KEY = process.env.DISTRIBUTOR_SECRET_KEY;
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

try {
  if (Network && typeof Network.use === 'function') {
    Network.use(new Network(NETWORK_PASSPHRASE));
    console.log('Stellar Network initialized successfully');
  } else {
    console.warn('Network.use not available, using default network configuration');
  }
} catch (error) {
  console.error('Network initialization failed:', error);
}

/**
 * Token Claim API Endpoint
 * 
 * Handles token distribution to users via Stellar network.
 * Cloud-function-friendly: Stateless handler suitable for serverless deployment.
 * 
 * TODO: For Huawei FunctionGraph deployment:
 * - Ensure environment variables (TOKEN_CODE, TOKEN_ISSUER_PUBLIC_KEY, DISTRIBUTOR_SECRET_KEY) are set
 * - Configure API Gateway to route /api/claim-tokens to this function
 * - Set appropriate timeout (30s recommended)
 * - Consider adding rate limiting at API Gateway level
 */
export default async function handler(req, res) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const startTime = Date.now();

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  console.log(`[${requestId}] Token claim request received`);

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    const { userAddress, amount } = req.body;

    if (!userAddress || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userAddress and amount are required.'
      });
    }

    if (!userAddress.match(/^G[A-Z2-7]{55}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Stellar address format. Must start with G and be 56 characters long.'
      });
    }

    const claimAmount = parseFloat(amount);
    if (isNaN(claimAmount) || claimAmount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount. Must be a positive number.'
      });
    }

    if (!TOKEN_ISSUER || !DISTRIBUTOR_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Token configuration missing. Please set TOKEN_ISSUER_PUBLIC_KEY and DISTRIBUTOR_SECRET_KEY environment variables.'
      });
    }

    const paymentResult = await performTokenPayment(userAddress, claimAmount);

    if (!paymentResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Token payment failed.',
        details: paymentResult.error
      });
    }

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
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] Token claim error after ${duration}ms:`, error);
    console.error(`[${requestId}] Error stack:`, error.stack);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
      details: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred. Please try again later.',
      requestId
    });
  }
}

async function performTokenPayment(userAddress, amount) {
  try {
    console.log('--- TOKEN CLAIM DIAGNOSTIC ---');
    console.log('User Address:', userAddress);
    console.log('Claim Amount:', amount);
    console.log('Token Code:', TOKEN_CODE);
    console.log('Token Issuer:', TOKEN_ISSUER);

    if (!Asset || !Keypair || !Operation || !TransactionBuilder) {
      throw new Error('Stellar SDK components not properly initialized');
    }

    const customAsset = new Asset(TOKEN_CODE, TOKEN_ISSUER);

    const distributorKeypair = Keypair.fromSecret(DISTRIBUTOR_SECRET_KEY);
    const distributorPublicKey = distributorKeypair.publicKey();
    const distributorAccount = await server.loadAccount(distributorPublicKey);

    console.log('Distributor Account:', distributorPublicKey);
    console.log('User Destination:', userAddress);

    const paymentOperation = Operation.payment({
      destination: userAddress,
      asset: customAsset,
      amount: amount.toString()
    });

    const transaction = new TransactionBuilder(distributorAccount, {
      fee: '100', // Base fee
      networkPassphrase: NETWORK_PASSPHRASE
    })
      .addOperation(paymentOperation)
      .setTimeout(30) // 30 seconds timeout
      .build();

    transaction.sign(distributorKeypair);

    const result = await server.submitTransaction(transaction);

    console.log('Transaction successful:', result.hash);

    return {
      success: true,
      transactionHash: result.hash
    };

  } catch (error) {
    console.error('Token payment error:', error);
    
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
