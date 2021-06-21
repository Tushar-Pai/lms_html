const express = require('express');
const con = require("../../database/db");
const router = express.Router();



router.get('/', function (req, res) {
  res.render('books');
});


router.get('/available_books', function (req, res) {
  con.on('error', function (err) {
    console.log("[mysql error]", err);
  });
  con.query(`select * from available_books;`, function (err, result) {

    let r = JSON.parse(JSON.stringify(result));

    res.render("available_books", { booksData: r });
    console.log('over');
  });
});

router.get('/books/return_books', function (req, res) {
  res.render("return_books");
});

module.exports = router;