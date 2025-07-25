import React, { useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Form, InputGroup, Pagination } from 'react-bootstrap';
import { useProducts } from '../../contexts/ProductsContext';
import Product from './Product';
import { FaSearch } from 'react-icons/fa';

function ProductList({ categoryName }) {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const filteredByCategory = categoryName
    ? products.filter(p => p.category === categoryName)
    : products;

  const filteredProducts = filteredByCategory.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  }

  if (error) {
    return <Container className="mt-5"><Alert variant="danger">Error al cargar productos: {error}</Alert></Container>;
  }

  const pageTitle = categoryName ? `Productos en: ${categoryName}` : "Todos los Productos";

  return (
    <Container fluid className="mt-4 px-md-4 px-lg-5">
      <h2 className="mb-4 text-center" style={{ textTransform: 'capitalize' }}>{pageTitle}</h2>
      
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar productos por nombre..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>
      </Row>

      {currentProducts.length > 0 ? (
        <>
          <Row>
            {currentProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Pagination>
                {[...Array(totalPages).keys()].map(number => (
                  <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                    {number + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </>
      ) : (
        <Container className="mt-5 text-center">
          <Alert variant="info" className="d-inline-block">
            No hay productos que coincidan con los filtros.
          </Alert>
        </Container>
      )}
    </Container>
  );
}

export default ProductList;