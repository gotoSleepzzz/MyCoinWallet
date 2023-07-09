import * as CryptoJS from "crypto-js";

class Block {
    public index : number;
    public hash : string;
    public previousHash : string;
    //
    public data : string;
    public timestamp : number;
    //
    public difficulty : number;
    public nonce : number;

    constructor(index : number, public hash : string, public previousHash : string, public data : string, public timestamp : number) {
    }
}