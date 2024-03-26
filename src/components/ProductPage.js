import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "./ProductService";
import ReactImageMagnify from "react-image-magnify";
import "./css/ProductPage.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [largeImageSize, setLargeImageSize] = useState({
    width: 1200,
    height: 1800,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        // Find the specific product in the array
        const specificProduct = products.find((p) => p.id === productId);
        setProduct(specificProduct);

        // Dynamically set large image size based on the actual image dimensions
        const img = new Image();
        img.src = specificProduct.imageUrl;
        img.onload = () => {
          setLargeImageSize({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };
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
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: product.name,
                isFluidWidth: true,
                src: product.imageUrl,
              },
              largeImage: {
                src: product.imageUrl,
                ...largeImageSize,
              },
              enlargedImagePosition: "over",
            }}
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
