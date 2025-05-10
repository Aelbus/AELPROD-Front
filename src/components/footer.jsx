import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../assets/svg/PROD_SVG.svg";
import "../styles/components/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>AELPROD</h3>
          <p>Création et maintenance de portfolios & sites professionnels.</p>
          <p>Code APE: 6201Z - Programmation informatique</p>
        </div>

        <div className="footer-section-group">
          <div className="footer-section">
            <h4>Liens Utiles</h4>
            <ul>
              <li>
                <NavLink to="/mentions-legales">Mentions légales</NavLink>
              </li>
              <li>
                <NavLink to="/conditions-generales">CGV</NavLink>
              </li>
              <li>
                <NavLink to="/politique-confidentialite">
                  Confidentialité
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <a
                  href="https://linktr.ee/AelBus"
                  target="_blank"
                  rel="noreferrer"
                >
                  Linktree
                </a>
              </li>
              <li>
                <a
                  href="https://aelprod.netlify.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-logo">
          <LogoSvg />
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AELPROD. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
