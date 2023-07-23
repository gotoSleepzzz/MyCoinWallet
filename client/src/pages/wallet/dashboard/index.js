import React, { useContext } from 'react'
import './style.css'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { AppContext } from 'Context';

const WalletDashboard = () => {
  const context = useContext(AppContext);
  const { WalletInfo } = context;



  return (
    <Container fluid className='dashboard d-flex pt-5 justify-content-around' style={{maxWidth:'100%'}}>
      <Col className='col-8'>
        <Card style={{ maxWidth: '30rem', maxHeight: '12rem' }} className='d-flex col-auto' >
          <Card.Header style={{ color: 'green' }}>
            <h3>Address</h3>
          </Card.Header>
          <Card.Body style={{ display: 'inline-block' }}>
            <Card.Text className='break-words' style={{ fontWeight: 'bold' }}>
              {WalletInfo.publicKey}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className='col-4'>
        <Card style={{ maxWidth: '15rem', maxHeight: '12rem' }} className='d-flex col-auto' >
          <Card.Header style={{ color: 'blue', }}>
            <h3>Balance</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text className='break-words' style={{ fontWeight: 'bold' }}>
              {WalletInfo.balance}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  )
}

export default WalletDashboard