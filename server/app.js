const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require("express-session")

const dotEnv = require('dotenv').config();
const database = require('./connectDB');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/productRouter');
const brandRouter = require('./routes/brandRouter');
const signUpRouter = require("./routes/signUpRouter")


const app = express();

database.connect();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}))


if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/brands', brandRouter);
app.use('/sign-up', signUpRouter)
app.use('/favicon.ico', (req,res,next) => {
  return res.status(200).end();
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  return res
    .status(err.status || 500)
    .json({ error: 'Something went wrong !' });
});

module.exports = app;
