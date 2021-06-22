const express = require('express');
const con = require("../../database/db");
const router = express.Router();



router.get('/', function (req, res) {
  res.render('books');
});


router.get('/books/return_books', function (req, res) {
  res.render("return_books");
});

module.exports = router;