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

app.post('/api/v1/send-tx', (req, res) => {
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

const server = http.createServer(app);
initP2PServer(server, hostPort);

server.listen(hostPort, () => {
  console.log('Server is listening on port ' + hostPort);
});