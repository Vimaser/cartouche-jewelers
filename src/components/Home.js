import React from "react";
// import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import CategoryOverview from "./CategoryOverview";
// import DesignerSpotlight from "./DesignerSpotlight";
// import Testimonials from './Testimonials';
import Footer from "./Footer";
import FacebookPage from "./FacebookPage";
import GoogleMaps from "./GoogleMaps";
import img from "../img/breaker.png";
import "./css/Home.css";

const Home = () => {
  return (
    <div className="home-background-image">
      <img src={img} alt="banner breaker" className="banner-breaker" />
      <div className="container">
        <HeroSection />
      </div>
      <img src={img} alt="banner breaker" className="banner-breaker" />

      <div className="container">
        <FeaturedProducts />
      </div>
      <img src={img} alt="banner breaker" className="banner-breaker" />

      <div className="container">
        <CategoryOverview />
      </div>
      <img src={img} alt="banner breaker" className="banner-breaker" />

      <div className="facebook-container">
        <FacebookPage
          pageUrl="https://www.facebook.com/carmouchejewlers/"
          width="500"
          height="500"
        />
      </div>
      <img src={img} alt="banner breaker" className="banner-breaker" />

      {/*       <div className="home-background-image">
        <div className="container mt-5">
          <DesignerSpotlight />
        </div>
      </div> */}

      {/* Uncomment and wrap <Testimonials /> similarly if needed */}
      {/* <div className="home-background-image">
        <div className="container mt-5">
          <Testimonials />
        </div>
      </div> */}

      {/*       <div className="home-background-image">
        <div className="container mt-5">
          <div className="call-to-action">
            <h2>Discover Elegance</h2>
            <br/>
            <p>Explore our exclusive collection of timeless jewelry.</p>
            <br/>
            <Link to="/shop" className="shop-now-btn">
              Shop Now
            </Link>
          </div>
        </div>
      </div> */}
      <GoogleMaps />
      <Footer />
    </div>
  );
};

export default Home;
