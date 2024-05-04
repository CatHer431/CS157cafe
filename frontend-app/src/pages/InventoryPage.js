import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/inventory", {
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
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Inventory ID</th>
            <th>IngredientID</th>
            <th>Ingredient Name</th>
            <th>Reorder Threshold</th>
            <th>quantity</th>
            <th>Exp Date</th>
            <th>Supplier</th>
            <th>Purchase Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.inventory_id}</td>
              <td>{item.ingredient_id}</td>{" "}
              {/* Replace 'column1' with actual column name from backend */}
              <td>{item.name}</td>{" "}
              {/* Replace 'column2' with actual column name from backend */}
              <td>{item.reorder_thres}</td>
              <td>{item.quantity}</td>
              <td>{item.exp_date}</td>
              <td>{item.supplier}</td>
              <td>{item.purchase_price}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
