import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const apiUrl = 'https://6880fa88f1dcae717b643438.mockapi.io/api/v1/pedidos?userId=talento_user&sortBy=id&order=desc';
      
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('No se pudieron cargar los pedidos.');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  }

  if (error) {
    return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <Alert variant="info">Aún no has realizado ningún pedido.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nro de Pedido</th>
              <th>Fecha</th>
              <th>Cantidad de Ítems</th>
              <th>Importe Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.totalItems}</td>
                <td>${parseFloat(order.totalAmount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default OrdersPage;