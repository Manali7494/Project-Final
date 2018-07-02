require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
// DB Packages
const pg = require('pg');
const knexConfig = require('./knexfile');
const knex = require("knex");
// Image Recogition API
const Clarifai = require('clarifai');

// Initialize API key: Clafifai
const clApp = new Clarifai.App({
 apiKey: process.env.CLARIFAI
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/upload', (req, res) => {
  console.log("REQ: ", req.body.img);

  clApp.models.predict(Clarifai.GENERAL_MODEL, req.body.img).then(
  function(response) {
    // console.log(response.outputs[0].data);
    let terms = response.outputs[0].data.concepts;
    const newTerms = [];
    terms.forEach((term) => {
      newTerms.push(Object.assign({}, { name: term.name, value: Math.round(term.value * 100) }));
      });
    console.log("TERMS: ", newTerms);


    res.send(200);
  },
  function(err) {
    // there was an error
    console.log("error: ", err);
  }
  );

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
