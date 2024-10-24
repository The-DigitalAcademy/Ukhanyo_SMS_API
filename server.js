const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3300;
const app = express();

app.use(cors())
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("The Api is running!");
});

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});

module.exports = app;
