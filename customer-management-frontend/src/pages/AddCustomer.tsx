import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddCustomer: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone_number: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    date_of_birth: Yup.date().required('Date of birth is required'),
    phone_number: Yup.string().required('Phone number is required'),
  });

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await api.post('/customers/', values);
      navigate('/customers');
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  return (
    <div>
      <h2>Add Customer</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="first_name">First Name</label>
            <Field name="first_name" type="text" />
            <ErrorMessage name="first_name" component="div" />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <Field name="last_name" type="text" />
            <ErrorMessage name="last_name" component="div" />
          </div>
          <div>
            <label htmlFor="date_of_birth">Date of Birth</label>
            <Field name="date_of_birth" type="date" />
            <ErrorMessage name="date_of_birth" component="div" />
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number</label>
            <Field name="phone_number" type="text" />
            <ErrorMessage name="phone_number" component="div" />
          </div>
          <button type="submit">Add Customer</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddCustomer;
