import React, { useContext } from 'react'
import { AppContext } from '../../../Context';
import { Navigate, Outlet } from 'react-router-dom';

function AccessStatus() {
    const contex = useContext(AppContext);
    const { AccessStatus } = contex;
    return AccessStatus ? <Outlet /> : <Navigate to="/wallet/access" />
}

export default AccessStatus