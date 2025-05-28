import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import ContactoPage from './pages/ContactoPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <CartProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/producto/:productId" element={<ProductDetailPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </CartProvider>
  );
}

export default App;