const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("It's Going to be lit!");
});

server.get("/token", (req, res) => {
  const payload = {
    subject: "happyuser",
    userid: "jackieO",
    favoriteGame: "basketball"
  };

  const secret = "didyouknowthatiknowthisstuff";
  const options = {
    expiresIn: "1h"
  };

  const token = jwt.sign(payload, secret, options);

  res.json(token);
});

module.exports = server;
