import React from "react";
import { Link } from "react-router-dom";
import "./css/HeroSection.css";
import heroVideo from "../img/carmouche2.mp4";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <Link to="/explore" className="video-link">
        <div className="aspect-ratio-box">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hero-video"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <span className="hover-text">Explore Now</span>
        </div>
      </Link>
    </div>
  );
};

export default HeroSection;
