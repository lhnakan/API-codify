/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
require('express-async-errors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const userRouter = require('./routers/userRouter');
const coursesRouter = require('./routers/coursesRouter');

app.use(cors());
app.use(express.json());

const usersRouters = require('./routers/usersRouters');

app.use('/api/v1/users', usersRouters);
app.use('/api/v1/courses', coursesRouter);

app.use((error, req, res, next) => {
  console.log(error);
  return res.sendStatus(500);
});

module.exports = app;
