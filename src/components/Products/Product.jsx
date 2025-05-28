import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

function Product({ product }) {
  const { addToCart } = useCart();

  const placeholderImage = "https://placehold.co/300x200?text=Producto";
  const productName = product?.name || "Nombre del Producto";
  const productPrice = product?.price || "99.99";
  const productImage = product?.image || placeholderImage;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Img variant="top" src={productImage} alt={productName} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {productName}
          </Link>
        </Card.Title>
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