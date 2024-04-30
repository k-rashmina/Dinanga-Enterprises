import React, { useEffect, useState } from 'react';
import "./CustomerRegForm.css";
import regbg from "../../assets/regbg1.png";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function CustomerRegForm() {
  const [formData, setFormData] = useState({
    cusFname: '',
    cusLname: '',
    bDate:'',
    cusMail:'',
    cusPassword:'',
    pNum:'',
    cusAddr:'',
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post("http://localhost:5000/customer/addcustomerdetails", formData)
        .then(() => {
          alert("Registered successfully");
          navigate('/cuslogin');
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Prevent typing special characters
    if (/^[a-zA-Z]*$/.test(value)) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));

      // Validate each field as it changes
      const newErrors = { ...errors };
      switch (name) {
        case 'cusFname':
        case 'cusLname':
          newErrors[name] = value.trim() === '' ? 'This field is required' : '';
          break;
        case 'bDate':
          newErrors[name] = value === '' ? 'This field is required' : '';
          break;
        case 'cusMail':
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          newErrors[name] = !emailPattern.test(value) ? 'Invalid email address' : '';
          break;
        case 'cusPassword':
          newErrors[name] = value.length < 8 ? 'Password must be at least 8 characters long' : '';
          break;
        case 'pw':
          newErrors[name] = value !== formData.cusPassword ? 'Passwords do not match' : '';
          break;
        case 'pNum':
          const phonePattern = /^\d{10}$/;
          newErrors[name] = !phonePattern.test(value) ? 'Invalid phone number' : '';
          break;
        case 'cusAddr':
          newErrors[name] = value.trim() === '' ? 'This field is required' : '';
          break;
        default:
          break;
      }
      setErrors(newErrors);
    } else {
      // Special characters entered, do not update the state
    }
  };

  const validateForm = () => {
    let valid = true;

    // Check if any errors exist
    for (const error in errors) {
      if (errors.hasOwnProperty(error)) {
        if (errors[error] !== '') {
          valid = false;
          break;
        }
      }
    }
    return valid;
  };

  return (
    <div className='div-shadow rounded-4 position-relative' style={{ width: '650px', height: '650px', backgroundColor: 'white' }}>
      <h4 style={{ textAlign: 'center', paddingTop: '30px', paddingBottom: '30px', marginBottom: '20px', borderBottom: 'solid 2px' }}>User Registration</h4>
      <form className='ps-3 pe-3 ' onSubmit={handleSubmit}>
        <label className=''>Name</label><br />
        <div className='d-flex justify-content-between flex-wrap'>
          <input type="text" name='cusFname' value={formData.cusFname} onChange={handleChange} onBlur={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder='First Name' required />
          <input type="text" name='cusLname' value={formData.cusLname} onChange={handleChange} onBlur={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder='Last Name' required />
          <div className="text-danger" style={{ width: '300px', height: '20px'}} >{errors.cusFname}</div>
          <div className="text-danger" style={{ width: '300px', height: '20px'}} >{errors.cusLname}</div>
        </div>

        <div className='d-flex justify-content-between  flex-wrap'>
          <label style={{ width: '300px' }}>Date Of Birth</label>
          <label style={{ width: '300px' }}>Phone</label>
          <input type="date" name='bDate' value={formData.bDate} onChange={handleChange} onBlur={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder='' required />
          <input type="text" name='pNum' value={formData.pNum} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder=' 07XXXXXXXX' required />
          <div className="text-danger" style={{ width: '300px', height: '20px'}}>{errors.bDate}</div>
          <div className="text-danger" style={{ width: '300px', height: '20px'}}>{errors.pNum}</div>
        </div>
        <div>
          <label>Address</label><br />
          <input type="text" value={formData.cusAddr} onChange={handleChange} onBlur={handleChange} className='border-color rounded-2' style={{ width: '618px', backgroundColor: 'white' }} name="cusAddr" required />
          <div className="text-danger" style={{ width: '300px', height: '20px'}}>{errors.cusAddr}</div>
        </div>
        <div>
          <label>Email</label><br />
          <input type="email" value={formData.cusMail} onChange={handleChange}  className='border-color rounded-2' style={{ width: '618px', backgroundColor: 'white' }} name="cusMail" placeholder=' Jhon@mail.com' required />
          <div className="text-danger" style={{ width: '300px', height: '20px'}}>{errors.cusMail}</div>
        </div>
        <div className='d-flex justify-content-between  flex-wrap'>
          <label style={{ width: '300px' }}>Password</label>
          <label style={{ width: '300px' }}>Confirm Password</label>
          <input type="password" name='cusPassword' value={formData.cusPassword} onChange={handleChange} onBlur={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2'  required />
          
          <input type="password" name='pw' value={formData.pw} onChange={handleChange} onBlur={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2'  required />
          <div className="text-danger" style={{ width: '300px', height: '20px'}}>{errors.cusPassword}</div>
          <div className="text-danger" style={{ width: '300px', height: '20px'}}>{errors.pw}</div>
        </div>
        <div className='d-flex justify-content-center mt-5 position-absolute' style={{top: '525px', left: '275px'}}>
          <button className='reg-form-button rounded-5'>Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default CustomerRegForm;
