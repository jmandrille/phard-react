import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import ContactoPage from './pages/ContactoPage';
import CartPage from './pages/CartPage';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };


  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/productos" 
          element={<ProductosPage addToCart={addToCart} />} 
        />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route 
          path="/carrito" 
          element={<CartPage cartItems={cartItems} />} 
        />
      </Routes>
    </MainLayout>
  );
}

export default App;