import * as CryptoJS from "crypto-js";
import { Transaction } from "./transaction";

class Block {
    public index : number;
    public hash : string;
    public previousHash : string;
    //
    public data : Transaction[];
    public timestamp : number;
    //
    public difficulty : number;
    public nonce : number;

    constructor(index : number, hash : string, previousHash : string, data : Transaction[], timestamp : number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;

        this.data = data;
        this.timestamp = timestamp;
    }
}