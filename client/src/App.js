import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home, Wallet, Transactions, History } from './pages';
import React, { Fragment } from 'react';
import { WalletAccess } from './components/wallet/access';
import WalletCreate from './components/wallet/create';
import AccessStatus from './components/layout/accessStatus';
import WalletDashboard from './components/wallet/dashboard';
import SendTx from 'components/wallet/sendtx';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Navigate to="/wallet/access" />} />
          <Route path="/wallet/access" element={<WalletAccess />} />
          <Route path="/wallet/create" element={<WalletCreate />} />
          <Route element={<AccessStatus />} >
            <Route path="/wallet/dashboard" element={<WalletDashboard />} />
            <Route path="/wallet/send-tx" element={<SendTx />} />
            <Route path="/wallet/history" element={<History />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
