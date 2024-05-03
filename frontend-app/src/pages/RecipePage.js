import React, { useState, useEffect } from "react";
import axios from "axios";

const Recipe = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes", {
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
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "centre",
        alignItems: "centre",
        height: "100vh",
      }}
    >
      <h1>Recipes</h1>
      <table>
        <thead>
          <tr>
            <th>RecipeID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.recipe_id}</td>{" "}
              {/* Replace 'column1' with actual column name from backend */}
              <td>{item.name}</td>{" "}
              {/* Replace 'column2' with actual column name from backend */}
              <td>{item.description}</td>
              <td>{item.ingredients}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recipe;
