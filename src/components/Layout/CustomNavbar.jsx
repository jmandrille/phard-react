import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

function CustomNavbar() {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setErrorCategories(null);
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setErrorCategories(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">PHARD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>

            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              {loadingCategories && (
                <NavDropdown.ItemText>
                  <Spinner animation="border" size="sm" role="status" aria-hidden="true" /> Cargando...
                </NavDropdown.ItemText>
              )}
              {errorCategories && (
                <NavDropdown.ItemText className="text-danger">Error al cargar</NavDropdown.ItemText>
              )}
              {!loadingCategories && !errorCategories && categories.length > 0 && categories.map((category, index) => (
                <NavDropdown.Item 
                  as={Link} 
                  to={`/categoria/${encodeURIComponent(category)}`} 
                  key={index}
                  style={{ textTransform: 'capitalize' }}
                >
                  {category}
                </NavDropdown.Item>
              ))}
              {!loadingCategories && !errorCategories && categories.length === 0 && (
                 <NavDropdown.ItemText>No hay categorías</NavDropdown.ItemText>
              )}
            </NavDropdown>

            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito">
              🛒 Carrito ({cartItemCount})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;