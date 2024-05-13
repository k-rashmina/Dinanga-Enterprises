import React from "react";
import { Link, useNavigate } from "react-router-dom";
import facebookImg from '../../assets/facebook.png';
import twitterImg from '../../assets/twitter.png';
import instagramImg from '../../assets/instagram.png';

const Footer = () => {
  return(
    <footer className="footer">
        <div className="footer-top">
          <div className="footer-section">
            <h3>SUPPORT</h3>
            <p>Email: regencyhotel@gmail.com</p>
          </div>
          <hr className="footer-line" />
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Address: 123 Dambulla, Sri Lanka</p>
              <p>Phone: +94702641683</p>
              <p>Fax: +9434567890</p>
            </div>
        </div>
        <hr className="footer-line" />
        <div className="footer-bottom">
            <p>Copyright&copy; 2023 Regency-Hotel. All rights reserved.</p>
            <div className="social-media-links">
            <a href="#"><img src={facebookImg} alt="Facebook" /></a>
            <a href="#"><img src={twitterImg} alt="Twitter" /></a>
            <a href="#"><img src={instagramImg} alt="Instagram" /></a>
            </div>
            <div className="footer-buttons">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms and Conditions</a>
            </div>
        </div>
      </footer>

  )

}

export default Footer;