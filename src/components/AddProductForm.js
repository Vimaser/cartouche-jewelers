import React, { useState } from "react";
import { addProduct, uploadProductImage } from "./ProductService";

const AddProductForm = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    category: "Watches",
    brand: "Citizen",
  });
  const [categories, setCategories] = useState([
    "Engagement Rings",
    "Men's Wedding Bands",
    "Women's Wedding Bands",
    "Gold Jewelry",
    "Necklaces",
    "Sterling Silver",
    "Watches",
  ]);
  const [brands, setBrands] = useState(["Citizen", "Elle", "Southern Gates", "N/A", "Carmouche"]);
  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "add-new") {
      setProductDetails({ ...productDetails, category: "" });
    } else {
      setProductDetails({ ...productDetails, category: value });
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleNewCategorySubmit = () => {
    const categoryToAdd = newCategory.trim();
    if (categoryToAdd && !categories.includes(categoryToAdd)) {
      setCategories([...categories, categoryToAdd]);
      setProductDetails({ ...productDetails, category: categoryToAdd });
      setNewCategory("");
    }
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    if (value === "add-new-brand") {
      setProductDetails({ ...productDetails, brand: "" });
    } else {
      setProductDetails({ ...productDetails, brand: value });
    }
  };

  const handleNewBrandChange = (e) => {
    setNewBrand(e.target.value);
  };

  const handleNewBrandSubmit = () => {
    const brandToAdd = newBrand.trim();
    if (brandToAdd && !brands.includes(brandToAdd)) {
      setBrands([...brands, brandToAdd]);
      setProductDetails({ ...productDetails, brand: brandToAdd });
      setNewBrand("");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadProductImage(image);
      }
      // Parse price as a number before submitting
      const productData = {
        ...productDetails,
        imageUrl,
        price: parseFloat(productDetails.price) || 0,
      };

      await addProduct(productData);
      // Reset form, converting price back to a string
      setProductDetails({
        name: "",
        price: "",
        description: "",
        category: "",
        brand: "",
      });
      setImage(null);
      setMessage("Product added successfully!");
    } catch (error) {
      setMessage(`Error adding product: ${error.message}`);
    }
  };

  return (
    <div>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={productDetails.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="price"
          value={productDetails.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <textarea
          name="description"
          value={productDetails.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>

        <select
          name="category"
          value={productDetails.category}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          <option value="add-new">Add New Category...</option>
        </select>
        {productDetails.category === "" && newCategory === "" && (
          <input
            value={newCategory}
            onChange={handleNewCategoryChange}
            onBlur={handleNewCategorySubmit}
            placeholder="Enter new category"
          />
        )}

        <select
          name="brand"
          value={productDetails.brand}
          onChange={handleBrandChange}
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
          <option value="add-new-brand">Add New Brand...</option>
        </select>
        {productDetails.brand === "" && newBrand === "" && (
          <input
            value={newBrand}
            onChange={handleNewBrandChange}
            onBlur={handleNewBrandSubmit}
            placeholder="Enter new brand"
          />
        )}

        <input type="file" onChange={handleImageChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
