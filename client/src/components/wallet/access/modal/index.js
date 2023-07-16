import React, { useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'

const methods = ['Private Key', 'Keystore File', 'Mnemonic Phrase'];

function AccessModal({ show, handleClose }) {
    const [step, setStep] = useState(1);
    return (
        <Modal fullscreen={true} centered={true} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="text-center mx-auto">
                {step === 1 ?
                    methods.map((method, index) => (
                        <Card className="text-center mx-auto my-2" style={{ cursor: 'pointer' }} onClick={() => { setStep(2) }}>
                            <Card.Body>
                                <Row>

                                    <Col className='col-9'>
                                        <Card.Title>{method}</Card.Title>
                                        <Card.Text>{method}</Card.Text>
                                    </Col>
                                    <Col >
                                        <img src="https://via.placeholder.com/150" alt="Card Image" className="img-fluid" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card >))

                    : step === 2 ? <Button onClick={() => { setStep(3) }}>Next step</Button> : <Button onClick={() => { setStep(1) }}>Done</Button>
                }
            </Modal.Body>
        </Modal>
    )
}

export default AccessModal