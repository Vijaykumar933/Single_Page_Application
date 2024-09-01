import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/.");
  };

  return (
    <Container style={{ textAlign: "center", padding: "2em" }}>
      <Typography variant="h4" gutterBottom>
        Error Occurred
      </Typography>
      <Typography variant="body1" gutterBottom>
        Something went wrong. Please try again later.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>
    </Container>
  );
};

export default ErrorPage;
