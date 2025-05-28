import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product';

const mockProducts = [
  { id: 1, name: 'Producto Elegante 1', price: '120.50', image: 'https://placehold.co/300x200/E8D5C4/31304D?text=Producto+1' },
  { id: 2, name: 'Artículo Moderno 2', price: '85.00', image: 'https://placehold.co/300x200/A79277/31304D?text=Producto+2' },
  { id: 3, name: 'Gadget Útil 3', price: '49.99', image: 'https://placehold.co/300x200/D1BB9E/31304D?text=Producto+3' },
  { id: 4, name: 'Accesorio Genial 4', price: '25.75', image: 'https://placehold.co/300x200/EFEBE0/31304D?text=Producto+4' },
  { id: 5, name: 'Extra Atractivo 5', price: '150.00', image: 'https://placehold.co/300x200/E8D5C4/31304D?text=Producto+5' },
  { id: 6, name: 'Novedad Brillante 6', price: '99.00', image: 'https://placehold.co/300x200/A79277/31304D?text=Producto+6' },
];

function ProductList() {
  return (
    <Container fluid className="mt-4 px-md-4 px-lg-5">
      <Row>
        {mockProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;