import React from 'react';
import ReactDOM from 'react-dom/client';

// Your React components will go here

const App = () => {
  return (
    <div>
      <h1>Welcome to the Cafe Management App!</h1>
      {/* Add more React elements and components here */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


//Create an account
const form = document.getElementById('signUp-form');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace with your actual database connection details
  const url = 'http://localhost:3306/your_database_name'; // Adjust port and database name
  const data = { username, password };

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      message.textContent = 'Account created successfully!';
      form.reset(); // Clear the form after successful creation
    } else {
      const error = await response.text();
      message.textContent = `Error: ${error}`;
    }
  } catch (error) {
    console.error(error);
    message.textContent = 'An error occurred. Please try again.';
  }
});

