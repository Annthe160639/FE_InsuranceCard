import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import RegisterScreen from "./RegisterScreen";


const LoginScreen = () => {

  return (
    <Form>
      <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Sign In
      </Button>

      <Row className="py-3">
        <Col>
          NewCustomer? 
        </Col>
      </Row>
    </Form>
  );
};

export default LoginScreen;
