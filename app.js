const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const staticPath = path.join(__dirname, "/views");

const homeRoute = require("./api/routes/home");
const feedbackRoute = require("./api/routes/feedback");
const booksRoute = require("./api/routes/books");
const availableBooksRoute = require("./api/routes/available_books");
const adminLoginRoute = require("./api/routes/admin_login");
const adminRegistrationRoute = require("./api/routes/admin_registration");
const stdentLoginRoute = require("./api/routes/student_login");
const studentRegistrationRoute = require("./api/routes/student_registration");
const logoutRoute = require("./api/routes/logout");
const issueRoute = require("./api/routes/issue");
const issuedBooksRoute = require("./api/routes/issued_books");

app.use(express.static(staticPath));
app.use(express.urlencoded());
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.use("/", homeRoute);
app.use("/feedback", feedbackRoute);
app.use("/books", booksRoute);
app.use("/admin_login", adminLoginRoute);
app.use("/admin_registration", adminRegistrationRoute);
app.use("/student_login", stdentLoginRoute);
app.use("/student_registration", studentRegistrationRoute);
app.use("/available_books", availableBooksRoute);
app.use("/logout", logoutRoute);
app.use("/issue", issueRoute);
app.use("/issued_books", issuedBooksRoute);

app.get("*", function (req, res) {
  res.render("404");
});

module.exports = app;
