const UserModel = require("../models/users");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const VerificationToken = require("../models/verificationTokens");
const { sendErrorResponse } = require("../utils/responseHandler"); // Import the helper function
const { sendEmail } = require("../services/emailService");


exports.createNewUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name) return sendErrorResponse(res, 422, "Name is missing");
    if (!name) return sendErrorResponse(res, 422, "Email is missing");
    if (!password)
      return sendErrorResponse(res, 422, "Password is missing");

    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return sendErrorResponse(res, 401, "Unauthorized request, email is already in use!");

    //new user
    const newUser = await UserModel.create({ name, email, password });

    sendEmail("mohitkumar06612@gmail.com","Testing","Hello world")

    // // Generate a random verification token
    // const token = crypto.randomBytes(32).toString("hex");

    // // Store token in the VerificationToken model
    // await VerificationToken.create({ owner: newUser._id, token });
    res
      .status(201)
      .json({
        message: "User created successfully! Verification token generated.",
      });
  } catch (error) {
    sendErrorResponse(res, 500, "Internal Server Error");

  }
  // res.send("ok");
};
