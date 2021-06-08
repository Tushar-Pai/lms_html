const express = require('express');
const con = require("../../database/db");
const router = express.Router();



router.get('/', function (req, res) {
    res.render('books.hbs');
  });


  router.get('/available_books', function (req, res) {
    con.on('error', function (err) {
      console.log("[mysql error]", err);
    });
    con.query(`select * from available_books;`, function (err, result) {
  
      let r = JSON.stringify(result);
      
      var renderDocs = {
        re: r,
      }
      res.render("available_books.hbs", renderDocs);
      console.log('over');
    });
  });
  
  router.get('/books/return_books', function (req, res) {
    res.render("return_books.hbs");
  });

  module.exports = router;