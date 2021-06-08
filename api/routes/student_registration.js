const express = require('express');
const con = require("../../database/db");
const router = express.Router();



router.get('/', function (req, res) {
    res.render("student_registration.hbs");
  });


  
router.post('/', function (req, res) {
    console.log(req.body);
    if (req.body.password[0] == req.body.password[1]) {
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password[0];
      con.on('error', function (err) {
        console.log("[mysql error]", err);
      });
  
      con.query(`INSERT INTO student_registration(user_name, user_email, user_password) VALUES ('${username}', '${email}', '${password}');commit;`, function (err, result) {
        if (err) throw err;
        console.log("values inserted");
      });
  
      res.render('student_registration', { msg1: 'successful', msg2: 'check();' });
  
    }
  });
  
  module.exports = router;

