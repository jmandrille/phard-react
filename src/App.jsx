import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import ContactoPage from './pages/ContactoPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/producto/:productId" element={<ProductDetailPage />} />
            <Route path="/categoria/:categoryName" element={<CategoryPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;