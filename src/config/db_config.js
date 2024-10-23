require("dotenv").config();

const connectionString = {
  url: process.env.URL,
};

module.exports = { connectionString  };