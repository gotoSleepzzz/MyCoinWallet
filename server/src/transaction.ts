class TxIn {
    public txOutId: string;
    public txOutIndex: number;
    public signature: string;
}

class TxOut {
    public address: string;
    public amount: number;
}

class Transaction {
    public id: string;
    public txIns: TxIn[];
    public txOuts: TxOut[];
}