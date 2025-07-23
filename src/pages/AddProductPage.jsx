import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AddProductForm from '../components/Products/AddProductForm';

function AddProductPage() {
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (productData) => {
    setLoading(true);
    // === URL ACTUALIZADA CON TU ENDPOINT DE MOCKAPI ===
    const apiUrl = 'https://6880fa88f1dcae717b643438.mockapi.io/api/v1/productos';
    // =================================================

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud a MockAPI');
      }

      const addedProduct = await response.json();
      console.log('Producto agregado a MockAPI:', addedProduct);
      alert(`¡Producto "${addedProduct.title}" agregado exitosamente!`);

    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('Hubo un error al agregar el producto. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <AddProductForm onAddProduct={handleAddProduct} loading={loading} />
      </div>
    </Container>
  );
}

export default AddProductPage;