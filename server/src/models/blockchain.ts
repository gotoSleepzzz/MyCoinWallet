import * as CryptoJS from "crypto-js";
import * as EC from "elliptic";
import { Transaction } from "./transaction";
import { Block } from "./block";

// in seconds
const BLOCK_GENERATION_INTERVAL: number = 10;

// in blocks
const DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;

class BlockChain {
    public chain: Block[];
    public difficulty: number;
    public pendingTransactions: any[];
    public unspentTxOuts: any[];

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4; // Adjust the difficulty as per your requirements
        this.pendingTransactions = [];
    }
    createGenesisBlock(): Block {
        return new Block(
            0, '91a73664bc84c0baa1fc75ea6e4aa6d1d20c5df664c724e3159aefc2e1186627', '', 1465154705, [], 0, 0
        );
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    // TODO
    createTransaction(from: string, to: string, amount: number, privateKey: string): void {
        // this.pendingTransactions.push(transaction);
    }

    getBalance(address: string): number {
        return this.findUnspentTxOuts(address).reduce((a, b) => a + b.amount, 0);
    }

    findUnspentTxOuts(address: string) {
        return this.unspentTxOuts.filter((uTxO: UnspentTxOut) => uTxO.address === address);
    };

    // TODO
    getTransactionFromWallet(address: string): any[] {
        let history: any[] = [];
        return history;
    }

    // TODO
    getTransaction(from: string, to: string): any[] {
        let transactions: any[] = [];
        return transactions;
    }

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
}

export { BlockChain };