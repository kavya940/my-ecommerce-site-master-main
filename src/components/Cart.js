import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Cart({ cartItems, updateTotalCartItems, onClose, removeFromCart }) {
  const [localCartItems, setLocalCartItems] = useState(cartItems);

  useEffect(() => {
    updateTotalCartItems(localCartItems); // Update totalCartItems on mount and whenever cart changes
  }, [localCartItems, updateTotalCartItems]);

  const handleIncrement = (itemId) => {
    const updatedItems = localCartItems.map(item =>
      item.id === itemId
        ? { ...item, cartQuantity: item.cartQuantity + 1 }
        : item
    );
    setLocalCartItems(updatedItems);
    updateTotalCartItems(updatedItems); // Call the memoized update function
  };

  const handleDecrement = (itemId) => {
    const updatedItems = localCartItems.map(item =>
      item.id === itemId && item.cartQuantity > 1
        ? { ...item, cartQuantity: item.cartQuantity - 1 }
        : item
    );
    setLocalCartItems(updatedItems);
    updateTotalCartItems(updatedItems); // Call the memoized update function
  };

  const checkoutAlert = () => {
    alert('Order Placed');
  };

  return (
    <div className="cart-dropdown">
      <button onClick={onClose} className="cart-close-button">×</button>
      <h2>Your Cart</h2>
      {localCartItems.length > 0 ? (
        <div className="cart-items">
          {localCartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100} // Adjust the width as needed
                  height={100} // Adjust the height as needed
                />
              </div>
              <div className="cart-item-details">
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-item-quantity-control">
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <span className="cart-item-quantity">Qty: {item.cartQuantity}</span>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </div>
              </div>
              <button className="remove-item-button" onClick={() => removeFromCart(item.id)}>✖</button>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${localCartItems.reduce((total, item) => total + (item.price * item.cartQuantity), 0).toFixed(2)}</p>
            <button className="buy-now-button" onClick={checkoutAlert}>Buy Now</button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}
