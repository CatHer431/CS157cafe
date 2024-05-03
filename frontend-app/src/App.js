// filename -App.js

import React from "react";
import "./App.css";
import Navbar from './components/Navbar/index.js';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
//import HomePage from "./pages/HomePage";
import Inventory from "./pages/InventoryPage";
import Recipe from "./pages/RecipePage";
import Employee from "./pages/EmployeePage";
import Order from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/recipes" element={<Recipe />} />
                <Route path="/employees" element={<Employee />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
