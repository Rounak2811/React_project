import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface SignUpFormProps {
  onSwitch: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitch }) => {
  const [passwordStrength, setPasswordStrength] = useState('');

  const validatePasswordStrength = (password: string) => {
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      setPasswordStrength('Strong');
    } else if (password.length > 6) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      })}
      onSubmit={(values) => {
        alert('Sign Up Successful');
      }}
    >
      {({ values }) => (
        <Form aria-label="Sign Up Form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" aria-required="true" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" aria-required="true" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                validatePasswordStrength(e.target.value);
              }}
              aria-required="true"
            />
            <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
              Strength: {passwordStrength || 'N/A'}
            </div>
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit">Sign Up</button>
          <button type="button" onClick={onSwitch}>
            Switch to Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
