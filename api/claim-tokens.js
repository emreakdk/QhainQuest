// ✅ Load environment variables first (before any other imports that might need them)
import dotenv from 'dotenv';
dotenv.config();

import StellarSdk from 'stellar-sdk';

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

// Debug: Log environment variable status (only in development)
if (process.env.NODE_ENV !== 'production') {
  console.log('[claim-tokens] Environment variables loaded:');
  console.log(`  TOKEN_CODE: ${TOKEN_CODE}`);
  console.log(`  TOKEN_ISSUER: ${TOKEN_ISSUER ? '✅ Set' : '❌ Missing'}`);
  console.log(`  DISTRIBUTOR_SECRET_KEY: ${DISTRIBUTOR_SECRET_KEY ? '✅ Set' : '❌ Missing'}`);
}

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

    console.log(`[${requestId}] Calling performTokenPayment for ${userAddress}, amount: ${claimAmount}`);
    
    const paymentResult = await performTokenPayment(userAddress, claimAmount);

    if (!paymentResult.success) {
      console.error(`[${requestId}] Token payment failed:`, paymentResult.error);
      return res.status(500).json({
        success: false,
        error: 'Token payment failed.',
        details: paymentResult.error,
        requestId
      });
    }

    console.log(`[${requestId}] ✅ Token payment successful. Transaction hash: ${paymentResult.transactionHash}`);

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
    console.log('Distributor Secret Key:', DISTRIBUTOR_SECRET_KEY ? '✅ Set' : '❌ Missing');

    // Validate environment variables
    if (!TOKEN_ISSUER || !DISTRIBUTOR_SECRET_KEY) {
      const errorMsg = 'Token configuration missing. TOKEN_ISSUER or DISTRIBUTOR_SECRET_KEY not set.';
      console.error('❌', errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }

    if (!Asset || !Keypair || !Operation || !TransactionBuilder) {
      const errorMsg = 'Stellar SDK components not properly initialized';
      console.error('❌', errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }

    const customAsset = new Asset(TOKEN_CODE, TOKEN_ISSUER);

    let distributorKeypair;
    try {
      distributorKeypair = Keypair.fromSecret(DISTRIBUTOR_SECRET_KEY);
    } catch (keyError) {
      const errorMsg = `Invalid distributor secret key: ${keyError.message}`;
      console.error('❌', errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }

    const distributorPublicKey = distributorKeypair.publicKey();
    console.log('Distributor Account:', distributorPublicKey);
    console.log('User Destination:', userAddress);

    let distributorAccount;
    try {
      distributorAccount = await server.loadAccount(distributorPublicKey);
      console.log('✅ Distributor account loaded successfully');
    } catch (accountError) {
      const errorMsg = `Failed to load distributor account: ${accountError.message}`;
      console.error('❌', errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }

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

    console.log('Signing transaction...');
    transaction.sign(distributorKeypair);

    console.log('Submitting transaction to Stellar network...');
    const result = await server.submitTransaction(transaction);

    console.log('✅ Transaction successful! Hash:', result.hash);

    return {
      success: true,
      transactionHash: result.hash
    };

  } catch (error) {
    console.error('❌ Token payment error:', error);
    console.error('Error stack:', error.stack);
    
    if (error.response && error.response.data) {
      console.error('Stellar Horizon Error Response:', error.response.data);
      
      if (error.response.data.extras && error.response.data.extras.result_codes) {
        const resultCodes = error.response.data.extras.result_codes;
        console.error('Stellar Transaction Error Codes:', resultCodes);
        
        let errorMsg = 'Stellar transaction failed: ';
        if (resultCodes.transaction) {
          errorMsg += `Transaction: ${resultCodes.transaction}. `;
        }
        if (resultCodes.operations && resultCodes.operations.length > 0) {
          errorMsg += `Operations: ${resultCodes.operations.join(', ')}.`;
        }
        
        return {
          success: false,
          error: errorMsg
        };
      }
    }
    
    return {
      success: false,
      error: error.message || 'Unknown error during token payment'
    };
  }
}
