/**
 * Truncates a Stellar public key to show first 4 and last 4 characters
 * @param {string} key - The full public key
 * @returns {string} - Truncated key in format "GABC...XYZ1"
 */
export const truncatePublicKey = (key) => {
  if (!key || typeof key !== 'string') {
    return '';
  }
  if (key.length <= 8) {
    return key;
  }
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};

