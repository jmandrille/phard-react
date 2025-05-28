import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';

function ProductDetailPage({ addToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct({
            id: data.id,
            name: data.title,
            price: data.price.toFixed(2),
            image: data.image,
            description: data.description,
            category: data.category
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`${product.name} ha sido agregado al carrito.`);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando detalles del producto...</span>
        </Spinner>
        <p>Cargando detalles del producto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error al Cargar el Producto</Alert.Heading>
          <p>Ha ocurrido un error: {error}</p>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Producto no encontrado.</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="text-center mb-3 mb-md-0">
          <Image src={product.image} alt={product.name} fluid style={{ maxHeight: '400px', objectFit: 'contain' }} />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="lead text-muted">{product.category}</p>
          <hr />
          <h4>Descripción:</h4>
          <p>{product.description}</p>
          <hr />
          <h3>Precio: ${product.price}</h3>
          <Button variant="success" size="lg" className="mt-3" onClick={handleAddToCart}>
            Agregar al Carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailPage;