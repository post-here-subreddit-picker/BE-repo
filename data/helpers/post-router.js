const express = require("express");
const axios = require("axios");
const Posts = require("./post-model");
const postRouter = express.Router();

//  ADD

postRouter.post("/:id", (req, res) => {
  const { headline, content } = req.body;
  const user_id = Number(req.params.id);

  if (!req.params.id) {
    res.status(404).json({
      error: "The user with the specified ID does not exist."
    });
  }
  if (!req.body.headline || !req.body.content) {
    res.status(400).json({
      error: "Please provide a headline and content for your post."
    });
  }

  function getSubreddit() {
    return axios.get(
      `https://subreddit-finder.herokuapp.com/model/${headline}`
    );
  }
  getSubreddit().then(function(response) {
    Posts.add({ user_id, headline, content })
      .then(posts => {
        res.status(201).json(response.data);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post. "
        });
      });
  });
});

// DELETE

postRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Posts.get(req.params.id).then(post => {
    if (!post) {
      res.status(404).json({
        error: "The post with the specific ID does not exist."
      });
    }
    Posts.remove(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: "The post could not be removed."
        });
      });
  });
});

//  UPDATE

postRouter.put("/:id", (req, res) => {
  const { headline, content } = req.body;
  const id = req.params.id;

  Posts.get(req.params.id).then(post => {
    if (!post) {
      res.status(404).json({
        error: "The post with the specific ID does not exist."
      });
    } else if (!req.body.headline || !req.body.content) {
      res.status(400).json({
        error: "Please provide a headline and content for the post."
      });
    }
    Posts.update(id, req.body)
      .then(post => {
        console.log(post);
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  });
});

//  GET REDDIT POSTS

postRouter.get("/:id/subreddit", (req, res) => {
  RDTS.getSubreddit(req.params.id).then(rdtPosts => {
    if (!rdtPosts[0]) {
      res.status(404).json({
        error: "The post with the specified ID does not exist."
      });
    } else if (rdtPosts) {
      res.status(200).json(rdtPosts);
    } else {
      res.status(500).json({
        error: "The Subreddit information could not be retrieved."
      });
    }
  });
});

module.exports = postRouter;
