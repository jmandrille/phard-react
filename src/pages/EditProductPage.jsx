import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/Products/ProductForm';
import { useProducts } from '../contexts/ProductsContext';

function EditProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct, loading: contextLoading } = useProducts();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const productToEdit = getProductById(productId);
    if (productToEdit) {
      setProduct(productToEdit);
    }

  }, [productId, getProductById]);

  const handleUpdateProduct = async (productData) => {
    setLoading(true);
    const success = await updateProduct(productId, productData);
    if (success) {
      alert('Producto actualizado exitosamente.');
      navigate('/admin/products');
    } else {
      alert('Hubo un error al actualizar el producto.');
    }
    setLoading(false);
  };

  if (contextLoading) {
    return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  }

  if (!product) {
    return <Container className="mt-5"><Alert variant="danger">Producto no encontrado.</Alert></Container>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <ProductForm 
          initialData={product} 
          onSubmit={handleUpdateProduct} 
          loading={loading} 
          mode="edit" 
        />
      </div>
    </Container>
  );
}

export default EditProductPage;