import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Button, Offcanvas, Modal } from 'react-bootstrap';
import './style.css';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Container fluid>
      <Nav className="flex-column">
        <hr />
        <Nav.Link href="/transactions">Transactions</Nav.Link>
        <hr />
        <Nav.Link href="/wallet/send-tx">Send-tx</Nav.Link>
        <Nav.Link href="/wallet/history">History</Nav.Link>
        <hr />
        <Nav.Link href="/">Logout</Nav.Link>
      </Nav>
    </Container>
  );
};

export default Sidebar;
