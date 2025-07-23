import React, { useState } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';

function AddProductForm({ onAddProduct, loading }) {
  // 1. ACTUALIZAMOS EL ESTADO INICIAL PARA QUE LOS CAMPOS ESTÉN VACÍOS
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '', // Antes estaba fijo, ahora está vacío
    category: '' // Antes estaba fijo, ahora está vacío
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.title.trim()) {
      newErrors.title = 'El nombre es obligatorio.';
    }
    if (!product.price || parseFloat(product.price) <= 0) {
      newErrors.price = 'El precio debe ser un número mayor a 0.';
    }
    if (!product.description.trim() || product.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
    }
    // 2. AÑADIMOS VALIDACIONES PARA LOS NUEVOS CAMPOS
    if (!product.image.trim()) {
      newErrors.image = 'La URL de la imagen es obligatoria.';
    }
    if (!product.category) {
      newErrors.category = 'Debes seleccionar una categoría.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const productToSend = { ...product, price: parseFloat(product.price) };
      onAddProduct(productToSend);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Agregar Nuevo Producto</h2>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formProductTitle">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
              required
              min="0.01"
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          {/* 3. AÑADIMOS EL CAMPO PARA LA URL DE LA IMAGEN */}
          <Form.Group className="mb-3" controlId="formProductImage">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              isInvalid={!!errors.image}
              required
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>
            
          {/* 4. AÑADIMOS EL CAMPO DE SELECCIÓN PARA LA CATEGORÍA */}
          <Form.Group className="mb-3" controlId="formProductCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="category"
              value={product.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="w-100" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                {' '}Agregando...
              </>
            ) : (
              'Agregar Producto'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddProductForm;