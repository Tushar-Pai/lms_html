const express = require('express');
const con = require("../../database/db");
const fs = require('fs');
const router = express.Router();


router.get('/', function (req, res) {

    fs.readFile('views\\config\\user-data.json', (error, data) => {


        if (data.length != 0) {
            if (error) {
                console.error(error)
                return
            }

            var user_data = JSON.parse(data);

            var sql = `SELECT * FROM available_books av, issued_books ib
          WHERE av.isbn=ib.isbn
          HAVING ib.user_id = ${user_data.user_id};`

            con.on('error', function (err) {
                console.log("[mysql error]", err);
            });
            con.query(sql, function (err, result) {

                let r = JSON.parse(JSON.stringify(result));

                res.render("issued_books", { booksData: r });
            });

        }
        else {
            var htmlContent = `<h1>Please login to view this page</h1> 
            <button><a  href="/student_login" style="text-decoration: none;color:black">Login</a></button>`
            res.send(htmlContent);
        }
    });


});



module.exports = router;