var path = require('path');

require("dotenv").config({
    path: path.join(__dirname,"./.env")
  })

  


  module.exports = {
     DB_URL: process.env.DB_URL,
     email_pass:process.env.email_pass
  }