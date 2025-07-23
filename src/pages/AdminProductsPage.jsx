import React from 'react';
import { useProducts } from '../contexts/ProductsContext';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function AdminProductsPage() {
  const { products, loading, error, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const handleDelete = (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      deleteProduct(productId);
    }
  };

  if (loading) {
    return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  }

  if (error) {
    return <Container className="mt-5"><Alert variant="danger">Error al cargar productos: {error}</Alert></Container>;
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Gestión de Productos</h1>
        <Button variant="primary" onClick={() => navigate('/admin/add-product')}>
          <FaPlus className="me-2" />
          Agregar Producto
        </Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
              <td>${parseFloat(product.price).toFixed(2)}</td>
              <td>
                <Button title="Ver" variant="info" size="sm" className="me-2" onClick={() => navigate(`/producto/${product.id}`)}>
                  <FaEye />
                </Button>
                <Button title="Editar" variant="warning" size="sm" className="me-2" onClick={() => navigate(`/admin/edit/${product.id}`)}>
                  <FaEdit />
                </Button>
                <Button title="Eliminar" variant="danger" size="sm" onClick={() => handleDelete(product.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminProductsPage;