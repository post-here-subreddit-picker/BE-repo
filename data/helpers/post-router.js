const express = require("express");
const User = require('../../users/users-model');
const Posts = require("./post-model");
const postRouter = express.Router();

//  ADD

<<<<<<< HEAD
postRouter.post("/:id", (req, res) => {
  const { headline, content } = req.body;
  const user_id = Number(req.params.id);

  if (!req.params.id) {
    res.status(404).json({
      error: "The user with the specified ID does not exist."
=======
// router.post("/:id", (req, res) => {
//   const { headline, content } = req.body;
//   // todo I'd like to add an add image capability here if possible
//   if (!headline || !content) {
//     res.status(400).json({
//       message: "Please provide a headline and content for your post."
//     });
//   }

//   Posts.add(req.body)
    
//     .then(post => {
//       res.status(201).json(post);
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: "There was an error while saving the post. "
//       });
//     });
// });

router.post("/:id", (req, res) => {
  const { headline, conste } = req.body;
  const user_id = Number(req.params.id);
  if (!req.params.id) {
    res.status(404).json({
      errorMessage: "The user with the specified ID does not exist."
>>>>>>> 8518855f260ead3a0869bad4f8279da7fbd838e7
    });
  }
  if (!req.body.headline || !req.body.content) {
    res.status(400).json({
<<<<<<< HEAD
      error: "Please provide a headline and content for your post."
    });
  }

  Posts.add({ user_id, headline, content })
=======
      errorMessage: "Please provide a headline and content for the post."
    });
  }

  Posts.add({ post_id, headline, content })
>>>>>>> 8518855f260ead3a0869bad4f8279da7fbd838e7
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database."
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
    Posts.update(req.params.id, req.body)
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
