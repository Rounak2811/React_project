import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface LoginFormProps {
  onSwitch: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const handleSubmit = (values: { email: string; password: string; rememberMe: boolean }) => {
    if (values.rememberMe) {
      localStorage.setItem('rememberedEmail', values.email);
    }
    alert('Login Successful');
  };

  return (
    <Formik
      initialValues={{
        email: localStorage.getItem('rememberedEmail') || '',
        password: '',
        rememberMe: false,
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form aria-label="Login Form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" aria-required="true" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" aria-required="true" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>
              <Field name="rememberMe" type="checkbox" />
              Remember Me
            </label>
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={onSwitch}>
            Switch to Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
