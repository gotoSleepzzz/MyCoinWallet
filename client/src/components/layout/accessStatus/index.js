import React, { useContext } from 'react'
import { AppContext } from '../../../Context';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../../sidebar';

function AccessStatus() {
    const contex = useContext(AppContext);
    const { AccessStatus } = contex;
    return AccessStatus ? <><Sidebar /><Outlet /></> : <Navigate to="/wallet/access" />
}

export default AccessStatus