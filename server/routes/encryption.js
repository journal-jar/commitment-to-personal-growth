const crypto = require('crypto'); // Node.js crypto module for encryption/decryption

// Load encryption key from .env
const encryptionKey = process.env.ENCRYPTION_KEY;

// Encryption function
function encrypt(data) {
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decryption function
function decrypt(data) {
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {
    encrypt,
    decrypt
}