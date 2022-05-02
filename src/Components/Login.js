import "../styles/Login.scss";
import React, { useState } from "react";
import "../styles/Login.scss";
import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import { ButtonFacebook, ButtonGoogle } from "../stylesComponents/loginStyles";
import googleIcon from "../assets/google.png";
import facebookIcon from "../assets/facebook.png";
import { useNavigate } from "react-router-dom";
import { loginFacebook, loginGoogle } from "../Redux/actions/user";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogin = (values, { setSubmitting }) => {
        console.log('values >>> ', values)
        setSubmitting(false);
    }
    const handleGoogle = () => {
        dispatch(loginGoogle());
        navigate('/');
    }
    const handleFacebook = () => {
        dispatch(loginFacebook());
        navigate('/');
    }
    return (
        <div className="loginContainer">
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={handleLogin} >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <div className="formController">
                        <form onSubmit={handleSubmit}>
                            <h1>Inicia sesion</h1>
                            <div>
                                <label>email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </div>
                            {errors.email && touched.email && errors.email}
                            <div>
                                <label>password</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </div>
                            {errors.password && touched.password && errors.password}
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                            <ButtonFacebook type="button" onClick={handleFacebook}>
                                <img width='20px' height='20px' src={facebookIcon} alt='Facebook Icon'/>
                                Continuar con Facebook
                            </ButtonFacebook>
                            <ButtonGoogle type="button" onClick={handleGoogle}>
                            <img width='20px' height='20px' src={googleIcon} alt='Google Icon'/>
                                <span>Continuar con Google</span>
                            </ButtonGoogle>
                        </form>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default Login;
