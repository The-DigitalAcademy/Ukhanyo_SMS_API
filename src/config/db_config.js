require("dotenv").config();

const connectionString = {
  url : process.env.DB_URL
};

module.exports = connectionString;