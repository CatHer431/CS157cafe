import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Employees() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employees");
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description} - {item.role} - {item.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
