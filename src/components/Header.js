import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/Header.css";
import Logout from "./Logout";

const Header = ({ hasNewMessages }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      {user && hasNewMessages && <div className="notification-bell">Messages!</div>}
      <nav className={isMenuOpen ? "open" : ""}>
        <div className="hamburger" onClick={handleMenuToggle}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="menu-items">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
          <Link to="/explore" onClick={() => setIsMenuOpen(false)}>EXPLORE</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
          {user && <Logout />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
