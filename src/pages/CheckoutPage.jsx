import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CheckoutPage() {
  const { cartItems, getCartTotal, getCartItemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    card: '',
    expiry: '',
    cvc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newOrder = {
      userId: 'talento_user',
      items: JSON.stringify(cartItems), 
      totalAmount: getCartTotal(),
      totalItems: getCartItemCount(),
    };

    try {
      const response = await fetch('https://6880fa88f1dcae717b643438.mockapi.io/api/v1/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el pedido.');
      }

      toast.success('¡Compra realizada con éxito! Gracias por elegirnos.');
      clearCart();
      navigate('/');
    } catch (error) {
      toast.error('Hubo un problema al procesar tu pedido.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="warning">Tu carrito está vacío.</Alert>
        <Button as={Link} to="/productos" variant="primary">
          Ir a comprar
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Finalizar Compra</h1>
      <Row>
        <Col md={7} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Detalles de Facturación y Envío</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control type="text" name="name" onChange={handleChange} required />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Dirección de Envío</Form.Label>
                  <Form.Control type="text" name="address" onChange={handleChange} required />
                </Form.Group>
                
                <hr />
                
                <Card.Title as="h4" className="mb-3">Información de Pago (Simulación)</Card.Title>
                
                <Form.Group className="mb-3" controlId="formCard">
                  <Form.Label>Número de Tarjeta</Form.Label>
                  <Form.Control type="text" name="card" placeholder="XXXX XXXX XXXX XXXX" onChange={handleChange} required />
                </Form.Group>
                
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formExpiry">
                      <Form.Label>Vencimiento</Form.Label>
                      <Form.Control type="text" name="expiry" placeholder="MM/AA" onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formCvc">
                      <Form.Label>CVC</Form.Label>
                      <Form.Control type="text" name="cvc" placeholder="XXX" onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Button variant="success" type="submit" className="w-100 mt-3" disabled={loading}>
                  {loading ? 'Procesando...' : `Pagar $${getCartTotal()}`}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={5} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Resumen de tu Pedido</Card.Title>
              <ListGroup variant="flush">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                  <span>TOTAL</span>
                  <span>${getCartTotal()}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;