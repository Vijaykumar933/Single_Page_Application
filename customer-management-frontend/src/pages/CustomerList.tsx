import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/customers/');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.first_name} {customer.last_name} - {customer.phone_number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
