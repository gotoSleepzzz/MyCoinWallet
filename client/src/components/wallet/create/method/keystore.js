import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, InputGroup, Row, Col } from 'react-bootstrap';
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCheckCircle,
} from 'react-icons/ai';
import {
  PiNumberCircleOneFill,
  PiNumberCircleThreeFill,
  PiNumberCircleThreeDuotone,
  PiNumberCircleTwoDuotone,
  PiNumberCircleTwoFill,
} from 'react-icons/pi';

function KeystoreCreate(props) {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  return (
    <Container fluid className="d-flex justify-content-between flex-column">
      <Row className="justify-content-center">
        <h1 className="text-center">Access Wallet with Keystore File</h1>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col className="d-flex flex-wrap">
          <Row>
            {step === 1 ? (
              <PiNumberCircleOneFill size={40} />
            ) : (
              <AiOutlineCheckCircle size={40} />
            )}
            <p>Create password</p>
          </Row>
          <hr
            role="separator"
            aria-orientation="horizontal"
            className="d-block"
            style={{
              margin: '21px -70px 0',
              maxWidth: '100%',
              border: '1px solid #000',
              flex: '1 1 0px',
              alignSelf: 'flex-start',
            }}
          />
          <Row>
            {step === 2 ? (
              <PiNumberCircleTwoFill size={40} />
            ) : step > 2 ? (
              <AiOutlineCheckCircle size={40} />
            ) : (
              <PiNumberCircleTwoDuotone size={40} />
            )}
            <p className="text-wrap">Download keystore file</p>
          </Row>
          <hr
            role="separator"
            aria-orientation="horizontal"
            className="d-block"
            style={{
              margin: '21px -50px 0',
              maxWidth: '100%',
              border: '1px solid #000',
              flex: '1 1 0px',
              alignSelf: 'flex-start',
            }}
          />
          <Row>
            {step === 3 ? (
              <PiNumberCircleThreeFill size={40} />
            ) : (
              <PiNumberCircleThreeDuotone size={40} />
            )}
            <p>Well done</p>
          </Row>
        </Col>
      </Row>
      {step === 1 ? (
        <>
          <Row className="justify-content-center mt-5">
            <Form.Label
              htmlFor="password"
              className="text-start"
              style={{ fontWeight: 700 }}
            >
              Enter Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="password"
                aria-label="Dollar amount (with dot and two decimal places)"
                type={showPass ? '' : 'password'}
              />
              <InputGroup.Text
                role="button"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputGroup.Text>
            </InputGroup>
          </Row>
          <Row className="justify-content-center mt-5">
            <Form.Label
              htmlFor="confirm-password"
              className="text-start"
              style={{ fontWeight: 700 }}
            >
              Confirm Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="confirm-password"
                aria-label="Dollar amount (with dot and two decimal places)"
                type={showPass ? '' : 'password'}
              />
              <InputGroup.Text
                role="button"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </InputGroup.Text>
            </InputGroup>
          </Row>

          <Row className="justify-content-center mt-5">
            <Button
              variant="success"
              size="lg"
              style={{ width: '30%' }}
              type="submit"
              className="mt-3"
              onClick={() => setStep(2)}
            >
              Create wallet
            </Button>
          </Row>
        </>
      ) : step == 2 ? (
        <Row>
          <Col className="col-4">
            <Row className="justify-content-center">
              <Button
                variant="outline-success"
                size="lg"
                style={{ width: '50%' }}
                type="submit"
                className="mt-3"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </Row>
          </Col>
          <Col className="col-8">
            <Row className="justify-content-center">
              <Button
                variant="success"
                size="lg"
                style={{ width: '80%' }}
                type="submit"
                className="mt-3"
                onClick={() => setStep(3)}
              >
                Acknowledge & download
              </Button>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <h1>Your wallet is ready!</h1>
          <Button
            variant="outline-success"
            size="lg"
            style={{ width: '30%' }}
            type="submit"
            className="mt-3 mx-auto"
            onClick={() => setStep(1)}
          >
            Create another wallet
          </Button>
          <Button
            variant="success"
            size="lg"
            style={{ width: '30%' }}
            type="submit"
            className="mt-3 mx-auto"
            onClick={() => navigate('/wallet/dashboard')}
          >
            Access wallet
          </Button>
        </Row>
      )}
    </Container>
  );
}

export default KeystoreCreate;
