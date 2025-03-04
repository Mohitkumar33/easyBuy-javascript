const UserModel = require("../models/users");

exports.createNewUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (!name) return res.status(422).json({ message: "Name is missing" });
  if (!name) return res.status(422).json({ message: "Email is missing" });
  if (!password)
    return res.status(422).json({ message: "Password is missing" });

  const existingUser = await UserModel.findOne({ email });

  if (existingUser)
    return res.status(401).json({ message: "Unauthorized request, email is already in use!" });

  await UserModel.create({ name, email, password });
  res.send("ok");
};
