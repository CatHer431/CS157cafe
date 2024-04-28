const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sessions = require("express-session");
const checkRole = require("./auth-role");
const http = require("http");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  sessions({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, //24 hours
    },
  })
);

const mysqlConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password1",
  database: process.env.DB_NAME || "user_management",
};

let con = null;
const databaseInit = () => {
  con = mysql.createPool(mysqlConfig);
  con.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      return;
    }

    console.log("Connection successfully obtained from pool");

    // Now release the connection back to the pool
    connection.release();

    console.log("Connection released back to pool");
  });
};
databaseInit();

const getUser = async (username) => {
  try {
    const [user] = await con
      .promise()
      .query("SELECT * FROM employees WHERE username = ?", username);
    return user.length ? user[0] : null;
  } catch {
    console.error("Error:", error);
    return null;
  }
};
/*
app.get(,(req, res) => {
  con.query(, (err, results) => {
    if(err) {
      console.error(err);
      res.status(500).send("Error")
    } else {
      res.json(results);
    }
  });
});
*/

app.post("/signup", async (req, res) => {
  bcrypt
    .hash(req.body.password1, 10)
    .then(async (hashedPassword) => {
      //const con = await pool.getConnection();
      try {
        await con
          .promise()
          .query(
            "INSERT INTO employees (name, role, username, password) VALUES (?, ?, ?, ?)",
            [req.body.name, req.body.role, req.body.username1, hashedPassword]
          );
        console.log("Saved");
        res.json({ message: "Account created successfully!" });
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send({ error: "Error creating account" });
      }
    })
    .catch((error) => {
      console.error("Error hashing:", error);
      res.status(500).send({ error: "Error hashing password" });
    });
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUser(username);
    console.log(user.password);
    if (username && (await bcrypt.compare(password, user.password))) {
      const role = user.role;
      console.log(username, password, role);
      req.session.userData = {
        username: username,
        password: password,
        role: role,
      };
      res.status(200).json({ message: "Login Successful" });
    } else {
      res.status(401).send("Wrong username/password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ error: "Error logging in" });
  }
});

app.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session: ", err);
        return res.status(500).send("Error logging out");
      }
      res.json("User logged out");
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).send("Error logging out");
  }
});

// Template code for displaying statistics and data
app.get("/employees", async (req, res) => {
  try {
    const con = await pool.getConnection();
    const [employees] = await con.promise().query("SELECT * FROM employees");
    res.json(employees);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/customers", async (req, res) => {
  try {
    const [customers] = await con.promise().query("SELECT * FROM customers");
    res.json(customers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/inventory", async (req, res) => {
  try {
    //const con = await pool.getConnection();
    const [inventory] = await con
      .promise()
      .query(
        "SELECT i.*, p.name, p.price FROM inventory i INNER JOIN Product p ON i.product_id = p.product_id"
      );
    res.json(inventory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/orders", async (req, res) => {
  try {
    //const con = await pool.getConnection();
    const [orders] = await con.promise().query("SELECT * FROM orders");
    res.json(orders);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    //const con = await pool.getConnection();
    const [transactions] = await con
      .promise()
      .query("SELECT * FROM transactions");
    res.json(transactions);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    //const con = await pool.getConnection();
    const [products] = await con.promise().query("SELECT * FROM products");
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/admin", checkRole("admin"), (req, res) => {
  res.send("Welcome to the admin panel");
});

app.listen(3001, "0.0.0.0", function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", 3001);
});

module.exports = app;
