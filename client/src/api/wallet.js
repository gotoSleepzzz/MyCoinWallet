import axios from "axios";
import { BASE_URL } from "constants/const";

const accessWalletService = (method, privateKey, password, data) => {
    const promise = axios.post(`${BASE_URL}/accessWallet`, {
        method: method,
        privateKey: privateKey,
        password: password,
        data: data,
    });
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
}

const createWalletService = (method, password) => {
    const promise = axios.post(`${BASE_URL}/createWallet`, {
        method: method,
        password: password
    })
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
}

const sendTransactionService = async () => {
}

const getHistoryService = async () => {
}

const getBalanceService = async () => {
}

export { accessWalletService, createWalletService, sendTransactionService, getHistoryService, getBalanceService };