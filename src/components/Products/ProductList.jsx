import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Product from './Product';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price.toFixed(2),
          image: item.image,
          description: item.description,
          category: item.category
        }));
        setProducts(formattedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
        <p className="mt-2">Cargando productos...</p>
      </Container>
    );
  }
  if (error) { 
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error al Cargar Productos</Alert.Heading>
          <p>Ha ocurrido un error: {error}</p>
          <p>Por favor, intenta recargar la página o vuelve más tarde.</p>
        </Alert>
      </Container>
    );
  }
  if (products.length === 0 && !loading) {
    return (
        <Container className="mt-5">
            <Alert variant="info">No hay productos disponibles en este momento.</Alert>
        </Container>
    );
  }

  return (
    <Container fluid className="mt-4 px-md-4 px-lg-5">
      <Row>
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;