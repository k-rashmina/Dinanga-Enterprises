import React, { useState } from 'react';
import './ServicesProvided.css';
import Article from "../../assets/Article.png";
import Article1 from "../../assets/Article-1.png";
import Article2 from "../../assets/Article-2.png";
import Article3 from "../../assets/Article-3.png";
import Article4 from "../../assets/Article-4.png";
import Article5 from "../../assets/Article-5.png";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const getServiceDetails = (service) => {
    switch (service) {
      case 'Packing':
        return "Our packing service ensures that your spare parts are securely packaged for safe delivery.";
      case 'Storing':
        return "We offer storage solutions to keep your spare parts organized and easily accessible.";
      case 'Mechanical Support':
        return "Our team provides expert mechanical support to ensure your spare parts are functioning optimally.";
      case 'Technical Help':
        return "Our technical help service offers assistance with any technical issues related to your spare parts.";
      case 'Repair and Maintenance':
        return "We specialize in repairing and maintaining spare parts to extend their lifespan.";
      case 'Delivery':
        return "We provide efficient delivery services to ensure your spare parts reach you on time.";
      default:
        return "";
    }
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h1><b>Services Provided</b></h1><br></br>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="service-item" onClick={() => handleServiceClick("Packing")}>
            <img src={Article4} alt="Packing" />
            <p><b>Packing</b></p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="service-item" onClick={() => handleServiceClick("Storing")}>
            <img src={Article3} alt="Storing" />
            <p><b>Storing</b></p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="service-item" onClick={() => handleServiceClick("Mechanical Support")}>
            <img src={Article} alt="Mechanical Support" />
            <p><b>Mechanical Support</b></p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="service-item" onClick={() => handleServiceClick("Technical Help")}>
            <img src={Article1} alt="Technical Help" />
            <p><b>Technical Help</b></p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="service-item" onClick={() => handleServiceClick("Repair and Maintenance")}>
            <img src={Article5} alt="Repair and Maintenance" />
            <p><b>Repair and Maintenance</b></p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="service-item" onClick={() => handleServiceClick("Delivery")}>
            <img src={Article2} alt="Delivery" />
            <p><b>Delivery</b></p>
          </div>
        </div>
      </div>
      {selectedService && (
        <div className="popup" onClick={() => setSelectedService(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn">×</span>
            <h2>{selectedService}</h2>
            <p>{getServiceDetails(selectedService)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
