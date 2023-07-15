import React from 'react';
import { useState } from 'react';
import { Button, Container, Form, FormControl, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';
import './style.css';

function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container fluid className="header">
      <Navbar bg="light" expand="lg" className={isOpen ? 'mobile-nav-open' : ''}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
        <Navbar.Brand href="#home" className='mx-auto justify-content-center'>My coin wallet</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <Button variant="outline-primary">Sign In</Button>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default HomeHeader