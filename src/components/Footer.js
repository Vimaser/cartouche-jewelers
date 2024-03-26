import React from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="location-section">
        <a href="https://www.google.com/maps/place/409+Belle+Terre+Blvd,+Laplace,+LA+70068" target="_blank" rel="noopener noreferrer">
          <p>409 Belle Terre Blvd,</p>
          <p>Laplace, LA 70068</p>
        </a>
        <a href="tel:+19853593155">(985) 359-3155</a>
      </div>

      <div className="footer-section">
        <p>© 2024 Carmouche Jewelers</p>
        <div className="social-links-container">
          <a
            href="https://www.facebook.com/carmouchejewlers/"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <div className="admin">
            <Link to="/adminpage" className="social-link">
              AdminPage
            </Link>
          </div>
        </div>
      </div>

      <div className="hours-section">
        <p>Tue-Fri: 9:00am - 5:00pm</p>
        <p>Sat: 9:30am - 2:00pm</p>
        <p>Sun-Mon: Closed</p>
      </div>
    </footer>
  );
};

export default Footer;
