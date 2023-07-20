import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Button,
  Offcanvas,
  Modal,
} from 'react-bootstrap';
import './style.css';
import { Link } from 'react-router-dom';

import { MdOutlineContentCopy } from 'react-icons/md';

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Container
      style={{ backgroundColor: '#0D064F', color: '#fff', height: '100vh' }}
    >
      <Row className="justify-content-center">
        <h3 style={{ fontWeight: '800' }}>My Coin Wallet</h3>
      </Row>
      <Row className="justify-content-center">
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
              zIndex: '1',
            }}
          >
            <img
              style={{
                borderRadius: '25px',
                width: '100%',
                height: '100%',
                overflowClipMargin: 'content-box',
                overflow: 'clip',
                zIndex: '1',
              }}
              src="https://mewcard.mewapi.io/?address=0xb389b203801180f5ee112c7f7a6dbc3eec0c445c"
            />
            <div
              style={{
                width: '90%',
                height: '100%',
                overflowClipMargin: 'content-box',
                position: 'absolute',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                top: '15px',
                left: '10px',
                zIndex: '1',
              }}
            >
              0xb389b203801180f5ee112c7f7a6dbc3eec0c445c
              <h3 className="mt-3" style={{ fontWeight: '700' }}>
                $0.00
              </h3>
              <Row className='d-flex justify-content-center mt-5'>
                <Col>0 ETH</Col>
                <Col className='d-flex flex-row-reverse'>
                  <MdOutlineContentCopy role='button' />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Row>
      <Nav className="flex-column">
        <hr />
        <div href="/blocks">Blocks</div>
        <div href="/transactions">Transactions</div>
        <hr />
        <div href="/wallet/send-tx">Send-tx</div>
        <div href="/wallet/history">History</div>
        <hr />
        <div href="/">Logout</div>
      </Nav>
    </Container>
  );
};

export default Sidebar;
