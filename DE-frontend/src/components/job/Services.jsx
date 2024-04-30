import React from 'react';
import { useNavigate } from 'react-router-dom';

import batteryReplacement from '../../assets/batteryreplacement.jpeg';
import Hybridbatteryservice from '../../assets/battery service.jpg';
import ABSreplacement from '../../assets/bad-abs-module.jpg';
import Breakservice from '../../assets/break service.jpg';
import Engineoilchange from '../../assets/engine oil change.jpg';
import Engineoverallrepair from '../../assets/engine overall repair.jpg';
import Dualclutchoilchange from '../../assets/dual clutch oil change.jpg';
import Bodywash from '../../assets/body wash.webp';
import Invertercoolantchange from '../../assets/Hybrid-Inverter-Coolant.jpg';

// Placeholder data for the services
const servicesData = [
  {
    title: 'Battery replacement',
    price: 'Rs.10,000',
    imageUrl: batteryReplacement,
  },
  {
    title: 'Hybrid battery service',
    price: 'Rs.15,000',
    imageUrl: Hybridbatteryservice,
  },
  {
    title: 'ABS replacement',
    price: 'Rs.15,000',
    imageUrl: ABSreplacement,
  },
  {
    title: 'Break service',
    price: 'Rs.4,500',
    imageUrl: Breakservice,
  },
  {
    title: 'Engine oil change',
    price: 'Rs.1,500',
    imageUrl: Engineoilchange,
  },
  {
    title: 'Engine overall repair',
    price: 'Rs.50,000',
    imageUrl: Engineoverallrepair,
  },
  {
    title: 'Dual clutch oil change',
    price: 'Rs.2,000',
    imageUrl: Dualclutchoilchange,
  },
  {
    title: 'Body wash',
    price: 'Rs.600',
    imageUrl: Bodywash,
  },
  {
    title: 'Inverter coolant change',
    price: 'Rs.2,000',
    imageUrl: Invertercoolantchange,
  },
  // ... other services
];

const Services = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate('/jobAppointment');
  };

  return (
    <div  style={{ paddingTop: '40px', backgroundColor: '#191B1A' }}> {/* Added style to remove gap */}
    <div className="container bg-dark" style={{ color: '#fff',maxWidth: '150vh', minHeight: '100vh', WebkitAlignContent: 'center'}}>
      <h4 className="mb-4" style={{ textAlign: 'left', fontSize: '3rem', fontStyle: 'Bold'}}>Services</h4>
      <div className="row">
        {servicesData.map((service, index) => (
          <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
            <div className="card text-white bg-secondary mb-3" style={{ margin: 0, height: '300px' }}>
              <img src={service.imageUrl} className="card-img-top" alt={service.title} style={{ objectFit: 'cover', height: '160px' }}/>
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.price}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12 text-center mt-3">
          <button type="button" className="btn btn-primary" onClick={handleAppointmentClick} style={{ backgroundColor: '#00adb4', color: '#fff', fontWeight: 'Bold', padding: '10px 30px',marginBottom:'30px',fontSize: '1rem', borderRadius: '25px' }}>
            Make Job Appointment
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Services;
