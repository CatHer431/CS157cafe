import React, { useState, useEffect } from "react";
import axios from "axios";

const Employee = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employees", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "centre",
        alignItems: "centre",
        height: "100vh",
      }}
    >
      <h1>Employees</h1>
      <table>
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.employee_id}</td>{" "}
              {/* Replace 'column1' with actual column name from backend */}
              <td>{item.name}</td>{" "}
              {/* Replace 'column2' with actual column name from backend */}
              <td>{item.role}</td>
              <td>{item.user_name}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
