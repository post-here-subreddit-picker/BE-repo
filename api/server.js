const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const subredditsRouter = require("../Subreddits/reddit-router.js");
 const postsRouter = require("../data/helpers/post-router");
const userRouter = require("../users/users-routes");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Namaste<h1>");
});
server.use("/api/auth", authRouter);
server.use("/api/subreddits", authenticate, subredditsRouter);
// server.use("/api/post", postsRouter);
server.use(`/api/user`, postsRouter);

// 

module.exports = server;
