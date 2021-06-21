const express = require('express');
const bcrypt = require('bcrypt');
const con = require("../../database/db");
const { body } = require('express-validator');
const router = express.Router();




router.get('/', function (req, res) {
  res.render('admin_login');
});

router.post('/', function (req, res) {

  let email = req.body.email;
  let password = req.body.password;

  con.query(`select * from admin_registration where admin_email='${email}';`, function (err, result) {
    if (err) throw err;
    let r = JSON.parse(JSON.stringify(result));

    bcrypt.compare(password, r[0].admin_password, function (err, result) {
      if (result === true) {
        res.redirect('/books');
      } else {
        res.status(404).json({
          message: "Wrong Password",
        });
      }
    });

  });

});
module.exports = router;