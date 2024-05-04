import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./AuthenticationTitle.module.css";

export function Register() {
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/signup", inputs);
      navigate("/recipes");
    } catch (err) {
      setError(err.response.data);
    }
  };


  //ONLY KEEP STYLING! THE LOGIC DOES NOT WORK!
  
  return (
    <div className="container" style={{ maxWidth: 420, margin: "40px auto" }}>
      <h1 className={classes.title} style={{ textAlign: "center" }}>
        Sign Up!
      </h1>

      <div className="paper" style={{ border: "1px solid #ddd", padding: 30, borderRadius: 10, marginTop: 30}}>

        <div style={{ marginBottom: 15}}> 
        <label htmlFor="name" style={{ marginRight: 10 }}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          required
          value={inputs.name}
          onChange={handleChange}
        />
        </div>

        <div style={{ marginBottom: 15 }}>
        <label htmlFor="role" style={{ marginRight: 10 }}>Role</label>
        <select id="role" name="role" required value={inputs.role} onChange={handleChange}>
          <option value="">Pick Value</option>
          <option value="manager">manager</option>
          <option value="employee">employee</option>
        </select>
        </div>

        <div style={{ marginBottom: 15 }}>
        <label htmlFor="username" style={{ marginRight: 10 }}>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="firstIntialLastName"
          required
          value={inputs.username}
          onChange={handleChange}
        />
        </div>

        <div style={{ marginBottom: 15 }}>
        <label htmlFor="password" style={{ marginRight: 10 }}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          required
          value={inputs.password}
          onChange={handleChange}
        />
        </div>
        <div style={{ marginTop: 20 }}></div>
        <button type="submit" onClick={handleSubmit} style={{ width: "100%" }}>
          Register
        </button>
      </div>
    </div>
  );
}


export default Register;
