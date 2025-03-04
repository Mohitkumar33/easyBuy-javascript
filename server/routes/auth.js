const express = require("express");
const authRouter = express.Router();
const userController = require("../controllers/auth");

authRouter.post("/sign-up", userController.createNewUser);

module.exports = authRouter;
