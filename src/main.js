const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // elliptic curve

const myKey = ec.keyFromPrivate('27004f667e3975948b752da00b9355d56c6d7f5063eb3e6e04b6c15aba639458')
const myWalletAddress = myKey.getPublic('hex'); // hex format, my walletaddress is my crypto wallet

let javacoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
javacoin.addTransaction(tx1);

console.log('\n Starting the miner ...');
javacoin.minePendingTransactions(myWalletAddress);

console.log('\n Balance of xavier guy is', javacoin.getBalanceOfAddress(myWalletAddress))
