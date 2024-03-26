import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from './ProductService';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './css/CategoryOverview.css';

const CategoryOverview = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const fetchedProducts = await getProducts();
                const categoryMap = new Map();
                fetchedProducts.forEach(product => {
                    if (!categoryMap.has(product.category)) {
                        categoryMap.set(product.category, {
                            name: product.category,
                            featuredImageUrl: product.imageUrl,
                        });
                    }
                });
                setCategories(Array.from(categoryMap.values()));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
      };

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>Error loading categories: {error}</div>;

    return (
        <div className="category-overview-container">
            <h2>Explore by Category</h2>
            <Slider {...sliderSettings}>
                {categories.map(category => (
                    <div key={category.name} className="category-card">
                        <Link to={`/explore?category=${category.name}`}>
                            <img src={category.featuredImageUrl} alt={category.name} />
                            <p>{category.name}</p>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategoryOverview;
