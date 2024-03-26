import React from 'react';
import bannerVideo from "../img/banner.mp4";
import "./css/Banner.css";

const Banner = () => {
    return (
        <div className="banner-container">
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="banner-video"
            >
                <source src={bannerVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <span className="hover-text">Explore Now</span>
        </div>
    );
}

export default Banner;
