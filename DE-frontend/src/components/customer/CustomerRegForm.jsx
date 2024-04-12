import React, { useEffect, useState } from 'react';
import "./CustomerRegForm.css";
import regbg from "../../assets/regbg.png";
import axios from "axios";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post("http://localhost:5000/customer/addcustomerdetails", formData)
        .then(() => {
          alert("Registered successfully");
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
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
    <div className='div-shadow rounded-4 position-relative' style={{ width: '650px', height: '500px', backgroundColor: 'white' }}>
      <h4 style={{ textAlign: 'center', paddingTop: '30px', paddingBottom: '30px', marginBottom: '20px', borderBottom: 'solid 2px' }}>User Registration</h4>
      <form className='ps-3 pe-3 ' onSubmit={handleSubmit}>
        <label className=''>Name</label><br />
        <div className='d-flex justify-content-between '>
          <input type="text" name='cusFname' value={formData.cusFname} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder='First Name' />
          <input type="text" name='cusLname' value={formData.cusLname} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder='Last Name' />
          {errors.cusFname && <span className="text-danger">{errors.cusFname}</span>}
          {errors.cusLname && <span className="text-danger">{errors.cusLname}</span>}
        </div>

        <div className='d-flex justify-content-between  flex-wrap'>
          <label style={{ width: '300px' }}>Date Of Birth</label>
          <label style={{ width: '300px' }}>Phone</label>
          <input type="date" name='bDate' value={formData.bDate} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder='' />
          <input type="text" name='pNum' value={formData.pNum} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder='' />
          {errors.bDate && <span className="text-danger">{errors.bDate}</span>}
          {errors.pNum && <span className="text-danger">{errors.pNum}</span>}
        </div>
        <div>
          <label>Address</label><br />
          <input type="text" value={formData.cusAddr} onChange={handleChange} className='border-color rounded-2' style={{ width: '618px', backgroundColor: 'white' }} name="cusAddr" />
          {errors.cusAddr && <span className="text-danger">{errors.cusAddr}</span>}
        </div>
        <div>
          <label>Email</label><br />
          <input type="email" value={formData.cusMail} onChange={handleChange} className='border-color rounded-2' style={{ width: '618px', backgroundColor: 'white' }} name="cusMail" />
          {errors.cusMail && <span className="text-danger">{errors.cusMail}</span>}
        </div>
        <div className='d-flex justify-content-between  flex-wrap'>
          <label style={{ width: '300px' }}>Password</label>
          <label style={{ width: '300px' }}>Confirm Password</label>
          <input type="password" name='cusPassword' value={formData.cusPassword} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder='' />
          {errors.cusPassword && <span className="text-danger">{errors.cusPassword}</span>}
          <input type="password" name='pw' value={formData.pw} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className='border-color rounded-2' placeholder='' />
          {errors.pw && <span className="text-danger">{errors.pw}</span>}
        </div>
        <div className='d-flex justify-content-center mt-5 '>
          <button className='reg-form-button rounded-5'>Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default CustomerRegForm;
