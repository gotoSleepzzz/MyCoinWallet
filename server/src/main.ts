import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { create } from 'domain';
import { createWallet, createWalletUsingPassword, getWallet, getWalletFromPassword } from './models/wallet';
import { get } from 'http';
require('dotenv').config();

const hostPort: number = parseInt(process.env.PORT as string, 10) || 8080;

const options: cors.CorsOptions = {
  origin: process.env.CLIENT_URL as string,
};
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
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.listen(hostPort, () => {
  console.log('Server is listening on port ' + hostPort);
});