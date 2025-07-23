import React, { useState } from 'react';
import { Container, Alert, ListGroup, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateItemQuantity, clearCart, getCartTotal } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleProceedToCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginFromModal = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  const handleCloseModal = () => setShowLoginModal(false);

  if (cartItems.length === 0) {
    return (
      <Container className="mt-4 text-center">
        <Alert variant="info" className="d-inline-block">Tu carrito está vacío.</Alert>
      </Container>
    );
  }

  return (
    <>
      <Container className="mt-4">
        <h2>Tu Carrito de Compras</h2>
        <ListGroup variant="flush">
          {cartItems.map(item => (
            <ListGroup.Item key={item.id} className="mb-3">
              <Row className="align-items-center">
                <Col xs={2} md={1}>
                  <Image src={item.image} alt={item.name} fluid thumbnail style={{maxHeight: '60px', objectFit: 'contain'}}/>
                </Col>
                <Col xs={5} md={4}>
                  {item.name}
                </Col>
                <Col xs={5} md={3}>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="me-2"
                  >
                    -
                  </Button>
                  {item.quantity}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    className="ms-2"
                  >
                    +
                  </Button>
                </Col>
                <Col xs={6} md={2} className="text-md-end">
                  ${(item.price * item.quantity).toFixed(2)}
                </Col>
                <Col xs={6} md={2} className="text-end">
                  <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                    Eliminar
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Row className="mt-4 align-items-center">
          <Col md={8} className="text-md-start text-center mb-2 mb-md-0">
            <Button variant="danger" onClick={clearCart}>
              Vaciar Carrito
            </Button>
          </Col>
          <Col md={4} className="text-md-end text-center">
            <h3>Total: ${getCartTotal()}</h3>
            <Button variant="success" size="lg" className="mt-2" onClick={handleProceedToCheckout}>
              Proceder al Pago
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={showLoginModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión Requerido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Necesitas iniciar sesión para continuar con el proceso de pago.</p>
          <p>¿Deseas iniciar sesión ahora?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLoginFromModal}>
            Ir a Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;