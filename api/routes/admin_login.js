const express = require('express');
const con = require("../../database/db");
const router = express.Router();




router.get('/', function (req, res) {
    res.render('admin_login.hbs');
  });
  module.exports = router;