import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Product from './Product';

function ProductList({ categoryName }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    const mockApiUrl = 'https://6880fa88f1dcae717b643438.mockapi.io/api/v1/productos';
    const fetchProducts = async () => {

      let finalUrl = `${mockApiUrl}?sortBy=id&order=desc`;
      if (categoryName) {
        finalUrl += `&category=${encodeURIComponent(categoryName)}`;
        setCurrentCategory(categoryName);
      } else {
        setCurrentCategory(null);
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(finalUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        

        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.title, 
          price: parseFloat(item.price).toFixed(2),
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
  }, [categoryName]);

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
        </Alert>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
        <Container className="mt-5 text-center">
            <Alert variant="info" className="d-inline-block">
              No hay productos disponibles {currentCategory ? `en la categoría "${currentCategory}"` : 'en este momento'}.
            </Alert>
        </Container>
    );
  }
  
  const pageTitle = currentCategory 
    ? `Productos en: ${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}` 
    : "Todos los Productos";

  return (
    <Container fluid className="mt-4 px-md-4 px-lg-5">
      <h2 className="mb-4 text-center" style={{ textTransform: 'capitalize' }}>{pageTitle}</h2>
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