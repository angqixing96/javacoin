// let javacoin = new Blockchain();
// javacoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
// javacoin.addBlock(new Block(2, "12/07/2017", { amount: 10 }));
// javacoin.addBlock(new Block(3, "14/07/2017", { amount: 12 }));

// console.log('Is Blockchain valid? ' + javacoin.isChainValid());
// console.log(JSON.stringify(javacoin, null, 4));

// javacoin.chain[1].data = { amount: 100 }; // changing data
// javacoin.chain[1].hash = javacoin.chain[1].calculateHash(); // recalculate hash

// console.log('Is Blockchain valid? ' + javacoin.isChainValid());
// console.log(JSON.stringify(javacoin, null, 4));

// when a block breaks the chain during blockchain validation, should roll back change to correct state
// ensures integrity of blockchain informatin


// console.log('Mining block 1...')
// javacoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));

// console.log('Mining block 2...')

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


