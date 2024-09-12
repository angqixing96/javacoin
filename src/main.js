const {Blockchain, Transaction} = require('./blockchain');

let javacoin = new Blockchain();
javacoin.createTransaction(new Transaction('address1', 'address2', 100));
javacoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner... ')
javacoin.minePendingTransactions('xavier-address');
console.log('\nBalance of xavier is', javacoin.getBalanceOfAddress('xavier-address'));

console.log('\n Starting the miner again2... ')
javacoin.minePendingTransactions('xavier-address');
console.log('\nBalance of xavier is', javacoin.getBalanceOfAddress('xavier-address'));

console.log('\n Starting the miner again3... ')
javacoin.minePendingTransactions('xavier-address');
console.log('\nBalance of xavier is', javacoin.getBalanceOfAddress('xavier-address'));