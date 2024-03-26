import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct, toggleFeaturedProduct } from "./ProductService";
import "./css/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleFeaturedChange = async (product, isFeatured) => {
    try {
      await toggleFeaturedProduct(product.id, isFeatured);
      fetchProducts(); // Refresh the list to reflect the change
    } catch (error) {
      console.error("Error toggling featured status:", error);
      // Handle error (show message to user, etc.)
    }
  };

  const handleDelete = async (product) => {
    console.log("Deleting product with ID:", product.id);
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(product.id, product.imageUrl); // Ensure product has both id and imageUrl
        setProducts(prevProducts => prevProducts.filter(p => p.id !== product.id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="products-container">
      {products.map(product => {
        return (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <label>
              Featured:
              <input
                type="checkbox"
                checked={product.featured}
                onChange={(e) => handleFeaturedChange(product, e.target.checked)}
              />
            </label>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="product-image" />
            )}
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <div>
              <button onClick={() => handleDelete(product)}>Delete</button>
              {/* Add an edit button if necessary */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
