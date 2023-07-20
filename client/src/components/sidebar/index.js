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
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineContentCopy } from 'react-icons/md';
import { IoMdCube } from 'react-icons/io';
import { BiTransferAlt } from 'react-icons/bi';
import { BsSend } from 'react-icons/bs';
import { AiOutlineHistory } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

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
            height: '100%',
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
              <Row className="d-flex justify-content-center mt-5">
                <Col>0 ETH</Col>
                <Col className="d-flex flex-row-reverse">
                  <MdOutlineContentCopy role="button" />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Row>
      <Nav className="flex-column">
        <hr />

        <a onClick={() => navigate('/blocks')}>
          <IoMdCube size={30} /> Blocks
        </a>
        <a onClick={() => navigate('/transactions')}>
          <BiTransferAlt size={30} /> Transactions
        </a>

        <hr />
        <a onClick={() => navigate('/wallet/send-tx')}>
          <BsSend size={30} />
          Send-tx
        </a>
        <a onClick={() => navigate('/wallet/history')}>
          {' '}
          <AiOutlineHistory size={30} />
          History
        </a>

        <hr />
        <a onClick={() => navigate('/')}>
          <BiLogOut size={30} />
          Logout
        </a>
      </Nav>
    </Container>
  );
};

export default Sidebar;
