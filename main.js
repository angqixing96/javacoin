const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}


class Block{
    constructor(
        // index, 
        timestamp, 
        transactions, 
        previousHash = ''){
        // this.index = index; // attributes
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash(); // using method to calculate attribute
        this.nonce = 0;
    }

    calculateHash(){ // method
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
        console.log("Block nonce used: " + this.nonce);
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block(
        //    0, 
            "01/01/2017", 
            "Genesis Block", 
            "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     // newBlock.hash = newBlock.calculateHash();
    //     newBlock.mineBlock(this.difficulty)
    //     this.chain.push(newBlock);
    // }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        
        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){ // if data change, recalculate hash is different output
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        
        return true;
        }
    }
}

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