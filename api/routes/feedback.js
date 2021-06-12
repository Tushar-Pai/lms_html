const express = require('express');
const con = require("../../database/db");
const router = express.Router();

router.get('/', function (req, res) {
  res.render('feedback.hbs');
});

router.post('/', function (req, res) {


  let email = JSON.stringify(req.body.email);
  let name = JSON.stringify(req.body.username);
  let feedback = JSON.stringify(req.body.feedback);

  const query = `INSERT INTO feedbacks VALUES ( ${email}, ${name} ,${feedback}); commit ;`;

  con.on('error', function (err) {
    console.log("[mysql error]", err);
  });

  con.query(query, function (err, result) {
    if (err) throw err;
    console.log("Feedback inserted");
  });

  res.redirect('/feedback')

});
module.exports = router;