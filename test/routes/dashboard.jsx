import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const [err, setError] = useState(null);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Logout successful");
      navigate("/test2");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div id="sidebar">
        <h1>Dashboard</h1>
        <div>
          <form id="search-form" role="search">
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
            <button onClick={handleLogout}>Logout</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/employees`}>Employees</a>
            </li>
            <li>
              <a href={`/transactions`}>Transactions</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
