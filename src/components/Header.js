import { useState } from 'react';
import Cart from './Cart'; 

export default function Header({ onSearchClick, totalCartItems, onCartClick, showCart }) {
  return (
    <header>
      <div className="header-left">
        <img src="/favicon.ico" alt="Logo" className="logo" />
      </div>
      <div>
        <nav>
          <ul>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Skills</a></li>
            <li><a href="#">Stories</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <button onClick={onSearchClick} className="header-icon">
          <img src="/search-icon.png" alt="Search" />
        </button>
        <button onClick={onCartClick} className="header-icon">
          <img src="/cart-icon.png" alt="Cart" className="cart-icon" />
          {totalCartItems > 0 && (
            <div className="cart-item-count">{totalCartItems}</div>
          )}
        </button>
        <a href="#" className="header-icon"><img src="/user-icon.png" alt="User" /></a>
      </div>

      {showCart && <Cart cartItems={[]} onClose={onCartClick} />}
    </header>
  );
}
