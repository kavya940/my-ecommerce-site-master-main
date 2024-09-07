import { useState } from 'react';

export default function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({idealFor: ['all']});

  const handleDropdownChange = (event) => {
    const selectedCategory = event.target.value;
    setFilters((prev) => ({ ...prev, idealFor: [selectedCategory] }));

    // Pass the updated filters to the parent component
    onFilterChange({ ...filters, idealFor: [selectedCategory] });
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-heading">IDEAL FOR</div>
      <div className="filter-options">
        <div className="sort-dropdown">
          <select onChange={handleDropdownChange}>
            <option value="all">All</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Grocery</option>
            <option value="home-decoration">Home Decoration</option>
            <option value="kitchen-accessories">Kitchen Accessories</option>
            <option value="laptops">Laptops</option>
            <option value="mens-shirt">Men's Shirt</option>
            <option value="mens-shoes">Men's Shoes</option>
            <option value="mens-watches">Men's Watches</option>
            <option value="mobile-accessories">Mobile Accessories</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="skin-care">Skin Care</option>
            <option value="smartphones">Smartphones</option>
            <option value="sports-accessories">Sports Accessories</option>
            <option value="sunglasses">Sunglasses</option>
            <option value="tablets">Tablets</option>
            <option value="tops">Tops</option>
            <option value="vehicle">Vehicle</option>
            <option value="womens-bags">Women's Bags</option>
            <option value="womens-dresses">Women's Dresses</option>
            <option value="womens-jewellery">Jewellery</option>
            <option value="womens-shoes">Women's Shoes</option>
            <option value="womens-watches">Women's Watches</option>
          </select>

        </div>
      </div>
    </div>
  );
}
