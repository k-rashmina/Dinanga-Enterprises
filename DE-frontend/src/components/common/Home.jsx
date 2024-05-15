import './home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/homepage.jpg';
import jobImg from '../../assets/homePageJob.jpg';
import Engineoilchange from '../../assets/engine oil change.jpg';
import homegallery1 from '../../assets/homegallery1.jpg';
import Hybridbatteryservice from '../../assets/battery service.jpg';
import Breakservice from '../../assets/break service.jpg';
import Bodywash from '../../assets/body wash.webp';
import Engineoverallrepair from '../../assets/engine overall repair.jpg';

function Home() {
  const style = {
    container: {
      position: 'relative',
      textAlign: 'center',
      color: 'white',
    },
    caption: {
      position: 'absolute',
      top: '50%', // Adjust this value if you need the caption lower
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '30px', // Increased font size
      fontWeight: 'bold',
      color: 'white',
      textShadow: '2px 2px 4px #000000',
      marginTop: '-100px', // Added top margin

    },
    image: {
      width: '100%', // This ensures the image covers the container
      height: 'auto'
    },
    description: {
      position: 'absolute',
      top: '70%', // Positioning the description below the caption
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '24px', // Suitable font size for paragraph text
      color: 'white', // Text color
      textShadow: '2px 2px 4px #000000', // Text shadow for readability
      width: '80%', // Width of the text block for better formatting
      padding: '20px' // Padding to provide some spacing
    }
  };

  return (
    <>

      <div className="section-1">
        <img src={backgroundImage} />
      </div>

      <div className="section-2">
        <div><img src={backgroundImage} className='section-2-img' /></div>
        <div className="section-2-details">
          <p className="Welcome-message">Welcome to Dinanga Enterprises</p>
          <p className="slogan">-The one place for all your spare part needs-</p>
          <center><Link to={'/about'}><button className="about-us-button">MORE ABOUT US</button></Link></center>
        </div>

      </div>

      <div className="section-3">
        <div style={{marginTop: '26px'}}><img src={backgroundImage} /></div>
        <div className="section-3-details" >
          <p className="section-3-header">Consultancy Service</p>
          <p className="section-3-info">We are thrilled to introduce our new appointment consultancy meeting feature, designed to streamline your experience and provide personalized assistance for all your spare parts needs. Our appointment consultancy meeting feature allows you to schedule dedicated time with our expert team to discuss your specific requirements, troubleshoot any issues you may be facing  with your spare part equipments. With just a few clicks, you can conveniently request an appointment. Simply select your preferred date and time, provide some basic information about your inquiry, and our team will confirm your appointment promptly.
          </p>
          <Link to={''}><button className="book-now-button">BOOK CONSULTANCY</button></Link>
        </div>

      </div>

      <div className="section-4">
        <div style={{marginTop: '26px'}}><img style={{height: '370px'}} src={jobImg} /></div>
        <div className="section-4-details">
          <p className="section-4-header">Job Services</p>
          <p className="section-4-info">Discover the unparalleled automotive care experience at Dinanga Enterprises! With a comprehensive suite of services including battery maintenance, brake servicing, engine overhauls, and meticulous detailing, we are your one-stop destination for all vehicle maintenance needs. Our expert technicians, equipped with cutting-edge technology and industry-leading expertise, ensure that every visit leaves your vehicle performing at its peak. Whether it's a routine oil change or a complex engine repair, trust Dinanga Enterprises to deliver quality service, reliability, and peace of mind with every mile. Experience excellence in automotive care – choose Dinanga Enterprises today.
          </p>
          <Link to={'/about'}><button className="appointment-button">MAKE APPOINTMENT</button></Link>
        </div>

      </div>


      <div className="section-5">
        <div className="section-5-header"><p>Gallery</p></div>
        <div className="gallery-imgs">
          <div><img alt="Engineoilchange" src={Engineoilchange} /></div>
          <div><img alt="homegallery1" src={homegallery1} /></div>
          <div><img alt="Hybridbatteryservice" src={Hybridbatteryservice} /></div>
          <div><img alt="Breakservice" src={Breakservice} /></div>
          <div><img alt="Bodywash" src={Bodywash} /></div>
          <div><img alt="Engineoverallrepair" src={Engineoverallrepair} /></div>
        </div>
      </div>

      
</>
);
}

export default Home;
