const mongoose = require("mongoose");

const verificationTokenSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Token expires in 1 hour
});

const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);
module.exports = VerificationToken;
