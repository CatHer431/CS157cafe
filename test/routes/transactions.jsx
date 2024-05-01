
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Transactions() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/transactions");
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
      <h1>Transactions</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.transaction_id} - ${item.total_amount} - {item.timestamp} -{" "}
            {item.payment_method}
          </li>
        ))}
      </ul>
    </div>
  );
}
