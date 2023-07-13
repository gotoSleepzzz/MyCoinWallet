import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { NavbarHome, SideBar } from './components';
import { Home, Wallet, Transaction, History } from './pages';
import { Fragment } from 'react';
import { WalletAccess } from './components/wallet/access';
import WalletCreate from './components/wallet/create';
import AccessStatus from './components/layout/accessStatus';
import WalletDashboard from './components/wallet/dashboard';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Navigate to="/wallet/access" />} />
          <Route path="/wallet/access" element={<WalletAccess />} />
          <Route path="/wallet/create" element={<WalletCreate />} />
          <Route element={<><AccessStatus /><SideBar /></>} >
            <Route element={<SideBar />} />
            <Route path="/wallet/dashboard" element={<WalletDashboard />} />
            <Route path="/send-tx" element={<Transaction />} />
            <Route path="/history" element={<History />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
