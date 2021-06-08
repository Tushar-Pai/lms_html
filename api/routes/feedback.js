const express = require('express');
const con = require("../../database/db");
const router = express.Router();

router.get('/', function (req, res) {
    res.render('feedback.hbs');
  });
  module.exports = router;