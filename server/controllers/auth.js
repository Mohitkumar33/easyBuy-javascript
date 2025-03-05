const UserModel = require("../models/users");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const VerificationToken = require("../models/verificationTokens");

exports.createNewUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name) return res.status(422).json({ message: "Name is missing" });
    if (!name) return res.status(422).json({ message: "Email is missing" });
    if (!password)
      return res.status(422).json({ message: "Password is missing" });

    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res
        .status(401)
        .json({ message: "Unauthorized request, email is already in use!" });

    //new user
    const newUser = await UserModel.create({ name, email, password });

    // Generate a random verification token
    const token = crypto.randomBytes(32).toString("hex");

    // Store token in the VerificationToken model
    await VerificationToken.create({ owner: newUser._id, token });
    res
      .status(201)
      .json({
        message: "User created successfully! Verification token generated.",
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
  // res.send("ok");
};
