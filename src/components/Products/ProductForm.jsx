import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';

function ProductForm({ initialData = null, onSubmit, loading, mode }) {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setProduct({
        title: initialData.title || '',
        price: initialData.price || '',
        description: initialData.description || '',
        image: initialData.image || '',
        category: initialData.category || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.title.trim()) newErrors.title = 'El nombre es obligatorio.';
    if (!product.price || parseFloat(product.price) <= 0) newErrors.price = 'El precio debe ser un número mayor a 0.';
    if (!product.description.trim() || product.description.length < 10) newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
    if (!product.image.trim()) newErrors.image = 'La URL de la imagen es obligatoria.';
    if (!product.category) newErrors.category = 'Debes seleccionar una categoría.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const productToSend = { ...product, price: parseFloat(product.price) };
      onSubmit(productToSend);
    }
  };

  const isEditMode = mode === 'edit';

  return (
    <Card>
      <Card.Body>
        {/* El título del formulario cambia según el modo */}
        <h2 className="text-center mb-4">{isEditMode ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
        <Form onSubmit={handleSubmit} noValidate>
          {/* Los campos del formulario son los mismos que antes */}
          <Form.Group className="mb-3" controlId="formProductTitle">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control type="text" name="title" value={product.title} onChange={handleChange} isInvalid={!!errors.title} required />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" name="price" value={product.price} onChange={handleChange} isInvalid={!!errors.price} required min="0.01" step="0.01" />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductImage">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control type="text" name="image" value={product.image} onChange={handleChange} isInvalid={!!errors.image} required placeholder="https://ejemplo.com/imagen.jpg" />
            <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
          </Form.Group>
            
          <Form.Group className="mb-3" controlId="formProductCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="category" value={product.category} onChange={handleChange} isInvalid={!!errors.category} required>
              <option value="">Selecciona una categoría</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleChange} isInvalid={!!errors.description} required />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          {/* El texto del botón también cambia según el modo */}
          <Button className="w-100" type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : (isEditMode ? 'Actualizar Producto' : 'Agregar Producto')}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProductForm;