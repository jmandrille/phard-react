import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import phardHomeLogo from '../assets/images/phard-home-logo.png';

function HomePage() {
  return (
    <>
      <title>PHARD - Inicio | Tu Tienda de Componentes</title>
      <meta name="description" content="Bienvenido a PHARD, tu tienda de confianza para los mejores componentes y periféricos de PC." />
      
      <Container className="mt-5 text-center">
        <Row className="justify-content-center">
          <Col md={8}>
            <Image src={phardHomeLogo} alt="PHARD Logo Completo" fluid style={{ maxWidth: '80px', marginBottom: '30px' }} />
            <h1>Bienvenido a PHARD</h1>
            <p className="lead">
              Tu tienda de confianza para los mejores componentes y periféricos.
            </p>
            <p>
              Explora nuestro catálogo de productos, conoce nuestras ofertas
              y encuentra todo lo que necesitas para tu setup.
            </p>
            <Button as={Link} to="/productos" variant="primary" size="lg" className="mt-3">
              Ver Productos
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;