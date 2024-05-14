import React, { useState } from 'react';
import './Aboutus.css';
import aboutimg from '../../assets/aboutus.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Aboutus = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    
    <section className="about">
      <div className="content">
        <img src={aboutimg} alt="about image" />
        <div className="text">
            <br/>
          <h1>About Us</h1>
          <h5>Efficiency Redefined:Your Hybrid Parts Solution! </h5>
          <p>
          Dinanga Enterprises is your premier destination for online hybrid vehicle spare parts management. With a commitment to excellence, we provide a seamless platform for sourcing and managing spare parts for hybrid vehicles. Our dedication to quality and innovation ensures that your hybrid journey is supported with precision and reliability.
            {showMore ? (
              <>
                Explore a comprehensive range of spare parts tailored to enhance your hybrid vehicle's performance and sustainability. Trust Dinanga Enterprises for all your hybrid spare parts needs.
              </>
            ) : null}
          </p>
          <button onClick={toggleReadMore} id="myBtn">
            {showMore ? 'Read less' : 'Read more'}
          </button>
        </div>
        <div className="social-linx">
          <h2>Social Media</h2>
          <p>Follow us on:</p>
          <br />
          <div className="Social media">
            <div className="wrapper">
              <div className="button">
                <div className="icon">
                  <a href="#">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </div>
                <span>Facebook</span>
              </div>
              <div className="button">
                <div className="icon">
                  <a href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
                <span>Twitter</span>
              </div>
              <div className="button">
                <div className="icon">
                  <a href="#">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
                <span>Instagram</span>
              </div>
              <div className="button">
                <div className="icon">
                  <a href="#">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </div>
                <span>YouTube</span>
              </div>
            </div>
          </div>
        </div>
    </div>
    
    </section>
  );
};

export default Aboutus;