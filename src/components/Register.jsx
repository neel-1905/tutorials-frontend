import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "../styles/register.module.css";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRegisterDetails({
      ...registerDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerDetails?.name,
          email: registerDetails?.email,
          password: registerDetails?.password,
        }),
      });
      const formatRes = await res.json();
      if (!formatRes?.isSuccess) {
        throw new Error(formatRes?.message);
      }
      alert(formatRes?.message);
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={register.container}>
      <form
        className={register.form}
        onSubmit={(e) => {
          e.preventDefault();

          if (
            !registerDetails?.name ||
            !registerDetails?.email ||
            !registerDetails?.password ||
            !registerDetails?.confirmPassword
          ) {
            alert("Please fill all the details");
          } else {
            handleRegister();
          }
        }}
      >
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <input
          className={register.inputs}
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          className={register.inputs}
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <input
          className={register.inputs}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          className={register.inputs}
          type="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />

        <button className={register.btn}>Register</button>
      </form>
    </div>
  );
};

export default Register;
