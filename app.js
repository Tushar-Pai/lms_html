const express = require('express');
const path = require('path');
const mysql = require('mysql');
const { futimesSync } = require('fs');
const app = express();
const port = 8000;
const staticPath = path.join(__dirname, '/views');

app.use(express.static(staticPath));
app.use(express.urlencoded());

app.set("view engine", "hbs");

const con = mysql.createConnection({
  connectionLimit : 10,
  host:"localhost",
  user:"root",
  port: 3306,
  password:"project",
  database:"lms",
  multipleStatements: true
});

app.get('/', function (req, res) {
  res.render('index.hbs');
});

app.get('/', function (req, res) {
  res.send('<h1>Hello World!<h1>');
});

app.get('/books', function (req, res) {
  res.render('books.hbs');
});

app.get('/student_login', function (req, res) {
  res.render('student_login.hbs');
});


app.get('/admin_login', function (req, res) {
  res.render('admin_login.hbs');
});

app.get('/feedback', function (req, res) {
  res.render('feedback.hbs');
});

app.get('/admin_registration', function (req, res) {
  res.render('admin_registration.hbs');
});

app.get('/student_registration', function (req, res) {
  res.render("student_registration.hbs");
});

app.get('/books/available_books', function(req, res){
  con.on('error', function(err) {
    console.log("[mysql error]",err);
  });
  con.query(`select * from available_books;`, function(err, result){

    let r = JSON.stringify(result);
    console.log(r);
    for(let i=0;i<4;i++){
      console.log(r[i]);
    }
    var renderDocs = {
      re : r,
    }
    res.render("available_books.hbs", renderDocs);
    console.log('over');
  });
});

app.get('/books/return_books', function(req, res){
  res.render("return_books.hbs");
});

app.post('/student_registration', function (req,res) {
  console.log(req.body);
  if(req.body.password[0]==req.body.password[1]){
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password[0];
    con.on('error', function(err) {
      console.log("[mysql error]",err);
    });
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(`INSERT INTO student_registration(user_name, user_email, user_password) VALUES ('${username}', '${email}', '${password}');commit;`, function (err, result) {
        if (err) throw err;
        console.log("values inserted");
      });
    });
    res.render('student_registration',{msg1 : 'successful' , msg2 : 'check();'});
    
  }
});

app.post('/admin_registration', function (req,res) {
  console.log(req.body);
  if(req.body.password[0]==req.body.password[1]){
    let adminname = req.body.adminname;
    let email = req.body.email;
    let password = req.body.password[0];
    con.on('error', function(err) {
      console.log("[mysql error]",err);
    });
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(`INSERT INTO admin_registration(admin_name, admin_email, admin_passwords) VALUES ('${adminname}', '${email}', '${password}');commit;`, function (err, result) {
        if (err) throw err;
        console.log("values inserted");
      });
    });
    res.render('admin_registration',{msg1 : 'successful' , msg2 : 'check();'});
  }
});

app.post('/student_login', function(req,res){
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;
  con.connect(function(err){
    if (err) throw err;
    con.query(`select * from student_registration where user_email='${email}';`, function(err, result){
      if (err) throw err;
      let r = JSON.parse(JSON.stringify(result));
      console.log(r);
      if(r[0].user_password==password){
        res.redirect('/student_login');
      }
    });
  });
});

app.post('/add_book', function(req, res){
  let isbn = req.body.isbn;
  let book_title = req.body.book_title;
  let catogary = req.body.catogary;
  let author_name = req.body.author_name;
  let price = req.body.price;
  let quantity = req.body.quantity;
  con.query(`INSERT INTO available_books VALUES (${isbn}, '${book_title}', '${catogary}','${author_name}', ${price}, ${quantity});COMMIT;`, function(err, result){
    if (err) throw err;
    console.log('successfully inserted');
    res.redirect('/books/return_books')
  });
});

app.get('*', function(req,res){
  res.render('404.hbs');
});

app.listen(8000,function (req,res) {
  console.log("server started on port 8000 staus : connected...");

});
