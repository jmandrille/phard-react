// src/components/Layout/MainLayout.jsx
import React from 'react';
import { Container } from 'react-bootstrap'; // Solo se necesita Container aquí
import Header from './Header';
import Footer from './Footer';

function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container fluid as="main" className="py-4 flex-grow-1">
        {children}
      </Container>
      <Footer />
    </div>
  );
}

export default MainLayout;