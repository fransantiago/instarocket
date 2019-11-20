require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const LOCAL_DB_URL = `${process.env.DB_LOCAL_URL}:${process.env.DB_LOCAL_PORT}/${process.env.DB_DATABASE_NAME}`;
const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(LOCAL_DB_URL, DB_OPTIONS);

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized')),
);

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
