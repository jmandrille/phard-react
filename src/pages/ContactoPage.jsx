import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function ContactoPage() {
  return (
    <Container className="mt-4">
      <h1>Contacto</h1>
      <p>Ponte en contacto con nosotros.</p>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMessage">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Tu mensaje" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default ContactoPage;
