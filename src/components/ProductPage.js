import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "./ProductService";
import "./css/ProductPage.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const specificProduct = products.find((p) => p.id === productId);
        setProduct(specificProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const renderPrice = () => {
    return product.price === 0 ||
      parseFloat(product.price).toFixed(2) === "0.00"
      ? "Call Store For Price"
      : `$${parseFloat(product.price).toFixed(2)}`;
  };

  return (
    <div className="product-page-background-image">
      <div className="product-page">
        <div className="product-image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {renderPrice()}</p>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <Link to="/explore" className="return-now-btn">
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
