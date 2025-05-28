//src/App.jsx
import React from 'react';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import ContactoPage from './pages/ContactoPage';

import './App.css';

function App() {
  return (
    <MainLayout>

      <ProductosPage />
    </MainLayout>
  );
}

export default App;