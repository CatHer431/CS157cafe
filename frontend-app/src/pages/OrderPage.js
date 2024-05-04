import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/orders", {
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
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Order Time</th>
            <th>Order Status</th>
            <th>Customer Name</th>
            <th>Quantity</th>
            <th>Special Instructions</th>
            <th>Product Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.order_id}</td>
              <td>{item.order_time}</td>{" "}
              {/* Replace 'column1' with actual column name from backend */}
              <td>{item.order_status}</td>{" "}
              {/* Replace 'column2' with actual column name from backend */}
              <td>{item.cname}</td>
              <td>{item.quantity}</td>
              <td>{item.special_instruction}</td>
              <td>{item.name}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
