import { useState } from "react";
import React from 'react';

export const AppContext = React.createContext();
export default function Context({ children }) {
    const [AccessStatus, setAccessStatus] = useState(true);
    const [WalletInfo, setWalletInfo] = useState({ publicKey: "", privateKey: "" });

    const exportContext = {
        AccessStatus,
        WalletInfo
    }


    return <AppContext.Provider value={exportContext} >{children}</AppContext.Provider>
}