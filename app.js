const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');

// переданное значение порта (по дефолту 3000)
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// временная заглушка
app.use((req, res, next) => {
  req.user = {
    _id: '63ffa66f454af8a28612bb44',
  };

  next();
});

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Порт ${PORT}`);
});
