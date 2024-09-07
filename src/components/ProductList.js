import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductList({
  filters,
  setFilters,
  searchQuery,
  onProductClick,
  sortOption: initialSortOption,
  addToCart, // Add the addToCart function as a prop
}) {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState(initialSortOption || 'recommended');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const totalPages = 20; // Updated total pages

  useEffect(() => {
    const fetchDataWithTimeout = (url, timeout = 5000) => {
      return Promise.race([
        fetch(url),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout)),
      ]);
    };

    const fetchData = async () => {
      setLoading(true);

      const skip = (currentPage - 1) * 10;
      let url = `https://dummyjson.com/products?limit=10&skip=${skip}`;

      if (filters.idealFor && filters.idealFor[0] !== 'all') {
        url = `https://dummyjson.com/products/category/${filters.idealFor[0]}?limit=10&skip=${skip}`;
      }

      try {
        const res = await fetchDataWithTimeout(url, 5000);
        const data = await res.json();
        console.log('Fetched Data:', data);
        processProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const processProducts = (data) => {
      let sortedProducts = [...(data.products || data)];
      sortedProducts = sortedProducts.map((product) => {
        const firstImageUrl = product.images && product.images.length > 0 ? product.images[0] : '';
        return { ...product, firstImageUrl };
      });

      if (sortOption === 'priceHighToLow') {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'priceLowToHigh') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'newestFirst') {
        sortedProducts.sort((a, b) => b.id - a.id);
      } else if (sortOption === 'popular') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
      }

      setProducts(sortedProducts);
    };

    fetchData();
  }, [filters, sortOption, currentPage]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  const handlePageChange = (pageNumber) => {
    if (filters.idealFor && filters.idealFor[0] !== 'all') {
      alert('Set Filter to "All" in order to traverse through pages.');
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handleNextPageGroup = () => {
    if (filters.idealFor && filters.idealFor[0] !== 'all') {
      alert('Set Filter to "all" in order to traverse through pages.');
    } else if (startPage + 10 <= totalPages) {
      setStartPage(startPage + 10);
      setCurrentPage(startPage + 10);
    }
  };

  const handlePreviousPageGroup = () => {
    if (filters.idealFor && filters.idealFor[0] !== 'all') {
      alert('Set Filter to "all" in order to traverse through pages.');
    } else if (startPage > 1) {
      setStartPage(startPage - 10);
      setCurrentPage(startPage - 10);
    }
  };

  const handleInputChange = (e) => {
    if (filters.idealFor && filters.idealFor[0] !== 'all') {
      alert('Set Filter to "all" in order to traverse through pages.');
    } else {
      setInputPage(Math.min(Math.max(e.target.value, 1), totalPages));
    }
  };

  const handleInputSubmit = () => {
    if (filters.idealFor && filters.idealFor[0] !== 'all') {
      alert('Set Filter to "all" in order to traverse through pages.');
    } else {
      setCurrentPage(inputPage);
    }
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.firstImageUrl, // Pass the image URL to the cart
      cartQuantity: 1,
    };
    if (addToCart) {
      addToCart(cartItem); // Use the addToCart function from props
    }
  };

  return (
    <div className="product-list-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}

      {!loading && !selectedProduct ? (
        <>
          {/* Product Header */}
          <div className="product-header">
            <span>{filteredProducts.length} Items</span>
            <div className="sort-dropdown">
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="newestFirst">Newest First</option>
                <option value="popular">Popular</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="priceLowToHigh">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Top Pagination */}
          <div className="pagination">
            <div className="page-controls">
              <button
                className="page-arrow"
                onClick={handlePreviousPageGroup}
              >
                &lt;
              </button>
              {Array.from({ length: Math.min(10, totalPages - startPage + 1) }, (_, index) => (
                <button
                  key={startPage + index}
                  className={`page-button ${currentPage === startPage + index ? 'active' : ''}`}
                  onClick={() => handlePageChange(startPage + index)}
                >
                  {startPage + index}
                </button>
              ))}
              <button
                className="page-arrow"
                onClick={handleNextPageGroup}
              >
                &gt;
              </button>
            </div>
            <div className="page-input-container">
              <input
                type="number"
                min="1"
                max={totalPages}
                value={inputPage}
                onChange={handleInputChange}
                className="page-input"
              />
              <button onClick={handleInputSubmit} className="go-to-page-button">
                Go
              </button>
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image">
                  <Image
                    src={product.firstImageUrl || '/fallback-image.png'}
                    alt={product.title}
                    width={300}
                    height={300}
                    layout="intrinsic"
                    placeholder="blur"
                    blurDataURL="/placeholder-image.png"
                    onError={(e) => {
                      e.currentTarget.src = '/fallback-image.png';
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pagination */}
          <div className="pagination">
            <div className="page-controls">
              <button
                className="page-arrow"
                onClick={handlePreviousPageGroup}
              >
                &lt;
              </button>
              {Array.from({ length: Math.min(10, totalPages - startPage + 1) }, (_, index) => (
                <button
                  key={startPage + index}
                  className={`page-button ${currentPage === startPage + index ? 'active' : ''}`}
                  onClick={() => handlePageChange(startPage + index)}
                >
                  {startPage + index}
                </button>
              ))}
              <button
                className="page-arrow"
                onClick={handleNextPageGroup}
              >
                &gt;
              </button>
            </div>
            <div className="page-input-container">
              <input
                type="number"
                min="1"
                max={totalPages}
                value={inputPage}
                onChange={handleInputChange}
                className="page-input"
              />
              <button onClick={handleInputSubmit} className="go-to-page-button">
                Go
              </button>
            </div>
          </div>
        </>
      ) : (
        selectedProduct && (
          <div className="product-detail">
            <button onClick={handleBackClick}>Back</button>
            <div className="product-detail-image">
              <Image
                src={selectedProduct.firstImageUrl || '/fallback-image.png'}
                alt={selectedProduct.title}
                width={600}
                height={600}
                layout="intrinsic"
              />
            </div>
            <div className="product-detail-info">
              <h2>{selectedProduct.title}</h2>
              <p>{selectedProduct.description}</p>
              <p>${selectedProduct.price}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
