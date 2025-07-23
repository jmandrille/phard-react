import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProductsProvider } from './contexts/ProductsContext';
import MainLayout from './components/Layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import ContactoPage from './pages/ContactoPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import AddProductPage from './pages/AddProductPage';
import AdminProductsPage from './pages/AdminProductsPage';
import EditProductPage from './pages/EditProductPage';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './pages/NotFoundPage';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/producto/:productId" element={<ProductDetailPage />} />
              <Route path="/categoria/:categoryName" element={<CategoryPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="/carrito" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/mis-pedidos" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />

              <Route path="/admin/products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} />
              <Route path="/admin/add-product" element={<ProtectedRoute><AddProductPage /></ProtectedRoute>} />
              <Route path="/admin/edit/:productId" element={<ProtectedRoute><EditProductPage /></ProtectedRoute>} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;