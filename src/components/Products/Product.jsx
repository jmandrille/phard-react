import React from 'react';
// 1. Importamos el componente 'Badge' de react-bootstrap
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

function Product({ product }) {
  const { addToCart } = useCart();

  const placeholderImage = "https://placehold.co/300x200?text=Producto";
  const productName = product?.name || "Nombre del Producto";
  const productPrice = product?.price || "99.99";
  const productImage = product?.image || placeholderImage;
  const productCategory = product?.category || "Categoría"; // Obtenemos la categoría

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }} className="h-100">
      <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Img
          variant="top"
          src={productImage}
          alt={productName}
          className="product-card-image-square"
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        {/* 2. Añadimos el Badge para mostrar la categoría */}
        <Badge bg="secondary" pill className="mb-2 align-self-start" style={{ textTransform: 'capitalize' }}>
          {productCategory}
        </Badge>
        <Card.Title className="flex-grow-1">
          <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {productName}
          </Link>
        </Card.Title>
        <Card.Text>
          Precio: ${productPrice}
        </Card.Text>
        <Button variant="primary" onClick={handleAddToCart} className="mt-auto">
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;