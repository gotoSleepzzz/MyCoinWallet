import * as CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

class Wallet {
    privateKey: string;
    address: string;
    balance: number;

    constructor(privateKey: string, address: string) { }

    generateKeyPair(): any {
        const privateKey = uuidv4().replace(/-/g, '');
        const publicKey = CryptoJS.SHA256(privateKey).toString();

        return { privateKey, publicKey };
    }
}
