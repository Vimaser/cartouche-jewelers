import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "./ProductService";
import { Dropdown } from "react-bootstrap";
import "./css/Explore.css";

const priceRanges = {
  All: () => true,
  "Under 100": (product) => product.price < 100,
  "100 - 500": (product) => product.price >= 100 && product.price <= 500,
  "Over 500": (product) => product.price > 500,
};

const useQuery = () => new URLSearchParams(useLocation().search);


const Explore = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const query = useQuery();
  const queryCategory = query.get("category");

  useEffect(() => {
    if (queryCategory) {
      setCategoryFilter(queryCategory);
    }
  }, [queryCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        console.log("Fetched Products:", fetchedProducts);
        setAllProducts(fetchedProducts.sort((a, b) => b.price - a.price));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let productsToDisplay = [...allProducts];
    console.log("Initial Products to Display:", productsToDisplay);

    // Apply search filter
    if (searchTerm) {
      productsToDisplay = productsToDisplay.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Apply brand filter
    if (brandFilter !== "All") {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.brand === brandFilter
      );
    }

    // Apply price filter
    const priceFilterFunc = priceRanges[priceFilter];
    productsToDisplay = productsToDisplay.filter(priceFilterFunc);

    console.log("Filtered Products to Display:", productsToDisplay);
    setDisplayedProducts(productsToDisplay);
  }, [allProducts, categoryFilter, brandFilter, priceFilter, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleBrandFilterChange = (e) => {
    setBrandFilter(e.target.value);
  };

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPrice = (price) => {
    // Check if price is 0 or 0.00 and display 'Call Store For Price' in that case
    return price === 0 || parseFloat(price).toFixed(2) === "0.00"
      ? "Call Store For Price"
      : `$${price.toFixed(2)}`;
  };

  const handleBootstrapSelect = (value) => {
    console.log("Dropdown Selected:", value);
    setCategoryFilter(value);
  };

  useEffect(() => {
    console.log("Category Filter:", categoryFilter);
    console.log("Brand Filter:", brandFilter);
    console.log("Price Filter:", priceFilter);
    console.log("Search Term:", searchTerm);
  }, [categoryFilter, brandFilter, priceFilter, searchTerm]);
  

  return (
    <div className="explore-background-image">
      <div className="explore-container">
        <div className="explore-header">
          <h2>Explore Products</h2>
          <input
            type="text"
            className="search-box"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
        </div>

        <div className="filter-container">
          <select
            className="filter-select"
            onChange={handleCategoryFilterChange}
            value={categoryFilter}
          >
            <option value="All">Filter By Category</option>
            <option value="Engagement Rings">Engagement Rings</option>
            <option value="Men's Wedding Bands">Men's Wedding Bands</option>
            <option value="Women's Wedding Bands">Women's Wedding Bands</option>
            <option value="Gold Jewelry">Gold Jewelry</option>
            <option value="Sterling Silver">Sterling Silver</option>
            <option value="Watches">Watches</option>
          </select>

          <select
            className="filter-select"
            onChange={handleBrandFilterChange}
            value={brandFilter}
          >
            <option value="All">Filter By Brand</option>
            <option value="Citizen">Citizen</option>
            <option value="Elle">Elle</option>
            <option value="Southern Gates">Southern Gates</option>
            <option value="N/A">N/A</option>
            <option value="Carmouche">Carmouche</option>
          </select>

          <select
            className="filter-select"
            onChange={handlePriceFilterChange}
            value={priceFilter}
          >
            <option value="All">Filter By Price</option>
            <option value="Under 100">Under $100</option>
            <option value="100 - 500">$100 - $500</option>
            <option value="Over 500">Over $500</option>
          </select>
        </div>

        {/* Bootstrap dropdowns for mobile still not working :/ */}
        <Dropdown className="filter-dropdown-mobile">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {categoryFilter}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onSelect={() => handleBootstrapSelect("All")}>
              All
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() => handleBootstrapSelect("Engagement Rings")}
            >
              Engagement Rings
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() => handleBootstrapSelect("Men's Wedding Bands")}
            >
              Men's Wedding Bands
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() => handleBootstrapSelect("Women's Wedding Bands")}
            >
              Women's Wedding Bands
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() => handleBootstrapSelect("Gold Jewelry")}
            >
              Gold Jewelry
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() => handleBootstrapSelect("Sterling Silver")}
            >
              Sterling Silver
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => handleBootstrapSelect("Watches")}>
              Watches
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="product-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="product-card"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  {/* <p>{product.description}</p> */}
                  <p>Price: {renderPrice(product.price)}</p>
                  {/* <p>Category: {product.category}</p> */}
                  {/* <p>Brand: {product.brand}</p> */}
                  {/* Additional product details can go here */}
                </div>
              </Link>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Explore;
