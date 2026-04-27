const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
});

const Student = require("./models/Student");

// Home - Display Students
app.get("/", async (req, res) => {
    const students = await Student.find();
    res.render("index", { students });
});

// Show Add Form
app.get("/add", (req, res) => {
    res.render("add");
});

// Add Student
app.post("/add", async (req, res) => {
    const { name, email, course } = req.body;
    await Student.create({ name, email, course });
    res.redirect("/");
});

// Delete Student
app.get("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

// Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});