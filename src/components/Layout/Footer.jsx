import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <Container className="p-4">
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} PHARD. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;