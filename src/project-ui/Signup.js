import React, { useState } from "react";
import '../project-css/signup.css';

const Signup = () => {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirm_password: '',
        agreeToTerms: false,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState('');
    const [serverResponse, setServerResponse] = useState(null);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((formData) => ({
            ...formData,
            [name]: newValue,
        }));
    };

    const validateForm = () => {
        const errors = {};

        // Validation functions
        function isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        function isValidPassword(password) {
            return password.length >= 8;
        }

        // Validate the First Name  field (non-empty)
        if (formData.firstName.trim() === '' || formData.lastName.trim() === '') {
            errors.firstName = 'Required First and Last Name.';
        }

        // Validate the Email field
        if (!isValidEmail(formData.email)) {
            errors.email = 'Please enter a valid email address.';
        }

        // Validate the Password field
        if (!isValidPassword(formData.password)) {
            errors.password = 'Password must be at least 8 characters.';
        }

        // Validate the Confirm Password field
        if (formData.password !== formData.confirm_password) {
            errors.confirm_password = 'Passwords do not match.';
        }

        // Validate the Mobile field (you can add more specific validation if needed)
        if (formData.mobile.trim() === '') {
            errors.mobile = 'Required Mobile Number.';
        }

        // Validate the Terms and Conditions checkbox
        if (!formData.agreeToTerms) {
            errors.agreeToTerms = 'You must agree to the Terms and Conditions.';
        }

        setFormErrors(errors);

        // Return true if there are no errors, indicating the form is valid
        return Object.keys(errors).length === 0;
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
            setIsSubmitting(true); // Set isSubmitting to true when the form is submitted
            // Combine firstName and lastName into a single name field
            const name = `${formData.firstName}${formData.lastName ? ` ${formData.lastName}` : ''}`;

            try {
                const response = await fetch(`/user/new`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        password: formData.password,
                        mobile: formData.mobile,
                        roles: '', // You can adjust this as needed
                    }),
                });

                if (response.ok) {
                    setIsSubmitted(true);
                } else {
                    if (response.status === 400) {
                        const data = await response.json();
                        setError(data.error);
                    } else if(response.status === 302){
                        setError('User already exists.');
                    }else{
                        setError('An error occurred while registering. Please try again later.');
                    }
                }
            } catch (error) {
                console.error('Error registering user:', error);
                setError('An error occurred while registering. Please try again later.');
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="modal-body">
                <h2>Sign up now<span> Free!</span></h2>
                {isSubmitted ? (
                    <div className="success-message">
                        <p>Thank you for signing up!</p>
                    </div>
                ) : (
                    <>
                        {error && <p className="error text-danger">{error}</p>}
                        {serverResponse && (
                            <div className="alert alert-danger" role="alert">
                                {serverResponse}
                            </div>
                        )}
                        <form className="contact-form form-validate3" id="user-signup-form" noValidate="novalidate" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group form-outline">
                                        <label className="text-black-200 h6 font-weight-600 mb-2" htmlFor="firstName">First Name *</label>
                                        <input className="form-control"
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First Name"
                                            required=""
                                            autoComplete="off"
                                            aria-required="true" />
                                        {formErrors.firstName && <p className="error text-danger">{formErrors.firstName}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group form-outline">
                                        <label className="text-black-200 h6 font-weight-600 mb-2" htmlFor="lastName">Last Name *</label>
                                        <input className="form-control"
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Last Name"
                                            required=""
                                            autoComplete="off"
                                            aria-required="true" />
                                        {formErrors.lastName && <p className="error text-danger">{formErrors.lastName}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-black-200 h6 font-weight-600 mb-2" htmlFor="email">Email Address*</label>
                                <input className="form-control"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="E-mail"
                                    required=""
                                    autoComplete="off"
                                    aria-required="true" />
                                {formErrors.email && <p className="error text-danger">{formErrors.email}</p>}
                            </div>
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-black-200 h6 font-weight-600 mb-2" htmlFor="password">Password*</label>
                                        <input type="password"
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                            required=""
                                            autoComplete="off"
                                            aria-required="true" />
                                        {formErrors.password && <p className="error text-danger">{formErrors.password}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-black-200 h6 font-weight-600 mb-2" htmlFor="confirm_password">Confirm Password*</label>
                                        <input type="password"
                                            name="confirm_password"
                                            className="form-control"
                                            value={formData.confirm_password}
                                            onChange={handleChange}
                                            placeholder="Confirm Password"
                                            required=""
                                            autoComplete="off"
                                            aria-required="true" />
                                        {formErrors.confirm_password && <p className="error text-danger">{formErrors.confirm_password}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-black-200 h6 font-weight-600 mb-2" htmlFor="mobile">Mobile*</label>
                                <input type="tel"
                                    name="mobile"
                                    className="form-control"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Mobile"
                                    required=""
                                    autoComplete="off"
                                    aria-required="true" />
                                {formErrors.mobile && <p className="error text-danger">{formErrors.mobile}</p>}
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        required
                                    />
                                    I agree to the <a href="/TermsAndConditions">Terms and Conditions</a>
                                </label>
                                {formErrors.agreeToTerms && <p className="error text-danger">{formErrors.agreeToTerms}</p>}
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary" value="signup" id="signupBTN" disabled={isSubmitting}>
                                    {isSubmitting ? 'Signing Up...' : 'Sign up'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Signup;
