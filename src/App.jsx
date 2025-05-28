import React, { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import ProductosPage from './pages/ProductosPage';
// Más adelante, aquí también podríamos querer mostrar el componente Cart o pasarle cartItems
import Cart from './components/Cart/Cart';
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
      <ProductosPage addToCart={addToCart} />
      {/* Mostrar temporalmente el carrito para pruebas */}
      <div className="container mt-5"> {/* Usamos un container de bootstrap para centrar el carrito */}
        <Cart cartItems={cartItems} />
      </div>
    </MainLayout>
  );
}

export default App;