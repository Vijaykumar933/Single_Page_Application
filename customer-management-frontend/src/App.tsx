// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import CustomerList from './pages/CustomerList';
import AddCustomer from './pages/AddCustomer';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
        <Route path="/add-customer" element={<ProtectedRoute><AddCustomer /></ProtectedRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
