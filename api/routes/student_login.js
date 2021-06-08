const express = require('express');
const con = require("../../database/db");
const router = express.Router();



router.get('/', function (req, res) {
    res.render('student_login.hbs');
  });


router.post('/', function (req, res) {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
  
    con.query(`select * from student_registration where user_email='${email}';`, function (err, result) {
      if (err) throw err;
      let r = JSON.parse(JSON.stringify(result));
      console.log(r);
      if (r[0].user_password == password) {
        res.redirect('/books');
      }
    });
  
  });

  module.exports = router;