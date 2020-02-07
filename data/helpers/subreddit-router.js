const express = require("express");
const subRouter = express.Router();
const SubRdt = require("./subreddit-model");

subRouter.post("/", (req, res) => {
  const title = req.body;
  const id = Number(req.params.id);
  if (!subreddit) {
    res.status(400).json({
      message: "A subreddit was not provided."
    });
  }

  SubRdt.add(title)
    .then(sub => {
      console.log(sub);
      res.status(201).json(sub);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the subreddit. "
      });
    });
});

module.exports = subRouter;
