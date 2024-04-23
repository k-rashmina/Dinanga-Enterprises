import React, { useState } from 'react';
import './SupplierRegForm.css';
import axios from 'axios';
import LoginForm from './LoginForm'; 

function SupplierRegForm() {
    const [formData, setFormData] = useState({
        Supplier_bname: '',
        Supplier_email: '',
        Supplier_contact: '',
        Supplier_aos: '',
        Supplier_Pw: '',
    });

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const [signedUp, setSignedUp] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios
                .post('http://localhost:5000/supplier/addsupplierdetails/', formData)
                .then(() => {
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                        setSignedUp(true); 
                    }, 3000); 
                })
                .catch(() => {
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                });
        }
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        // Validate Business Name
        if (!formData.Supplier_bname) {
            formIsValid = false;
            errors['Supplier_bname'] = 'Please enter your business name.';
        }

        // Validate Email
        if (!formData.Supplier_email) {
            formIsValid = false;
            errors['Supplier_email'] = 'Please enter your email address.';
        } else if (!/\S+@\S+\.\S+/.test(formData.Supplier_email)) {
            formIsValid = false;
            errors['Supplier_email'] = 'Please enter a valid email address.';
        }

        // Validate Contact Number
        if (!formData.Supplier_contact) {
            formIsValid = false;
            errors['Supplier_contact'] = 'Please enter your contact number.';
        } else if (!/^\d{10}$/.test(formData.Supplier_contact)) {
            formIsValid = false;
            errors['Supplier_contact'] = 'Please enter a valid 10-digit contact number.';
        }

        // Validate Area of Specialization
        if (!formData.Supplier_aos) {
            formIsValid = false;
            errors['Supplier_aos'] = 'Please enter your area of specialization.';
        }

        // Validate Password
        if (!formData.Supplier_Pw) {
            formIsValid = false;
            errors['Supplier_Pw'] = 'Please enter your password.';
        } else if (formData.Supplier_Pw.length < 8) {
            formIsValid = false;
            errors['Supplier_Pw'] = 'Password must be at least 8 characters long.';
        }

        // Validate Confirm Password
        if (!confirmPassword) {
            formIsValid = false;
            errors['confirmPassword'] = 'Please confirm your password.';
        } else if (formData.Supplier_Pw !== confirmPassword) {
            formIsValid = false;
            errors['confirmPassword'] = 'Passwords do not match.';
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'Supplier_Pw') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (signedUp) {
        return <LoginForm />; 
    }

    return (
        <div className="div-shadow rounded-4 position-relative" style={{ width: '650px', height: '600px', backgroundColor: 'white' }}>
            <h4 style={{ textAlign: 'center', paddingTop: '30px', paddingBottom: '30px', marginBottom: '20px', borderBottom: 'solid 2px' }}>Supplier Registration</h4>
            {showMessage && <div className="success-message">Registered successfully</div>}
            <form className="ps-3 pe-3" onSubmit={handleSubmit}>
                <label>Business Name</label><br />
                <input type="text" name="Supplier_bname" value={formData.Supplier_bname} onChange={handleChange} onBlur={handleChange} style={{ width: '618px', backgroundColor: 'white' }} className="border-color rounded-2" placeholder="Enter Business Name" />
                <span className="fs-6 text-danger">{errors['Supplier_bname']}</span>
                <br />
                
                <label>Email</label><br />
                <input type="email" value={formData.Supplier_email} onChange={handleChange} className="border-color rounded-2" style={{ width: '618px', backgroundColor: 'white' }} name="Supplier_email" placeholder="Jason@example.com" />
                <span className="fs-6 text-danger">{errors['Supplier_email']}</span>
                <br />

                <label>Contact Number</label><br />
                <input type="text" name="Supplier_contact" value={formData.Supplier_contact} onChange={handleChange} style={{ width: '618px', backgroundColor: 'white' }} className="border-color rounded-2" placeholder="+94 12 345 6789" />
                <span className="fs-6 text-danger">{errors['Supplier_contact']}</span>
                <br />

                <label>Area of Specialization</label><br />
                <input type="text" name="Supplier_aos" value={formData.Supplier_aos} onChange={handleChange} style={{ width: '618px', backgroundColor: 'white' }} className="border-color rounded-2" placeholder="Eg: Engine Repair" />
                <span className="fs-6 text-danger">{errors['Supplier_aos']}</span>
                <br />

                <div className="d-flex justify-content-between  flex-wrap">
                    <label style={{ width: '300px' }}>Password</label><br />
                    <label style={{ width: '300px' }}>Confirm Password</label><br />
                    <input type="password" name="Supplier_Pw" value={formData.Supplier_Pw} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className="border-color rounded-2" placeholder="*********"/>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className="border-color rounded-2" placeholder="*********"/>
                    <span className="fs-6 text-danger">{errors['Supplier_Pw']}</span>
                    <span className="fs-6 text-danger">{errors['confirmPassword']}</span>
                </div>

                <div className="d-flex justify-content-center position-absolute" style={{ top: '525px', left: '275px' }}>
                    <button className="reg-form-button rounded-5">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SupplierRegForm;
