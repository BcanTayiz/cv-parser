import React from 'react';
import { Link } from 'react-router-dom'; // Varsa, uygun bağlantı kütüphanesini kullanabilirsiniz
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className={"nav-brand"}>TaskerMG</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className={"nav-link"}>Home Page</Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className={"nav-link"}>Log out</Link>
          </li>
          <li className="nav-item">
            <Link to="/other-tools" className={"nav-link"}>Other Tools</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;