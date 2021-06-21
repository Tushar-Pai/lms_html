const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const con = require("../../database/db");

const router = express.Router();
const saltRounds = 10;



router.get('/', function (req, res) {
  res.render("student_registration");
});



router.post('/', [
  //Form Validation
  body('username')
    .not().isEmpty()
    .withMessage('Please enter a name'),

  body('email')
    .isEmail()
    .withMessage('Invalid email'),

  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),

  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  })

]

  // Callback for handling requests
  , function (req, res) {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {


      const alert = errors.array()
      res.render('student_registration', { alert })

    }
    else {
      let username = req.body.username;
      let email = req.body.email;
      let password = req.body.password;

      bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        con.on('error', function (err) {
          console.log("[mysql error]", err);
        });
        con.query(`INSERT INTO student_registration(user_name, user_email, user_password) VALUES ('${username}', '${email}', '${hash}');commit;`, function (err, result) {
          if (err) throw err;
          console.log("values inserted");
          res.render('student_registration', { msg: "Successfully Registered" });
        });
      });
    }



  });

module.exports = router;




