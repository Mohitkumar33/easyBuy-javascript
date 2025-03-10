const express = require("express");
const authRouter = require("./routes/auth");
const connectDB = require("./db/index");

const app = express();
const port = 4000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json()); // As a bodyparser
app.use(express.urlencoded({ extended: false })); // To read the forms data

//API routes
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
