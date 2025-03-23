const nodemailer = require("nodemailer");
const config = require("../config"); // Import config.js

// Create a transporter using SMTP settings
// const transporter = nodemailer.createTransport({
//   service: "gmail", // Or use a custom SMTP provider
//   auth: {
//     user: config.emailUser, // Use from config.js
//     pass: config.emailPass, // Use from config.js
//   },
// });

const transporter = nodemailer.createTransport({
  host: "74.125.130.108", // Explicitly specify the Gmail SMTP server
  port: 587, // Port for TLS (use 465 for SSL)
  secure: false, // `false` for TLS, `true` for SSL
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
  tls: {
    rejectUnauthorized: false, // Avoids self-signed certificate errors
  },
});

// Function to send an email
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: config.emailUser, // Sender email
      to, // Recipient email
      subject, // Email subject
      html, // Email content (HTML format)
    };
    console.log(mailOptions, "these are mail options");

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Email sending error:", error);
    throw new Error("Could not send email");
  }
};

module.exports = { sendEmail };
