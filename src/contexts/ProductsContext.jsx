import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockApiUrl = 'https://6880fa88f1dcae717b643438.mockapi.io/api/v1/productos';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${mockApiUrl}?sortBy=id&order=desc`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos.');
      }
      const data = await response.json();
      const formattedProducts = data.map(item => ({
        ...item,
        name: item.title,
      }));
      setProducts(formattedProducts);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (productData) => {
    try {
      const response = await fetch(mockApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Error al agregar el producto.');
      fetchProducts();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      const response = await fetch(`${mockApiUrl}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Error al actualizar el producto.');
      fetchProducts();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${mockApiUrl}/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el producto.');
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  const getProductById = (productId) => {
    return products.find(p => p.id === productId);
  };

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};