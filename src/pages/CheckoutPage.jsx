import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function CheckoutPage() {
  const { isLoggedIn } = useAuth();

  return (
    <Container className="mt-4">
      <h2>Página de Checkout (Protegida)</h2>
      {isLoggedIn ? (
        <Alert variant="success">
          ¡Bienvenido a la página de checkout! Estás logueado.
          Aquí procederías con tu compra.
        </Alert>
      ) : (
        <Alert variant="danger">No deberías estar aquí sin loguearte.</Alert>
      )}
      <p>Contenido exclusivo para usuarios autenticados.</p>
    </Container>
  );
}

export default CheckoutPage;