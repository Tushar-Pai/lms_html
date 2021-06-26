const express = require('express');
const con = require("../../database/db");
const fs = require('fs');
const router = express.Router();


router.get('/', function (req, res) {

    fs.readFile('views\\config\\user-data.json', (err, data) => {
        if (data.length != 0) {
            con.on('error', function (err) {
                console.log("[mysql error]", err);
            });
            con.query(`select * from available_books;`, function (err, result) {

                let r = JSON.parse(JSON.stringify(result));

                res.render("available_books", { booksData: r });

            });
        }
        else {
            var htmlContent = `<h1>Please login to view this page</h1> 
            <button><a  href="/student_login" style="text-decoration: none;color:black">Login</a></button>`
            res.send(htmlContent);
        }
    });


});


router.post('/', function (req, res) {

    const category = req.body.category;

    if (category === 'All') {
        var sql = `SELECT * FROM available_books ;`
    }
    else {
        var sql = `SELECT * FROM available_books WHERE category = '${category}' ;`
    }

    con.on('error', function (err) {
        console.log("[mysql error]", err);
    });
    con.query(sql, function (err, result) {

        let r = JSON.parse(JSON.stringify(result));

        res.render("available_books", { booksData: r });
    });
});

module.exports = router;