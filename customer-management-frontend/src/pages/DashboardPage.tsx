import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import { createCustomer, fetchCustomers, deleteCustomer, updateCustomer } from "../services/CustomerService";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

interface ICustomerFormInputs {
  id?: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
}

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  date_of_birth: yup.string().required("Date of birth is required"),
  phone_number: yup.string().required("Phone number is required"),
});

const DashboardPage: React.FC = () => {
  const [customers, setCustomers] = useState<ICustomerFormInputs[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<ICustomerFormInputs[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<ICustomerFormInputs | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [view, setView] = useState<"list" | "add">("list"); // New state to handle view

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ICustomerFormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers", error);
        navigate("/error");
      }
    };
    loadCustomers();
  }, [navigate]);

  const onSubmit: SubmitHandler<ICustomerFormInputs> = async (data) => {
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id!, data);
        alert("Customer updated successfully!");
      } else {
        await createCustomer(data);
        alert("Customer added successfully!");
      }
      reset();
      setEditingCustomer(null);
      const updatedCustomers = await fetchCustomers();
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
      setView("list"); // Switch back to list view after adding/updating customer
    } catch (error: any) {
      console.error("Error saving customer", error);
      if (error.response && error.response.data) {
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        navigate("/error");
      }
    }
  };

  const handleEdit = (customer: ICustomerFormInputs) => {
    setEditingCustomer(customer);
    setValue("first_name", customer.first_name);
    setValue("last_name", customer.last_name);
    setValue("date_of_birth", customer.date_of_birth);
    setValue("phone_number", customer.phone_number);
    setView("add"); // Switch to add view for editing
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCustomer(id);
      alert("Customer deleted successfully!");
      const updatedCustomers = await fetchCustomers();
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    } catch (error: any) {
      console.error("Error deleting customer", error);
      if (error.response && error.response.data) {
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        navigate("/error");
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = customers.filter(
      (customer) =>
        customer.first_name.toLowerCase().includes(query) ||
        customer.last_name.toLowerCase().includes(query) ||
        customer.phone_number.includes(query)
    );
    setFilteredCustomers(filtered);
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  // Updated function to handle view change
  const handleViewChange = (newView: "list" | "add") => {
    setView(newView);
    if (newView === "add") {
      // Reset form and editing state when switching to 'add' view
      reset();
      setEditingCustomer(null);
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Fixed Logout Button at the Top Right Corner */}
      

      {/* Title */}
      <Box display="flex" justifyContent="space-between" marginBottom="10px">

      <Typography variant="h4" style={{ marginTop: "10px", marginBottom: "10px" }}>
        Customer Management
      </Typography>

      <Button
        variant="contained"
        color="warning"
        onClick={handleLogout}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        Logout
      </Button>
      </Box>
      

      {/* View Toggle Buttons */}
      <Box display="flex" justifyContent="space-between" marginBottom="10px">
        <Button variant="contained" color="primary" onClick={() => handleViewChange("list")}>
          Customer List
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleViewChange("add")}>
          Add New Customer
        </Button>
      </Box>

      {/* Search Bar (only in Customer List view) */}
      {view === "list" && (
        <TextField
          label="Search Customers"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      )}

      {/* Customer Form (only in Add Customer view) */}
      {view === "add" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="First Name"
            {...register("first_name")}
            error={!!errors.first_name}
            helperText={errors.first_name ? errors.first_name.message : ""}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            {...register("last_name")}
            error={!!errors.last_name}
            helperText={errors.last_name ? errors.last_name.message : ""}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            type="date"
            {...register("date_of_birth")}
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth ? errors.date_of_birth.message : ""}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Phone Number"
            {...register("phone_number")}
            error={!!errors.phone_number}
            helperText={errors.phone_number ? errors.phone_number.message : ""}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
            {editingCustomer ? "Update Customer" : "Add Customer"}
          </Button>
        </form>
      )}

      {/* Customer List Table (only in Customer List view) */}
      {view === "list" && (
        <>
          <Typography variant="h6" gutterBottom style={{ marginTop: "40px" }}>
            <b>
              Customer List
            </b>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date of Birth</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center"> Actions </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.first_name}</TableCell>
                    <TableCell>{customer.last_name}</TableCell>
                    <TableCell>{customer.date_of_birth}</TableCell>
                    <TableCell>{customer.phone_number}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleEdit(customer)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(customer.id!)} color="secondary">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )
      }
    </Container >
  );
};

export default DashboardPage;
