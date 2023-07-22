import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createWallet, createWalletUsingPassword, getWallet, getWalletFromPassword } from './models/wallet';
import http from 'http';
import { BlockChain } from './models/blockchain';
import { initP2PServer } from './utils/p2p';
require('dotenv').config();

const hostPort: number = parseInt(process.argv.at(2) as string, 10) || parseInt(process.env.PORT as string, 10) || 8080;

const options: cors.CorsOptions = {
  origin: '*',
};

const blockChain = new BlockChain();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to server!' });
});

app.get('/api/v1/blocks', (req, res) => {
  try {
    res.status(200).json({ blocks: blockChain.chain });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.get('/api/v1/block/:hash', (req, res) => {
  try {
    const hash = req.params.hash;
    // const block = blockChain.getBlock(hash);
    // res.status(200).json({ block: block });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.get('/api/v1/transactions', (req, res) => {
  try {
    const from = req.query.from;
    const to = req.query.to;
    const transactions = blockChain.getTransaction(from as string, to as string);
    res.status(200).json({ transactions: transactions });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.get('/api/v1/transaction/:hash', (req, res) => {
  try {
    const hash = req.params.hash;
    // const transaction = blockChain.getTransactionByHash(hash);
    // res.status(200).json({ transaction: transaction });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});


app.post('/api/v1/createWallet', (req, res) => {
  try {
    const method = req.body.method;

    if (method === 'usingPassword') {
      const password = req.body.password;
      if (password === undefined || password.length < 8) {
        throw new Error('Invalid password');
      }
      const data = createWalletUsingPassword(password);
      res.status(200).json(data);
    }
    else if (method === 'usingMnemonic') {
      throw new Error('Unsupported method');
    }
    else if (method === 'usingPrivateKey') {
      const data = createWallet();
      res.status(200).json(data);
    }
    else {
      throw new Error('Invalid method');
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.get('/api/v1/address/:address', (req, res) => {
  try {
    const address = req.params.address;
    const wallet = getWallet(address);
    res.status(200).json({ wallet: wallet });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.post('/api/v1/mineRawBlock', (req, res) => {
  try {
    const data = req.query.data;
    // const block = blockChain.generateRawNextBlock(data as string);
    // res.status(200).json({ block: block });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);

  }
});

app.post('/api/v1/mineBlock', (req, res) => {
  try {
    const data = req.query.data;
    // const block = blockChain.generateRawNextBlock(data as string);
    // res.status(200).json({ block: block });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);

  }
});

app.post('/mineTransaction', (req, res) => {
  const address = req.body.address;
  const amount = req.body.amount;
  try {
    // const resp = generatenextBlockWithTransaction(address, amount);
    // res.send(resp);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.post('/api/v1/accessWallet', (req, res) => {
  try {
    const method = req.body.method;

    if (method === 'usingPassword') {
      const wallet = getWalletFromPassword(req.body.password, req.body.data);
    } else if (method === 'usingMnemonic') {
      throw new Error('Unsupported method');
    } else if (method === 'usingPrivateKey') {
      const wallet = getWallet(req.body.privateKey);
    } else {
      throw new Error('Invalid method');
    }
    res.status(200).json({ message: 'Success' });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// getBalance?address=0x1234567890
app.get('/api/v1/getBalance', (req, res) => {
  try {
    const address = req.query.address;
    if (address === undefined) {
      throw new Error('Invalid address');
    }
    const balance = blockChain.getBalance(address as string);
    res.status(200).json({ balance: balance });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// getHistory?address=0x1234567890
app.get('/api/v1/history', (req, res) => {
  try {
    const address = req.query.address;
    if (address === undefined) {
      throw new Error('Invalid address');
    }
    const history = blockChain.getTransactionFromWallet(address as string);
    res.status(200).json({ history: history });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.post('/api/v1/sendTransaction', (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const amount = req.body.amount;
    const privateKey = req.body.privateKey;
    const tx = blockChain.createTransaction(from, to, amount, privateKey);
    res.status(200).json({ tx: tx });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.post('/stop', (req, res) => {
  res.send({ 'msg': 'stopping server' });
  process.exit();
});

app.get('/api/v1/peers', (req, res) => {
  try {
    // res.status(200).json({ peers: getSockets().map((s: any) => s._socket.remoteAddress + ':' + s._socket.remotePort) });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

const server = http.createServer(app);
initP2PServer(server, hostPort);

server.listen(hostPort, () => {
  console.log('Server is listening on port ' + hostPort);
});