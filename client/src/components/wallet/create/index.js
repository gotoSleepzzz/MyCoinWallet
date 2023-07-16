import HomeFooter from 'components/footer'
import HomeHeader from 'components/header'
import React, { useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateModal from './modal';

const WalletCreate = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <HomeHeader />
      <Container>
        <Row>
          <Col className='text-center mb-5'>
            <h2>Create a new wallet</h2>
            <Link to='/wallet/access'>Access my wallet</Link>
          </Col>
        </Row>
        <Card className="text-center mx-auto" style={{ cursor: 'pointer' }} onClick={handleShow} >
          <Card.Body>
            <Row>
              <Col >
                <img src="https://via.placeholder.com/150" alt="Card Image" className="img-fluid" />
              </Col>
              <Col className='col-9'>
                <Card.Title>Software</Card.Title>
                <Card.Text>
                  Software methods like Public&Private key, Keystore File and Mnemonic Phrase should only be used in offline settings by experienced users
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card >
      </Container >
      <HomeFooter />

      <CreateModal show={show} handleClose={handleClose} />
    </>
  );
}

export default WalletCreate