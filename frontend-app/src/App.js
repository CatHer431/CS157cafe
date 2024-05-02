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
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route
                    path="/contact"
                    element={<ContactPage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
            </Routes>
        </Router>
    );
}

export default App;
