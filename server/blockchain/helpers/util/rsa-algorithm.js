const crypto = require('crypto');

class RSAAlgorithm {
  encryptStringWithRsaPublicKey(toEncrypt, publicKey) {
    return toEncrypt;
    const buffer = Buffer.from(toEncrypt);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  }

  decryptStringWithRsaPrivateKey(toDecrypt, privateKey) {
    return toDecrypt;
    const buffer = Buffer.from(toDecrypt, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
  }
}

module.exports = RSAAlgorithm;
