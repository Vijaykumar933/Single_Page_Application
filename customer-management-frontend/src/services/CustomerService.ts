import axios from "axios";

const API_URL = "http://localhost:8000/api/customers/";

export const fetchCustomers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCustomer = async (customerData: any) => {
  const response = await axios.post(API_URL, customerData);
  return response.data;
};

export const updateCustomer = async (id: number, customerData: any) => {
  const response = await axios.put(`${API_URL}${id}/`, customerData);
  return response.data;
};

export const deleteCustomer = async (id: number) => {
  const response = await axios.delete(`${API_URL}${id}/`);
  return response.data;
};
