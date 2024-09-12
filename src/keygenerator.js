const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // elliptic curve

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log();
console.log('Private key:', privateKey) // sign transactions and verify balance in wallet

console.log();
console.log('Public key:', publicKey);

// Private key: 27004f667e3975948b752da00b9355d56c6d7f5063eb3e6e04b6c15aba639458

// Public key: 04b581f5dec6265ebb51b48cc78d688f80c7afda006008fd5c12c787d2ba4eeec5ffbfc2958cf4e83beb741db9032834735c056fbd1ed63ebf0d323c5530f61ae4
