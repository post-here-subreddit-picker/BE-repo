const express = require("express");

const Posts = require("./post-model");
const router = express.Router();

// GET

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

// GET BY ID

// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   db("posts")
//     .where({ id })
//     .then(posts => {
//       const post = posts[0];

//       if (post) {
//         res.json(post);
//       } else {
//         res
//           .status(404)
//           .json({ error: "Could not find post with the given ID." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "Failed to get post." });
//     });
// });

//  ADD

router.post("/", (req, res) => {
  const { headline, content } = req.body;
  // todo I'd like to add an add image capability here if possible
  if (!headline || !content) {
    res.status(400).json({
      message: "Please provide a headline and content for your post."
    });
  }

  Posts.add(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post. "
      });
    });
});

// DELETE

router.delete("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;

  Posts.get(req.params.id).then(post => {
    if (!post) {
      res.status(404).json({
        error: "The post with the specific ID does not exist."
      });
    } else if (!post.title || !post.content) {
      res.status(400).json({
        error: "Please provide a title and content for the post."
      });
    }
    Posts.update(req.params.id, req.body)
      .then(post => {
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

router.get("/:id/subreddit", (req, res) => {
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

module.exports = router;
