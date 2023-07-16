import { ec } from "elliptic";
import * as CryptoJS from "crypto-js";

const EC = new ec('secp256k1');
class Wallet {
    public privateKey: string;
    public address: string;
    public balance: number;

    constructor() {
        this.balance = 0;
    }

    createNew() {
        const keyPair = this.generateKeyPair();
        this.privateKey = `0x${keyPair.privateKey}`;
        this.address = `0x${keyPair.publicKey}`;
    }

    generateKeyPair(): any {
        const keyPair = EC.genKeyPair();
        const privateKey = keyPair.getPrivate('hex');
        const publicKey = keyPair.getPublic('hex');
        return { publicKey, privateKey };
    }

    load(privateKey: string): boolean {
        const keyPair = EC.keyFromPrivate(privateKey.substring(2, privateKey.length), 'hex');
        this.address = `0x${keyPair.getPublic('hex')}`;
        this.privateKey = `0x${keyPair.getPrivate('hex')}`;
        return true;
    }

    loadFromPassword(password: string, address: string, passhash: string, crypted: string): boolean {
        if (passhash === CryptoJS.SHA256(password).toString()) {
            const privateKey = decryptPK(crypted, password);
            const keyPair = EC.keyFromPrivate(privateKey, 'hex');
            this.address = `0x${keyPair.getPublic('hex')}`;
            this.privateKey = `0x${keyPair.getPrivate('hex')}`;
        } else {
            return false;
        }
        return this.address === address;
    }
}

const getPublickey = (privateKey: string): string => {
    return `0x${EC.keyFromPrivate(privateKey, 'hex').getPublic('hex')}`;
}

const encryptPK = (privateKey: string, password: string): string => {
    return CryptoJS.AES.encrypt(privateKey, password).toString();
}
const decryptPK = (crypted: string, password: string): string => {
    return CryptoJS.AES.decrypt(crypted, password).toString(CryptoJS.enc.Utf8);
}

const createWalletUsingPassword = (password: string) => {
    const wallet = new Wallet();
    wallet.createNew();
    const data = {
        address: wallet.address,
        passhash: CryptoJS.SHA256(password).toString(),
        crypted: encryptPK(wallet.privateKey, password)
    }
    return data;
}

const createWallet = (): Wallet => {
    return new Wallet();
}

const getWalletFromPassword = (password: string, data: string): Wallet => {
    const dataJS = JSON.parse(data);
    const wallet = new Wallet();
    if (!wallet.loadFromPassword(password, dataJS.address, dataJS.passhash, dataJS.crypted)) throw new Error('Invalid password');
    return wallet;
}

const getWallet = (privateKey: string): Wallet => {
    const wallet = new Wallet();
    if (!wallet.load(privateKey)) throw new Error('Invalid private key');
    return wallet;
}

export { Wallet, createWalletUsingPassword, createWallet, getWalletFromPassword, getWallet };
