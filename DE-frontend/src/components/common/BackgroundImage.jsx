// import React from 'react'
// import backgroundImage from '../../assets/homepage.jpg'; 

// function BackgroundImage() {
//   return (
//     <div>
//       <div>
//         <h1>Background Image</h1>
//         <p>This is a background image</p>
//     </div>
//         <img src={backgroundImage} alt="background"/>
//     </div>
//   )
// }

// export default BackgroundImage


import React from 'react';
import backgroundImage from '../../assets/homepage.jpg';

function BackgroundImage() {
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
      fontSize: '80px',
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
    <div style={style.container}>
      <img src={backgroundImage} alt="background" style={style.image}/>
      <div style={style.caption}>Welcome to Dinanga Enterprises</div>
      <div style={style.description}>
        <p>
          At Dinanga Enterprises, we strive to deliver excellence and innovation in all we do. Our commitment to quality and customer satisfaction remains unwavering. Join us on our journey to success and experience the best of service and expertise.
        </p>
      </div>
    </div>
  );
}

export default BackgroundImage;
