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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

app.use(
  sessions({
    secret: "SECRET",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      path: "/",
      secure: false,
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 24, //24 hours
    },
  })
);

const mysqlConfig = {
  host:
    process.env.DB_HOST ||
    "cs157afinalproject.cf0eys4eap7p.us-west-1.rds.amazonaws.com",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "cafe",
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
      .query("SELECT * FROM EMPLOYEE WHERE user_name = ?", username);
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
            "INSERT INTO EMPLOYEE (name, role, user_name, password) VALUES (?, ?, ?, ?)",
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
      const sessionUser = {
        username: username,
        password: password,
        role: role,
      };
      req.session.regenerate(function (err) {
        if (err) next(err);

        // store user information in session, typically a user id
        req.session.user = sessionUser;

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err);
          res.send("Login Successful");
        });
      });
    } else {
      res.status(401).send("Wrong username/password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ error: "Error logging in" });
  }
});

app.post("/logout", async (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) return next(err);
    res
    .clearCookie("connect.sid", {
      path: "/",
      domain: "localhost",
      //httpOnly: true,
      //sameSite: false,
    }).status(200)
      .send("Cookie cleared.");
    //res.send("");
    // Redirect to login after session is regenerated and old session is destroyed
    //res.redirect("http://localhost:5173/home");
  });
});

// Template code for displaying statistics and data
app.get("/employees", checkRole('manager'), async (req, res) => {
  try {
    const [employees] = await con.promise().query("SELECT * FROM EMPLOYEE");
    res.send(employees);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/customers", checkRole(['employee', 'manager']), async (req, res) => {
  try {
    const [customers] = await con.promise().query("SELECT * FROM customers");
    res.json(customers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/inventory", checkRole(['employee', 'manager']), async (req, res) => {
  try {
    //const con = await pool.getConnection();
    const [inventory] = await con
      .promise()
      .query(
        "SELECT  i.ingredient_id, i.name, i.reorder_thres, v.quantity, v.inventory_id, v.exp_date, v.supplier, v.purchase_price FROM INVENTORY AS v  JOIN INGREDIENT AS i ON i.ingredient_id = v.ingredient_id;"
      );
    res.json(inventory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/recipes", checkRole(['employee', 'manager']), async (req, res) => {
  try {
    //const con = await pool.getConnection();
    const [recipes] = await con.promise().query("SELECT  r.recipe_id, p.name, p.description, group_concat(concat(i.name, ': ', rd.quantity) separator ', ') AS ingredients FROM RECIPE AS r  JOIN RECIPE_DETAIL AS rd ON r.recipe_id = rd.recipe_id  JOIN PRODUCT AS p ON r.product_id = p.product_id  JOIN INGREDIENT AS i ON rd.ingredient_id = i.ingredient_id group by r.recipe_id;");
    res.send(recipes);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/transactions", checkRole(['employee', 'manager']), async (req, res) => {
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

app.get("/products", checkRole(['employee', 'manager']), async (req, res) => {
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
