import React from 'react';
import { Container, Alert, ListGroup, Button } from 'react-bootstrap';

function Cart({ cartItems = [] }) {
  return (
    <Container className="mt-4">
      <h2>Tu Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <Alert variant="info">Tu carrito está vacío.</Alert>
      ) : (
        <>
          <ListGroup>
            {cartItems.map(item => (
              <ListGroup.Item key={item.id}>
                {item.name} - ${item.price} (Cantidad: {item.quantity})
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-3">
            {/* Lógica de total aquí más adelante */}
            <h4>Total: $0.00</h4>
            <Button variant="success">Proceder al Pago</Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;