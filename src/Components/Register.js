import "../styles/Login.scss";
import React, { useState } from "react";
import "../styles/Login.scss";
import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/actions/user";


const Register = () => {
  const dispatch = useDispatch();
  const handleRegister = (values, { setSubmitting }) => {
    console.log('values >>> ', values)
    dispatch(registerUser(values));
  }
  return (
    <div className="loginContainer">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={handleRegister}
      >
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
              <h1>Registrate</h1>
              <div>
                <label>username</label>
                <input
                  type="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </div>
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
              <div>
                <label>Re-password</label>
                <input
                  type="password"
                  name="rePassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rePassword}
                />
              </div>
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );

}

export default Register;