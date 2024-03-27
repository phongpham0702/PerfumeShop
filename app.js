const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let dotEnv = require("dotenv").config()
const database = require("./connectDB")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require("./routes/productRouter")
const brandRouter = require('./routes/brandRouter')

database.connect();
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productRouter);
app.use('/brands',brandRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

  
  // error handler
app.use(function(err, req, res, next) {

  return res.status(err.status || 500).json({error:"Something went wrong !"});
});

module.exports = app;
