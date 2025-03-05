const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const verificationTokenSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Token expires in 1 hour
});

// Hash token before saving it to the database
verificationTokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) return next();

  const salt = await bcrypt.genSalt(10);
  this.token = await bcrypt.hash(this.token, salt);
  next();
});

// Compare token when verifying email
verificationTokenSchema.methods.compareToken = async function (token) {
  return bcrypt.compare(token, this.token);
};

const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);
module.exports = VerificationToken;
