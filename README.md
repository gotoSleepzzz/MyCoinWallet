# MyCoinWallet
Blockchain101

## 1. Prepare socket environment
```
cd PeerNetwork
npm install
npm run start
```

## 2. Run server app
```
cd server
npm install
npm run start:dev1
npm run start:dev2
```

## 3. Run client
```
cd client
npm install
npm run start
```
Point a web at the demo:
```
http://localhost:3000
```
## 4. Test
```

0x04b1d3b41e11ab594e32613600f4f2cf297591ed5eb05d6c6c5dbadfbf9ad0477b8d42729fe63aa0ca1b98d8b6aa69388002b7b354172e731c45f9589fe2b35801
0x17031b367fea54e91c2c2c0ec11a67d4bbaf51ad9ab2ab8aa2b2b04123638330
---
0x04b280405c3c82a2c9696a7e63b565035e607cf00ed69cbea1313a567b92c8be507a795d74dac022c6dd3682748bdb326acfb4a767304c210203ed066af4f7e365
0x33cafb48e7f9ac80f7a359f9da6182bf48160d22c6c972b0fbe2376f965ddab6
```

# TODO:
- client
    - done : home
    - done : create wallet
    - done : access my wallet
    - view wallet
    - send coin
    - view history (https://etherscan.io/)

- server
    - done : create blockchain
    - done : create transaction
    - done : create wallet
    - done : access wallet
    - done : view history
    - done : make transaction
    - send transaction

### Reference
- https://github.com/anders94/blockchain-demo
- https://github.com/lhartikk/naivecoin