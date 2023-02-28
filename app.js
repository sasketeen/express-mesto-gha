const express = require('express');
const mongoose = require('mongoose');

// переданное значение порта (по дефолту 3000)
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Порт ${PORT}`);
});
