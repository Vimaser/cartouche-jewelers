import React from "react";
import { Link } from 'react-router-dom';
import "./css/ProductCard.css";

const ProductCard = ({ product }) => {

  const renderPrice = () => {
    // Check if price is 0 or 0.00 and display 'Call Store For Price' in that case
    return product.price === 0 || parseFloat(product.price).toFixed(2) === '0' || ''
      ? 'Call Store For Price'
      : `$${product.price.toFixed(2)}`; // Make sure to format the price
  };

  return (
    <div className="product-card" style={{ width: "250px", backgroundColor: "rgba(245, 234, 214, 0.1)" }}>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
      )}
      <div className="product-info">
        <h3 style={{ color: "#FFFDD0" }}>{product.name}</h3>
        <p className="product-price" style={{ color: "#FFFDD0" }}>
          {renderPrice()}
        </p>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <button
            className="btn-view"
            style={{
              backgroundColor: "#FFFDD0",
              fontWeight: 900,
              color: "#36454F",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#AF9B70"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "#D2B48C"; }}
          >
            VIEW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;