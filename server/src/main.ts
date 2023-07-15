import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();

const hostPort: number = parseInt(process.env.PORT as string, 10) || 8080;

const options: cors.CorsOptions = {
  origin: process.env.CLIENT_URL as string,
};
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to server!' });
});

app.listen(hostPort, () => {
    console.log('Server is listening on port ' + hostPort);
});