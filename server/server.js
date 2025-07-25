const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());

const port = 4000;
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://react-context-clone.netlify.app/'
  ],
  credentials: true
}));

// use middleware to serve static images
app.use(express.static('public'));

// read data from file
const travelDataRaw = fs.readFileSync('./travel.json', 'utf-8');
const travelData = JSON.parse(travelDataRaw);

// 루트 경로 추가
app.get('/', (req, res) => {
  res.send('Hello from Express server');
});

app.get('/products', (req, res) => {
  res.json(travelData.countries);
});

app.get('/options', (req, res) => {
  res.json(travelData.options);
});

let orderHistory = [];

app.post('/order', (req, res) => {
  const orderNumber = Math.floor(Math.random() * 1000000);
  let order = { price: req.body.totals.total, orderNumber };
  orderHistory.push(order);
  res.status(201).json(orderHistory);
});

if (require.main === module) {
  app.listen(port, () => console.log(`listening on port ${port}`));
}

module.exports = app;
