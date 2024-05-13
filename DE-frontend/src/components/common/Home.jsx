import './home.css';
import React from 'react';
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


      {/* <div className="form-div">
        <form action="login.jsp" method="get">
          <div className="form-details">
            <div className="guest-div">
              <label for="guest">Guests: </label>
              <select name="guest" id="guest" required>
                <option value="" selected disabled hidden>Select an Option</option>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
              </select>
            </div>

            <div className="start-date-div">
              <label for="startDate">Check-in: </label>
              <input type="date" name="startDate" id="startDate" min="2023-10-23" required />
            </div>

            <div className="end-date-div">
              <label for="endDate">Check-out: </label>
              <input type="date" name="endDate" id="endDate" min="2023-10-23" required />
            </div>
          </div>
          <div className="search-rooms-button">
            <input type="submit" name="submit" id="submit" value="Search Rooms" />
          </div>

        </form>
      </div> */}

      <div className="section-2">
        <div><img src={backgroundImage} className='section-2-img' /></div>
        <div className="section-2-details">
          <p className="Welcome-message">Welcome to Regency Hotel</p>
          <p className="slogan">-You're one step closer to paradise</p>
          <a href="#"><button className="about-us-button">MORE ABOUT US</button></a>
        </div>

      </div>

      <div className="section-3">
        <div><img src={backgroundImage} /></div>
        <div className="section-3-details" >
          <p className="section-3-header">Rooms</p>
          <p className="section-3-info">Our hotel rooms are designed to provide guests with a comfortable and relaxing stay.
            Each room features a comfortable bed with clean linens and pillows, modern amenities such as a flat-screen TV, complimentary Wi-Fi, and a mini-fridge.<br/><br/>
              The private bathroom is equipped with clean towels, toiletries, and a shower or bathtub. Guests will find sufficient storage space for their belongings in the closet or dresser.
              Climate control is available in each room to ensure guests' comfort throughout their stay.<br/><br/>Safety features such as smoke detectors, fire alarms, and a safe for storing valuables are also provided.
                Daily housekeeping services are available to keep your room clean and tidy.
          </p>
          <a href="#"><button className="book-now-button">BOOK NOW</button></a>
        </div>

      </div>

      <div className="section-4">
        <div><img src={jobImg} /></div>
        <div className="section-4-details">
          <p className="section-4-header">Job Services</p>
          <p className="section-4-info">The Regency Hotel is a stunning example of modern architecture. The buildin's sleek lines and contemporary design are sure to impress guests as they approach.
            The hotel's entrance is marked by a striking glass canopy that provides shelter from the elements while also allowing natural light to flood the lobby.<br/><br/>
              The exterior of the building is accented with lush greenery, which provides a welcome contrast to the sleek metal and glass facade.
              Guests can enjoy the hotel's outdoor seating area, which features comfortable chairs and tables surrounded by fragrant flowers and plants.
              <br/><br/>The pool area is enhanced with comfortable seating, lush greenery, and water features to create a soothing and inviting atmosphere.
                The pool itself is designed to accommodate different activities, such as swimming laps, playing water games, or simply lounging in the sun.
                Whether you're looking to cool off on a hot day or enjoy some outdoor exercise.
          </p>
        </div>

      </div>


      <div className="section-5">
        <div className="section-5-header"><p>Gallery</p></div>
        <div className="gallery-imgs">
          <div><img alt="" src={Engineoilchange} /></div>
          <div><img alt="" src={homegallery1} /></div>
          <div><img alt="" src={Hybridbatteryservice} /></div>
          <div><img alt="" src={Breakservice} /></div>
          <div><img alt="" src={Bodywash} /></div>
          <div><img alt="" src={Engineoverallrepair} /></div>
        </div>
      </div>

      
</>
);
}

export default Home;
