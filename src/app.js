const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

//routes
const userRouter = require('./routes/users.routes');
const transferRouter = require('./routes/transfers.routes');

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/transfers', transferRouter);

app.all('*', (req, res, next) => {
  return res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server! 😣😡`,
  });
});

module.exports = app;
