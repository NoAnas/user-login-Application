const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const path = require("path");
const { hash } = require("crypto");
const jwt = require("jsonwebtoken");
const { error } = require("console");
const { serialize } = require("v8");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signupPage", (req, res) => {
  res.render("signupPage");
});

app.get("/index", (req, res) => {
  res.render("index");
});
//panding your logout button on website
app.post("/signup", (req, res) => {
  let { username, email, password, age } = req.body;
  if (password.length === "") {
    res.send("please type something in input");
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await userModel.create({
          username,
          email,
          password: hash,
          age,
        });
        let token = jwt.sign({ email }, "aaaaaaaaaa");
        res.cookie("token", token);
        res.redirect("index");
      });
    });
  }
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("something went wrong");
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: user.email }, "aaaaaaaaaa");
      res.cookie("token", token);
      res.redirect("index");
    } else {
      res.send("something is wrong");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(3000);
