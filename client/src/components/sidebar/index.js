import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
import './style.css';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={3} md={2} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <Button variant="secondary" className="sidebar-toggle" onClick={handleSidebarToggle}>
            <span className="sr-only">Toggle Sidebar</span>
            <i className={`fa ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
          </Button>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Col>
        <Col sm={9} md={10} className="main-content">
          {/* Your main content goes here */}
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
