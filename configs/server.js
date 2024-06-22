// configs/server.js
require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createPool({
  host: 'lacalhost',
  port: 3306,
  user: 'root',
  password: 'Mb$15032001',
  database: 'mateusbs'
});

const cache = new NodeCache({ stdTTL: 30 });

app.set('views', './views');
app.set('view engine', 'jade');

app.use('/', require('../routes/index'));
app.use('/clientes', require('../routes/clientes'));
app.use('/produtos', require('../routes/produtos'));
app.use('/usuarios', require('../routes/usuarios'));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
