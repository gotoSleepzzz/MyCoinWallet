import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Row } from 'react-bootstrap'
function HomeMain() {
  const navigate = useNavigate();


  return (
    <Card className="text-center mx-auto" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>My coin wallet</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Row>
          <Button variant="success" onClick={() => navigate('/wallet/create')}>Create a new wallet</Button>{' '}
          <Button variant="outline-success" onClick={() => navigate('/wallet/access')}>Access my wallet</Button>{' '}
        </Row>

      </Card.Body>
    </Card>
  )
}

export default HomeMain