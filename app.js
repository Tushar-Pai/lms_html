const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const staticPath = path.join(__dirname, '/views');


const homeRoute = require('./api/routes/home'); 
const feedbackRoute = require('./api/routes/feedback'); 
const booksRoute = require('./api/routes/books'); 
const adminLoginRoute = require('./api/routes/admin_login'); 
const adminRegistrationRoute = require('./api/routes/admin_registration'); 
const stdentLoginRoute = require('./api/routes/student_login'); 
const studentRegistrationRoute = require('./api/routes/student_registration'); 



app.use(express.static(staticPath));
app.use(express.urlencoded());
app.use(morgan('dev'));
app.set("view engine", "hbs");



app.use('/' , homeRoute);
app.use('/feedback' , feedbackRoute);
app.use('/books' , booksRoute);
app.use('/admin_login' , adminLoginRoute);
app.use('/admin_registration' , adminRegistrationRoute);
app.use('/student_login' , stdentLoginRoute);
app.use('/student_registration' , studentRegistrationRoute);



app.get('*', function (req, res) {
  res.render('404.hbs');
});

module.exports = app;

