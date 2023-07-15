import * as CryptoJS from "crypto-js";
import * as EC from "elliptic";
import { Transaction } from "./transaction";
import e from "express";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    //
    public data: Transaction[];
    public timestamp: number;
    //
    public difficulty: number;
    public nonce: number;

    constructor(index: number, hash: string, previousHash: string, timestamp: number, data: Transaction[], difficulty: number, nonce: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;

        this.data = data;
        this.timestamp = timestamp;
    }

    calcHash(): string {
        return CryptoJS.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.difficulty + this.nonce).toString();
    }

    calcHashWithNone(nonce: number): string {
        return CryptoJS.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.difficulty + nonce).toString();
    }

    calcHashUpdateNonce(nonce: number): string {
        this.nonce = nonce;
        return this.calcHash();
    }

    hashMatchDifficult(hash: string, difficult: number) : boolean {
        const difficultString = '0'.repeat(difficult);
        return hash.startsWith(difficultString);
    }
}

const hashMatchesBlockContent = (block: Block): boolean => {
    const blockHash: string = block.calcHash();
    return blockHash === block.hash;
};

export { Block , hashMatchesBlockContent};