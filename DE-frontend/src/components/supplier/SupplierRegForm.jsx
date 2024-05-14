import React, { useState } from 'react';
import './SupplierRegForm.css';
import axios from 'axios';
import LoginForm from './LoginForm';
import regbg from "../../assets/regbg1.png";
import { useNavigate } from 'react-router-dom';

function SupplierRegForm() {
    const date = new Date().toJSON();
    const today = date.substring(0, 10);

    const [formData, setFormData] = useState({
        Supplier_bname: '',
        Supplier_email: '',
        Supplier_contact: '',
        Supplier_aos: '',
        Supplier_Pw: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

    const navigate = useNavigate();

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
        let formIsValid = true;
        let newErrors = {};

        for (const field in formData) {
            switch (field) {
                case 'Supplier_bname':
                    if (!formData[field]) {
                        formIsValid = false;
                        newErrors[field] = 'Please enter your business name.';
                    } else if (/[^A-Za-z0-9\s]/.test(formData[field])) {
                        formIsValid = false;
                        newErrors[field] = 'Please enter only alphabets and numbers for business name.';
                    }
                    break;
                case 'Supplier_email':
                    if (!formData[field]) {
                        formIsValid = false;
                        newErrors[field] = 'Please enter your email address.';
                    } else if (!/^\S+@\S+\.\S+$/.test(formData[field])) {
                        formIsValid = false;
                        newErrors[field] = 'Please enter a valid email address.';
                    }
                    break;
                case 'Supplier_contact':
                    if (!formData[field]) {
                        formIsValid = false;
                        newErrors[field] = 'Please enter your contact number.';
                    } else if (!/^\d{10}$/.test(formData[field])) {
                        formIsValid = false;
                        newErrors[field] = 'Please enter a 10-digit contact number.';
                    }
                    break;
                case 'Supplier_aos':
                    if (!formData[field]) {
                        formIsValid = false;
                        newErrors[field] = 'Please enter your area of specialization.';
                    } else if (/[^A-Za-z\s]/.test(formData[field])) {
                        formIsValid = false;
                        newErrors[field] = 'Please enter only alphabets for area of specialization.';
                    }
                    break;
                case 'Supplier_Pw':
                    if (!formData[field]) {
                        formIsValid = false;
                        newErrors[field] = 'Please enter your password.';
                    } else if (formData[field].length < 8) {
                        formIsValid = false;
                        newErrors[field] = 'Password must be at least 8 characters long.';
                    }
                    break;
                case 'confirmPassword':
                    if (!formData[field]) {
                        formIsValid = false;
                        newErrors[field] = 'Please confirm your password.';
                    } else if (formData[field] !== formData['Supplier_Pw']) {
                        formIsValid = false;
                        newErrors[field] = 'Passwords do not match.';
                    }
                    break;
                default:
                    break;
            }
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Block typing if symbols entered for business name
        if (name === 'Supplier_bname') {
            if (/[^A-Za-z0-9\s]/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: 'Please enter only alphabets and numbers for business name.',
                }));
                return;
            }
        }
        // Limit contact number to 10 digits
        if (name === 'Supplier_contact') {
            if (!/^\d{0,10}$/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: 'Please enter a maximum of 10 digits for contact number.',
                }));
                return;
            }
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        // Clear error message when user starts typing again
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
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
                <input type="tel" name="Supplier_contact" value={formData.Supplier_contact} onChange={handleChange} style={{ width: '618px', backgroundColor: 'white' }} className="border-color rounded-2" placeholder="1234567890" />
                <span className="fs-6 text-danger">{errors['Supplier_contact']}</span>
                <br />

                <label>Area of Specialization</label><br />
                <input type="text" name="Supplier_aos" value={formData.Supplier_aos} onChange={handleChange} style={{ width: '618px', backgroundColor: 'white' }} className="border-color rounded-2" placeholder="Eg: Engine Repair" />
                <span className="fs-6 text-danger">{errors['Supplier_aos']}</span>
                <br />

                <div className="d-flex justify-content-between  flex-wrap">
                    <label style={{ width: '300px' }}>Password</label><br />
                    <label style={{ width: '300px' }}>Confirm Password</label><br />
                    <input type="password" name="Supplier_Pw" value={formData.Supplier_Pw} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className="border-color rounded-2" placeholder="*********" />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={{ width: '300px', backgroundColor: 'white' }} className="border-color rounded-2" placeholder="*********" />
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
