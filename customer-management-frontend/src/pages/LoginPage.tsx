import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService"; // Import your login function

interface ILoginFormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginFormInputs> = async (data) => {
    try {
      await AuthService.login(data.username, data.password); // Call your login API
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } 
    catch (error) {
      console.error("Login failed", error);
      navigate("/error"); // Redirect to error page on failure
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "1em" }}>
      <h2>Customer Management Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
