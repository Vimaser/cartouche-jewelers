import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "./ProductService";
import "./css/FeaturedProducts.css";
import "./css/ProductCard.css";

SwiperCore.use([Navigation, Pagination]);

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getFeaturedProducts();
      console.log("Fetched products:", fetchedProducts);
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div className="featured-products-container">
      <h2>Featured Products</h2>
      <Swiper
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        centeredSlides={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          1200: {
            slidesPerView: 3,
            centeredSlides: false,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="swiper-card-wrapper">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedProducts;
