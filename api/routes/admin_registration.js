const express = require('express');
const con = require("../../database/db");
const router = express.Router();


router.get('/', function (req, res) {
    res.render('admin_registration.hbs');
  });


  router.post('/', function (req, res) {
    console.log(req.body);
    if (req.body.password[0] == req.body.password[1]) {
      let adminname = req.body.adminname;
      let email = req.body.email;
      let password = req.body.password[0];
      con.on('error', function (err) {
        console.log("[mysql error]", err);
      });
  
      con.query(`INSERT INTO admin_registration(admin_name, admin_email, admin_password) VALUES ('${adminname}', '${email}', '${password}');commit;`, function (err, result) {
        if (err) throw err;
        console.log("values inserted");
      });
  
      res.render('admin_registration', { msg1: 'successful', msg2: 'check();' });
    }
  });
  module.exports = router;