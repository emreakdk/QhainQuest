// Testnet Connection Utilities
// This file provides utilities to test and verify testnet connections

import { TESTNET_CONFIG, getRpcUrl, getNetworkPassphrase, isTestnet } from '../config/testnet.js';

/**
 * Test the connection to Stellar Testnet
 * @returns {Promise<Object>} Connection test result
 */
export async function testTestnetConnection() {
  const result = {
    success: false,
    environment: TESTNET_CONFIG.environment,
    rpcUrl: getRpcUrl(),
    networkPassphrase: getNetworkPassphrase(),
    timestamp: new Date().toISOString(),
    tests: []
  };

  try {
    // Test 1: Environment check
    result.tests.push({
      name: 'Environment Check',
      success: isTestnet(),
      message: isTestnet() ? 'Running on testnet' : 'Not running on testnet'
    });

    // Test 2: RPC URL validation
    const rpcUrl = getRpcUrl();
    result.tests.push({
      name: 'RPC URL Validation',
      success: rpcUrl && rpcUrl.includes('testnet'),
      message: rpcUrl ? `RPC URL: ${rpcUrl}` : 'RPC URL not configured'
    });

    // Test 3: Network passphrase validation
    const networkPassphrase = getNetworkPassphrase();
    result.tests.push({
      name: 'Network Passphrase Validation',
      success: networkPassphrase && networkPassphrase.includes('Test'),
      message: networkPassphrase ? 'Testnet passphrase configured' : 'Network passphrase not configured'
    });

    // Test 4: Contract addresses check
    const chainquestContract = TESTNET_CONFIG.contracts.chainquest;
    const tokenContract = TESTNET_CONFIG.contracts.token;
    
    result.tests.push({
      name: 'Contract Addresses Check',
      success: chainquestContract !== 'CONTRACT_ADDRESS_HERE' && tokenContract !== 'TOKEN_ADDRESS_HERE',
      message: chainquestContract === 'CONTRACT_ADDRESS_HERE' ? 
        'Contract addresses need to be deployed' : 
        'Contract addresses configured'
    });

    // Test 5: Feature flags check
    result.tests.push({
      name: 'Feature Flags Check',
      success: TESTNET_CONFIG.features.enableTokenRewards && TESTNET_CONFIG.features.enableCertificates,
      message: 'Feature flags configured'
    });

    // Overall success
    result.success = result.tests.every(test => test.success);

    console.log('Testnet Connection Test Results:', result);
    return result;

  } catch (error) {
    result.tests.push({
      name: 'Connection Test Error',
      success: false,
      message: `Error: ${error.message}`
    });

    console.error('Testnet connection test failed:', error);
    return result;
  }
}

/**
 * Get testnet status information
 * @returns {Object} Testnet status
 */
export function getTestnetStatus() {
  return {
    environment: TESTNET_CONFIG.environment,
    rpcUrl: getRpcUrl(),
    networkPassphrase: getNetworkPassphrase(),
    contracts: TESTNET_CONFIG.contracts,
    features: TESTNET_CONFIG.features,
    isTestnet: isTestnet(),
    timestamp: new Date().toISOString()
  };
}

/**
 * Validate testnet configuration
 * @returns {Object} Validation result
 */
export function validateTestnetConfig() {
  const issues = [];
  const warnings = [];

  // Check required configurations
  if (!getRpcUrl()) {
    issues.push('RPC URL is not configured');
  }

  if (!getNetworkPassphrase()) {
    issues.push('Network passphrase is not configured');
  }

  if (TESTNET_CONFIG.contracts.chainquest === 'CONTRACT_ADDRESS_HERE') {
    warnings.push('ChainQuest contract address needs to be deployed');
  }

  if (TESTNET_CONFIG.contracts.token === 'TOKEN_ADDRESS_HERE') {
    warnings.push('Token contract address needs to be deployed');
  }

  if (TESTNET_CONFIG.contracts.certificate === 'CERTIFICATE_CONTRACT_ADDRESS_HERE') {
    warnings.push('Certificate contract address needs to be deployed');
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings,
    timestamp: new Date().toISOString()
  };
}

/**
 * Get testnet configuration summary
 * @returns {Object} Configuration summary
 */
export function getTestnetSummary() {
  const validation = validateTestnetConfig();
  
  return {
    environment: TESTNET_CONFIG.environment,
    rpcUrl: getRpcUrl(),
    networkPassphrase: getNetworkPassphrase(),
    contracts: {
      chainquest: TESTNET_CONFIG.contracts.chainquest,
      token: TESTNET_CONFIG.contracts.token,
      certificate: TESTNET_CONFIG.contracts.certificate
    },
    quest: {
      defaultReward: TESTNET_CONFIG.quest.defaultReward,
      maxAttempts: TESTNET_CONFIG.quest.maxAttempts,
      timeout: TESTNET_CONFIG.quest.timeout
    },
    features: TESTNET_CONFIG.features,
    validation,
    timestamp: new Date().toISOString()
  };
}

// Export default functions
export default {
  testTestnetConnection,
  getTestnetStatus,
  validateTestnetConfig,
  getTestnetSummary
};
