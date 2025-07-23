import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Spinner, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import phardNavbarLogo from '/phard-navbar-logo.png';
import { FaShoppingCart } from 'react-icons/fa';

function CustomNavbar() {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  const { isLoggedIn, logout, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setErrorCategories(null);

        const response = await fetch('https://6880fa88f1dcae717b643438.mockapi.io/api/v1/productos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        const allCategories = products.map(product => product.category);
        const uniqueCategories = [...new Set(allCategories)];
        
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setErrorCategories(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={phardNavbarLogo}
            alt="Logo"
            style={{ height: '35px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
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
            {isLoggedIn && <Nav.Link as={Link} to="/mis-pedidos">Mis Pedidos</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to="/admin/products">Gestionar Productos</Nav.Link>}
          </Nav>
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/carrito" className="me-2">
              <FaShoppingCart className="me-1" /> Carrito ({cartItemCount})
            </Nav.Link>
            {!loadingAuth && (
              isLoggedIn ? (
                <Button variant="outline-light" onClick={handleLogout} size="sm">Logout</Button>
              ) : (
                <Button as={Link} to="/login" variant="outline-success" size="sm">Login</Button>
              )
            )}
            {loadingAuth && <Spinner animation="border" size="sm" variant="light" />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;