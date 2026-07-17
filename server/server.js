const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://react-context-clone.netlify.app", // 여기 새 도메인 추가
];

const port = 4000;
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman 등 CORS 없는 요청 허용
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "CORS 정책상 허용되지 않은 도메인입니다.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// use middleware to serve static images
app.use(express.static("public"));

// read data from file
const travelDataRaw = fs.readFileSync("./travel.json", "utf-8");
const travelData = JSON.parse(travelDataRaw);

// 루트 경로 추가
app.get("/", (req, res) => {
  res.send("Hello from Express server");
});

app.get("/products", (req, res) => {
  res.json(travelData.countries);
});

app.get("/options", (req, res) => {
  res.json(travelData.options);
});

let orderHistory = [];

app.post("/order", (req, res) => {
  const orderNumber = Math.floor(Math.random() * 1000000);
  let order = { price: req.body.totals.total, orderNumber };
  orderHistory.push(order);
  res.status(201).json(orderHistory);
});

if (require.main === module) {
  app.listen(port, () => console.log(`listening on port ${port}`));
}

module.exports = app;
