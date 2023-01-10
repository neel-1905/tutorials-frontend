import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import login from "../styles/login.module.css";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState(null);

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        context?.handleLogin();
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  }, []);

  const handleLoginSubmit = async () => {
    try {
      const res = await fetch(
        "https://tutorials-backend-kappa.vercel.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginDetails?.email,
            password: loginDetails?.password,
          }),
        }
      );

      const formatResponse = await res.json();

      if (!formatResponse?.isSuccess) {
        throw new Error(formatResponse?.message);
      }
      alert(formatResponse?.message);
      localStorage.setItem("token", formatResponse?.token);
      context?.handleLogin();
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={login.container}>
      <form
        className={login.form}
        onSubmit={(e) => {
          e.preventDefault();

          if (!loginDetails?.email || !loginDetails?.password) {
            alert("Please fill all the details");
          } else {
            handleLoginSubmit();
          }
        }}
      >
        <h2 style={{ textAlign: "center", padding: "0", margin: "0" }}>
          LOGIN
        </h2>
        <input
          className={login.inputs}
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <input
          className={login.inputs}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <h4 style={{ padding: "0", margin: "0" }}>
          Not a Member?{" "}
          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to="/register"
          >
            Sign Up
          </Link>
        </h4>
        <button className={login.btn}>Login</button>
      </form>
    </div>
  );
};

export default Login;
