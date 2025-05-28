import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/Products/ProductList';

function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <div>
      <ProductList categoryName={categoryName} />
    </div>
  );
}

export default CategoryPage;