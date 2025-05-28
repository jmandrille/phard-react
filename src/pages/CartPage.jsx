import React from 'react';
import Cart from '../components/Cart/Cart';

function CartPage({ cartItems, removeFromCart, updateQuantity }) {
  return (
    <div>
      <Cart 
        cartItems={cartItems} 
      />
    </div>
  );
}

export default CartPage;