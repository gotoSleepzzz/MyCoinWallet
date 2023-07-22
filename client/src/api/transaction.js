class TransactionWallet {

    const getTransactions = async () => {
        const response = await axios.get(`${BASE_URL}/transactions`);
        return response.data;
    }

    const getTransaction = async (transactionHash) => {
        const response = await axios.get(`${BASE_URL}/transaction/${transactionHash}`);
        return response.data;
    }
}