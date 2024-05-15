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
            <p>Email: dinangaenterprises@gmail.com</p>
          </div>
          <hr className="footer-line" />
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Address: 68,Paraththa road,Panadura, Sri Lanka</p>
              <p>Phone: +94702641683</p>
              <p>Fax: +9434567890</p>
            </div>
        </div>
        <hr className="footer-line" />
        <div className="footer-bottom">
            <p>Copyright&copy; 2024 ITP24_B5_13. All rights reserved.</p>
            <div className="social-media-links">
            <Link to={''}><img src={facebookImg} alt="Facebook" /></Link>
            <Link to={''}><img src={twitterImg} alt="Twitter" /></Link>
            <Link to={''}><img src={instagramImg} alt="Instagram" /></Link>
            </div>
            <div className="footer-buttons">
            <Link to={''}>Privacy Policy</Link>
            <Link to={''}>Terms and Conditions</Link>
            </div>
        </div>
      </footer>

  )

}

export default Footer;