require("dotenv").config(); // Load .env variables

const config = {
  port: process.env.PORT || 3000,
  mongodbURI: process.env.MONGODB_URI,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
