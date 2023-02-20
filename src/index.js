require("dotenv").config();
const express = require("express");
const { connection } = require("mongoose");
const { userRouter } = require("../routes/User.routes");

const cors = require("cors");
const { authenticate } = require("../middlewares/Auth");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Server Start Successfully...");
});

app.use("/user", userRouter);
app.use(authenticate);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connect to db successfully !");
  } catch (err) {
    console.log(err);
  }
  console.log(`Listing to port ${PORT}`);
});
