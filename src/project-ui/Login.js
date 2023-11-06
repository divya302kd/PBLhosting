import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../project-css/login.css';
import Signup from "./Signup";
import {Form, Modal} from "react-bootstrap";
import loginLogo from '../project-images/nwmsu-logo2.png'
import userLogo from '../project-images/user.png'
import SearchComponent from "../components/search/SearchComponent";

const Login = () => {
    const [formData, setFormData] = useState({
        userType: 'Admin',
        email: '',
        password: '',
    });

    const [sign, setSign] = useState(false),

        onOpenSignup = () => {
            setSign(true)
        },
        onCloseSignup = () => {
            setSign(false)
        };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [formErrors, setFormErrors] = useState({
        userType: '',
        email: '',
        password: '',
    });

    const [serverResponse, setServerResponse] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Added state to track form submission


    const validateForm = () => {
        const errors = {
            userType: '',
            email: '',
            password: '',
        };

        if (formData.userType === '') {
            errors.userType = 'Please select a User Type.';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.match(emailPattern)) {
            errors.email = 'Please enter a valid email address.';
        }

        if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters.';
        }

        setFormErrors(errors);

        return Object.values(errors).every((error) => error === '');
    };

    const handleServerResponse = (message) => {
        setServerResponse(message);
        setTimeout(() => {
            setServerResponse(null);
        }, 5000); // Adjust the timeout duration as needed (5 seconds in this example)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            // Do nothing if the form is already submitting
            return;
        }

        if (validateForm()) {
            setIsSubmitting(true); // Set isSubmitting to true when the form is submitte
            try {
                const response = await fetch(`/user/authenticate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userType: formData.userType,
                        username: formData.email,
                        password: formData.password,
                    }),
                });

                if (response.ok) {
                    const token = await response.text();

                    if (token) {
                        let isAdmin = formData.email.includes('admin');
                        localStorage.setItem('authToken', token);
                        localStorage.setItem('username', formData.email);
                        localStorage.setItem('isAdmin', isAdmin);
                        if(isAdmin) {
                            navigate('/Dashboard/admin');
                            return;
                        }
                        navigate('/Dashboard/landing');
                    } else {
                        console.error('No token found in response:', token);
                        setIsSubmitting(false)
                        handleServerResponse('Authentication failed. Please try again.');
                    }
                } else {
                    const errorMessage = await response.text();
                    console.error('Authentication failed with status:', response.status, errorMessage);
                    setIsSubmitting(false)
                    handleServerResponse(`Server Error: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Network error occurred:', error);
                setIsSubmitting(false)
                handleServerResponse('Network error. Please try again later.');
            }
        }
    };

    return (
        <div>
            <div>

                {serverResponse && (
                    <div className="alert alert-danger" role="alert">
                        {serverResponse}
                    </div>
                )}



                <div className="container p-4">
                        <div>
                            <div className="d-flex align-items-center justify-content-center">
                                <h4 style={{color: "#006747"}}>Login to your account</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <img src={userLogo} width={100} height={100}></img>
                            </div>
                            <form
                                style={{marginTop: '15px'}}
                                id="user-login-form"
                                onSubmit={handleSubmit}
                                className="contact-form form-validate3"
                                noValidate="novalidate"
                            >
                                <div className="form-group mt-2">
                                    <label htmlFor="userType">
                                        User Type*
                                    </label>

                                    <Form.Select
                                        className="form-control"
                                        id="userType"
                                        name="userType"
                                        value={formData.userType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Student/Faculty">Student/Faculty</option>
                                        <option value="Guest">Guest</option>
                                    </Form.Select>
                                    {formErrors.userType && <p className="error text-danger">{formErrors.userType}</p>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="email">
                                        Email*
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="off"
                                        aria-required="true"
                                    />
                                    {formErrors.email && <p className="error text-danger">{formErrors.email}</p>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="password">
                                        Password*
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        autoComplete="off"
                                        aria-required="true"
                                    />
                                    {formErrors.password && <p className="error text-danger">{formErrors.password}</p>}
                                </div>


                                <div className="d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary" value="login"
                                            disabled={isSubmitting}>
                                        {isSubmitting ? 'Logging In...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                            <p style={{marginTop: '15px'}}>
                                Not a user? <a href="/signup">Sign Up</a>
                            </p>
                            <p>
                                Forgot password? <a href="/reset-password">Reset Password</a>
                            </p>
                        </div>
                </div>
            </div>
            <Modal show={sign} onHide={onCloseSignup}>
                <Signup></Signup>
            </Modal>
        </div>
    );
};

export default Login;
