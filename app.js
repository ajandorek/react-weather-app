const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Weatherdb');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./routes/routes.js'));

module.exports = app;
