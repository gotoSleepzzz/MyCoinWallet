import * as CryptoJS from "crypto-js";
import * as EC from "elliptic";
import { Transaction, UnspentTxOut, getCoinbaseTransaction, isValidAddress, processTransactions } from "./transaction";
import { Block } from "./block";
import { getCurrentTimestamp, isValidTimestamp } from "../utils/util";
import { mine } from "../utils/miner";
import { addToTransactionPool, getTransactionPool, updateTransactionPool } from "../utils/transactionPool";
import _ from "lodash";
import { Wallet, createTransaction, getPublickey } from "./wallet";

// in seconds
const BLOCK_GENERATION_INTERVAL: number = 10;

// in blocks
const DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;

class BlockChain {
    public chain: Block[];
    public difficulty: number;
    public pendingTransactions: any[];
    public unspentTxOuts: UnspentTxOut[];
    public io: any;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4; // Adjust the difficulty as per your requirements
        this.pendingTransactions = [];
        this.unspentTxOuts = [];
    }

    createGenesisBlock(): Block {
        return new Block(
            0, '89eb0ac031a63d2421cd05a2fbe41f3ea35f5c3712ca839cbf6b85c4ee07b7a3', '', 1465154705, [], 0, 0
        );
    }

    getBlocks(): Block[] {
        return this.chain;
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    getBalance(address: string): number {
        return this.findUnspentTxOuts(address).reduce((a, b) => a + b.amount, 0);
    }

    findUnspentTxOuts(address: string) {
        return this.unspentTxOuts.filter((uTxO: UnspentTxOut) => uTxO.address === address);
    };

    getDifficulty(): number {
        const latestBlock: Block = this.chain[this.chain.length - 1];
        if (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
            return this.getAdjustedDifficulty(latestBlock);
        } else {
            return latestBlock.difficulty;
        }
    };

    getAdjustedDifficulty(latestBlock: Block): number {
        const prevAdjustmentBlock: Block = this.chain[this.chain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
        const timeExpected: number = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
        const timeTaken: number = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
        if (timeTaken < timeExpected / 2) {
            return prevAdjustmentBlock.difficulty + 1;
        } else if (timeTaken > timeExpected * 2) {
            return prevAdjustmentBlock.difficulty - 1;
        } else {
            return prevAdjustmentBlock.difficulty;
        }
    };

    getUnspentTxOuts = (): UnspentTxOut[] => _.cloneDeep(this.unspentTxOuts);

    isValidNewBlock = (newBlock: Block, previousBlock: Block): boolean => {
        if (!newBlock.isValidBlockStructure()) {
            console.log('invalid block structure: %s', JSON.stringify(newBlock));
            return false;
        }
        if (previousBlock.index + 1 !== newBlock.index) {
            console.log('invalid index');
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash) {
            console.log('invalid previoushash');
            return false;
        } else if (!isValidTimestamp(newBlock, previousBlock)) {
            console.log('invalid timestamp');
            return false;
        } else if (!newBlock.hasValidHash()) {
            return false;
        }
        return true;
    };

    // and txPool should be only updated at the same time
    setUnspentTxOuts = (newUnspentTxOut: UnspentTxOut[]) => {
        console.log('replacing unspentTxouts with: %s', newUnspentTxOut);
        this.unspentTxOuts = newUnspentTxOut;
    };

    addBlockToChain = (newBlock: Block): boolean => {
        if (this.isValidNewBlock(newBlock, this.getLatestBlock())) {
            const retVal: UnspentTxOut[] = processTransactions(newBlock.data, this.getUnspentTxOuts(), newBlock.index) as UnspentTxOut[];
            if (retVal === null) {
                console.log('block is not valid in terms of transactions');
                return false;
            } else {
                this.chain.push(newBlock);
                this.setUnspentTxOuts(retVal);
                updateTransactionPool(this.unspentTxOuts);
                return true;
            }
        }
        return false;
    };

    generateRawNextBlock = (blockData: Transaction[]) => {
        const previousBlock: Block = this.getLatestBlock();
        const difficulty: number = this.getDifficulty();
        const nextIndex: number = previousBlock.index + 1;
        const nextTimestamp: number = getCurrentTimestamp();
        const newBlock: Block = mine(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
        if (this.addBlockToChain(newBlock)) {
            // broadcastLatest();
            return newBlock;
        } else {
            return null;
        }
    };

    generateNextBlock = (address: string) => {
        // TODO: private key
        const coinbaseTx: Transaction = getCoinbaseTransaction(address, this.getLatestBlock().index + 1);
        const blockData: Transaction[] = [coinbaseTx].concat(getTransactionPool());
        return this.generateRawNextBlock(blockData);
    }

    generateNextBlockWithTransaction = (sender: Wallet, recipientAddress: string, amount: number) => {
        if (!isValidAddress(recipientAddress)) {
            throw Error('invalid address');
        }
        if (typeof amount !== 'number') {
            throw Error('invalid amount');
        }
        const coinbaseTx: Transaction = getCoinbaseTransaction(sender.address, this.getLatestBlock().index + 1);
        const tx: Transaction = createTransaction(recipientAddress, amount, sender.privateKey, this.getUnspentTxOuts(), getTransactionPool());
        const blockData: Transaction[] = [coinbaseTx, tx];
        return this.generateRawNextBlock(blockData);
    }

    sendTransaction = (sender: Wallet, recipient: string, amount: number) => {
        const tx: Transaction = createTransaction(recipient, amount, sender.privateKey, this.getUnspentTxOuts(), getTransactionPool());
        addToTransactionPool(tx, this.getUnspentTxOuts());
        // broadcastTransactionPool();
        return tx;
    }
}

export { BlockChain };