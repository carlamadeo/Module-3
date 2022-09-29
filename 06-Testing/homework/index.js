const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

const sumArray = (array, num) => {
  if(!Array.isArray(array) || typeof num != 'number') throw new TypeError('Types do not match');
  for(let i = 0; i < array.length; i++) {
    for(let j = i + 1; j < array.length; j++) {
      if(array[i] !== array[j]) {
        if(array[i] + array[j] === num) return true;
      }
    }
  }
  return false;
}

const pluck = (array, prop) => {

  return array.map(p => p[prop]);
}

app.post('/sumArray', (req, res) => {
  const {array, num} = req.body;
  res.send({
    result: sumArray(array, num)
  })
});

app.post('/numString', (req, res) => {
  const {string} = req.body;
  if(typeof string !== 'string' || string === '') res.status(400);
  return res.send({
    result: string.length
  });
});

app.post('/pluck', (req, res) => {
  const {array, prop} = req.body;
  if(!Array.isArray(array) || prop === '') res.status(400);
  return res.send({
    result: pluck(array, prop)
  });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
