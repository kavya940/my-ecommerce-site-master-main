import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import Filter from '../components/Filter';
import Cart from '../components/Cart';

export default function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(0);

  const searchOverlayRef = useRef(null);

  const toggleFilter = () => setShowFilter(!showFilter);
  const handleFilterChange = (updatedFilters) => setFilters(updatedFilters);
  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleCart = () => setShowCart(!showCart);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedQuantity(1);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  const updateTotalCartItems = useCallback((updatedCartItems) => {
    const total = updatedCartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
    setTotalCartItems(total);
  }, []);

  const addToCart = useCallback((cartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === cartItem.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = prevItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              cartQuantity: item.cartQuantity + cartItem.cartQuantity,
            };
          }
          return item;
        });
        updateTotalCartItems(updatedItems);
        return updatedItems;
      } else {
        const newCartItems = [...prevItems, cartItem];
        updateTotalCartItems(newCartItems);
        return newCartItems;
      }
    });
  }, [updateTotalCartItems]);

  const removeFromCart = useCallback((id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      updateTotalCartItems(updatedItems);
      return updatedItems;
    });
  }, [updateTotalCartItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchOverlayRef.current && !searchOverlayRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSearch]);

  return (
    <>
      <Head>
        <title>Just Another Cart</title>
        <meta name="description" content="Discover our products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onSearchClick={toggleSearch} totalCartItems={totalCartItems} onCartClick={toggleCart} />

      {showSearch && (
        <div className="search-overlay" ref={searchOverlayRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            autoFocus
          />
        </div>
      )}

      <main>
        {selectedProduct ? (
          <div className="product-details">
            <button className="back-button" onClick={handleBackClick}>←</button>
            <div className="product-info">
              <div className="product-image">
                <img 
                  src={selectedProduct.firstImageUrl || '/fallback-image.png'} 
                  alt={selectedProduct.title} 
                  style={{ width: '100%', height: 'auto' }} 
                  onError={(e) => e.currentTarget.src = '/fallback-image.png'} 
                />
              </div>
              <div className="product-content">
                <h2>{selectedProduct.title}</h2>
                <p>Category: {selectedProduct.category}</p>
                <p>Price: ${selectedProduct.price}</p>
                <p>{selectedProduct.description}</p>

                <div className="quantity-control">
                  <button onClick={() => setSelectedQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
                  <input type="text" value={selectedQuantity} readOnly />
                  <button onClick={() => setSelectedQuantity((prev) => prev + 1)}>+</button>
                </div>
                <button onClick={() => 
                    addToCart({ 
                      ...selectedProduct, 
                      cartQuantity: selectedQuantity, 
                      image: selectedProduct.firstImageUrl // Ensuring the image is passed to the cart
                    })}>Add to Cart</button>
              </div>
            </div>
          </div>
        ) : (
          <section className="product-section">
            <div className="filter-container">
              <button className="filter-toggle" onClick={toggleFilter}>
                {showFilter ? 'Hide Filter' : 'Show Filter'}
              </button>
              {showFilter && <Filter onFilterChange={handleFilterChange} />}
            </div>

            <ProductList
              filters={filters}
              searchQuery={searchQuery}
              onProductClick={handleProductClick}
              addToCart={addToCart} // Pass addToCart as a prop
            />
          </section>
        )}
      </main>

      <Footer />

      {showCart && (
        <Cart
          cartItems={cartItems}
          updateTotalCartItems={updateTotalCartItems}
          onClose={toggleCart}
          removeFromCart={removeFromCart} // Pass removeFromCart as a prop
        />
      )}
    </>
  );
}
