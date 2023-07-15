import React, { useContext } from 'react'
import { AppContext } from '../../../Context';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../../sidebar';
import { Col, Row } from 'react-bootstrap';

function AccessStatus() {
    const contex = useContext(AppContext);
    const { AccessStatus } = contex;
    return AccessStatus ?
        <>
            <Row>
                <Col xs={2}>
                    <Sidebar />
                </Col>
                <Col xs={10}>
                    <Outlet />
                </Col>
            </Row>
        </> : <Navigate to="/wallet/access" />
}

export default AccessStatus