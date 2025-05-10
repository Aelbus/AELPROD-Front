import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/PROD.png";
import "../styles/components/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Accueil" },
    { to: "/templates", label: "Templates" },
    { to: "/contact", label: "Contact" },
  ];

  if (isAdmin) {
    links.push({ to: "/admin", label: "Admin" });
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <img src={Logo} alt="Logo" className="logo" />
        </div>

        <div className="header-right">
          <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <ul>
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                {isAdmin ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="nav-link logout-btn"
                  >
                    Déconnexion
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Connexion
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
