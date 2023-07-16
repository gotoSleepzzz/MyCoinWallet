import React from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'

const methods = ['Private Key', 'Keystore File', 'Mnemonic Phrase'];

function CreateModal({ show, handleClose }) {
    return (
        <Modal fullscreen={true} centered={true} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="text-center mx-auto">
                {
                    methods.map((method, index) => (
                        <Card className="text-center mx-auto my-2" style={{ cursor: 'pointer' }} >
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
                }
            </Modal.Body>
        </Modal>
    )
}

export default CreateModal