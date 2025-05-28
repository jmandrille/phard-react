import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2>¡Ups! Página No Encontrada</h2>
          <p className="lead">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Button as={Link} to="/" variant="primary" className="mt-3">
            Volver al Inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;