import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const CART_ACTIONS = {
  ADD_ITEM: 'add-item',
  REMOVE_ITEM: 'remove-item',
  UPDATE_QUANTITY: 'update-quantity',
  CLEAR_CART: 'clear-cart',
  LOAD_CART: 'load-cart',
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      return action.payload;
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const newState = [...state];
        newState[existingItemIndex].quantity += 1;
        return newState;
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }
    case CART_ACTIONS.REMOVE_ITEM: {
      return state.filter(item => item.id !== action.payload.id);
    }
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(item => item.id !== id);
      }
      return state.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      );
    }
    case CART_ACTIONS.CLEAR_CART:
      return [];
    default:
      return state;
  }
};

const getInitialCart = () => {
  const storedCart = localStorage.getItem('cart');
  try {
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error al parsear el carrito de localStorage:", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], getInitialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
    toast.success(`"${product.name}" agregado al carrito!`);
  };

  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id: productId } });
    toast.info('Producto eliminado del carrito.');
  };

  const updateItemQuantity = (productId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    toast.warn('El carrito ha sido vaciado.');
  };
  
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};