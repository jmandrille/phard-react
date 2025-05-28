import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Spinner, Button, Image as BsImage } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import phardNavbarLogo from '../../assets/images/phard-favicon.png';


function CustomNavbar() {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  const { isLoggedIn, login, logout, loadingAuth } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
   const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setErrorCategories(null);
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
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


  const handleLogin = () => {
    const username = prompt('Usuario:', 'user');
    const password = prompt('Contraseña:', 'pass');
    if (username && password) {
      const success = login(username, password);
      if (success) {
        navigate('/'); 
      } else {
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
      <Navbar.Brand as={Link} to="/">
  <BsImage
    src={phardNavbarLogo}
    alt="PHARD Logo"
    style={{ height: '30px' }}
  />
</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              {loadingCategories && ( <NavDropdown.ItemText><Spinner animation="border" size="sm" /> Cargando...</NavDropdown.ItemText>)}
              {errorCategories && (<NavDropdown.ItemText className="text-danger">Error</NavDropdown.ItemText>)}
              {!loadingCategories && !errorCategories && categories.length > 0 && categories.map((category, index) => (
                <NavDropdown.Item as={Link} to={`/categoria/${encodeURIComponent(category)}`} key={index} style={{ textTransform: 'capitalize' }}>
                  {category}
                </NavDropdown.Item>
              ))}
              {!loadingCategories && !errorCategories && categories.length === 0 && (<NavDropdown.ItemText>No hay categorías</NavDropdown.ItemText>)}
            </NavDropdown>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            {isLoggedIn && <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>}
          </Nav>
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/carrito" className="me-2">
              🛒 Carrito ({cartItemCount})
            </Nav.Link>
            {!loadingAuth && (
              isLoggedIn ? (
                <Button variant="outline-light" onClick={handleLogout} size="sm">Logout</Button>
              ) : (
                <Button variant="outline-success" onClick={handleLogin} size="sm">Login</Button>
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