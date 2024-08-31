import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await api.post('/token/', values);
      localStorage.setItem('token', response.data.access);
      navigate('/customers');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
