import axios from 'axios';
import { BASE_URL } from 'constants/const';

const getBlocksService = () => {
    return axios.get(`${BASE_URL}/blocks`)
        .then(res => res.data)
        .catch(err => console.log(err))
}

const getBlockService = (blockHash) => {
    return axios.get(`${BASE_URL}/block/${blockHash}`)
        .then(res => res.data)
        .catch(err => console.log(err))
}
