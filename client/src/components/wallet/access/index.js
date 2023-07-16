import HomeFooter from 'components/footer'
import HomeHeader from 'components/header'
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import "./style.css"
import { Link } from 'react-router-dom'
import AccessModal from './modal'

export const WalletAccess = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <HomeHeader />
      <Container>
        <Row>
          <Col className='text-center mb-5'>
            <h2>Access my wallet</h2>
            <Link to='/wallet/create'>Create wallet</Link>
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
                  Keystore File, Mnemonic Phrase, and Private Key
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card >
      </Container >
      <HomeFooter />

      <AccessModal show={show} handleClose={handleClose} />

    </>
  )
}
