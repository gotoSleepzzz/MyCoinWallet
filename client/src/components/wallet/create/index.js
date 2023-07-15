import HomeFooter from 'components/footer'
import HomeHeader from 'components/header'
import React, { useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                <Card.Title>My coin wallet</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card >
      </Container >
      <HomeFooter />

      <Modal fullscreen={true} centered={true} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="success" >Create a new wallet</Button>{' '}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WalletCreate