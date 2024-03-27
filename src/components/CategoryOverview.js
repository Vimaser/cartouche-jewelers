import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from './ProductService';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
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

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>Error loading categories: {error}</div>;

    return (
        <div className="category-overview-container">
            <h2>Explore by Category</h2>
            <Swiper
                spaceBetween={50}
                slidesPerView={1} // Default to 1 slide per view
                breakpoints={{
                    768: {
                        slidesPerView: 2, // 2 slides for medium screens
                    },
                    1024: {
                        slidesPerView: 3, // 3 slides for larger screens
                    },
                }}
                pagination={{ clickable: true }}
            >
                {categories.map(category => (
                    <SwiperSlide key={category.name}>
                        <div className="category-card">
                            <Link to={`/explore?category=${category.name}`}>
                                <img src={category.featuredImageUrl} alt={category.name} />
                                <p>{category.name}</p>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoryOverview;
