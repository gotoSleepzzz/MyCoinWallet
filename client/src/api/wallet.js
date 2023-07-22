const { default: axios } = require("axios");
const { BASE_URL } = require("constants/const");

class WalletService {
    const accessWallet = async () => {
        const response = await axios.post(`${BASE_URL}/accessWallet`, {
            method: "usingPrivateKey",
            privateKey: "0x0",
            password: "0x0",
            data: "0x0",
        });
        return response.data;
    }

    const createWallet = async () => {
        const response = await axios.post(`${BASE_URL}/accessWallet`, {
            method: "usingPrivateKey",
            privateKey: "0x0",
            password: "0x0",
            data: "0x0",
        });
        return response.data;
    }

    const sendTransaction = async () => {
    }

    const getHistory = async () => {
    }

    const getBalance = async () => {
    }

}