const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const userRouter = require("../users/users-routes.js");
const postRouter = require("../data/helpers/post-router.js");
const subredditsRouter = require("../Subreddits/reddit-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Namaste<h1>");
});
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use("/api/subreddits", authenticate, subredditsRouter);

module.exports = server;
