import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavbarHome, SideBar } from './components';
import { Home, Wallet, Transaction, History } from './pages';

function App() {
  const [message, setMessage] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarHome />
        <SideBar />
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
          </Routes>

          <Routes>
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/send-tx" element={<Transaction />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
