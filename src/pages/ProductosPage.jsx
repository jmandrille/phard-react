import React from 'react';
import ProductList from '../components/Products/ProductList';

function ProductosPage({ addToCart }) {
  return (
    <div>
      <ProductList addToCart={addToCart} />
    </div>
  );
}

export default ProductosPage;