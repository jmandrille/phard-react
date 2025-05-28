import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Product({ product, addToCart }) {
  const placeholderImage = "https://placehold.co/300x200?text=Producto";
  const productName = product?.name || "Nombre del Producto";
  const productPrice = product?.price || "99.99";
  const productImage = product?.image || placeholderImage;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Img variant="top" src={productImage} alt={productName} />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Text>
          Precio: ${productPrice}
        </Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;