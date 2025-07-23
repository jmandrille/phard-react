import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/Products/ProductForm'; 
import { useProducts } from '../contexts/ProductsContext';

function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleAddProduct = async (productData) => {
    setLoading(true);
    const success = await addProduct(productData);
    if (success) {
      alert(`¡Producto "${productData.title}" agregado exitosamente!`);
      navigate('/admin/products');
    } else {
      alert('Hubo un error al agregar el producto. Por favor, intenta de nuevo.');
    }
    setLoading(false);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <ProductForm onSubmit={handleAddProduct} loading={loading} mode="add" />
      </div>
    </Container>
  );
}

export default AddProductPage;