
class BlockService {

    const getBlocks = () => {
        return axios.get(`${apiUrl}/blocks`)
            .then(res => res.data)
            .catch(err => console.log(err))
    }

    const getBlock = (blockHash) => {
        return axios.get(`${apiUrl}/block/${blockHash}`)
            .then(res => res.data)
            .catch(err => console.log(err))
    }
}