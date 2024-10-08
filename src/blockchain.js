const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // elliptic curve

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString(); // not signing all data in transactions but only hash of transaction
    }

    signTransaction(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sign transactions for other wallets!');
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64'); // signing the hash of transaction using base64
        this.signature = sig.toDER('hex'); // signing in special hex format
    }

    isValid(){
        if(this.fromAddress === null) return true; // assume transaction is valid when null

        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature in this transaction'); // needs signature for transaction to be valid
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature); // need to verify if the signature is correct
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

    hasValidTransaction(){ // to verify all transactions in a block
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }

        return true;
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

    addTransaction(transaction){

        if(!transaction.fromAddress || !transaction.toAddress){ // check to and from address are filled in for transaction
            throw new Error('Transaction must include from and to address');
        }

        if(!transaction.isValid()){ // verify if transaction valid in first place
            throw new Error('Cannot add invalid transaction to chain');
        }
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
            const previousBlock = this.chain[i - 1]; // goes through every block and transaction

            if(!currentBlock.hasValidTransaction()){ // if not all transaction are valid, it is false
                return false;
            }
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

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;