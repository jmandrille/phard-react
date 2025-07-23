import React from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useProducts } from '../../contexts/ProductsContext';
import Product from './Product';

function ProductList({ categoryName }) {

  const { products, loading, error } = useProducts();

  const filteredProducts = categoryName
    ? products.filter(p => p.category === categoryName)
    : products;

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error al cargar productos: {error}</Alert>
      </Container>
    );
  }

  if (filteredProducts.length === 0) {
    return (
        <Container className="mt-5 text-center">
            <Alert variant="info" className="d-inline-block">
              No hay productos disponibles {categoryName ? `en la categoría "${categoryName}"` : 'en este momento'}.
            </Alert>
        </Container>
    );
  }
  
  const pageTitle = categoryName 
    ? `Productos en: ${categoryName}`
    : "Todos los Productos";

  return (
    <Container fluid className="mt-4 px-md-4 px-lg-5">
      <h2 className="mb-4 text-center" style={{ textTransform: 'capitalize' }}>{pageTitle}</h2>
      <Row>
        {filteredProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;