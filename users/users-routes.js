const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/authenticate-middleware.js");

// .. GET USERS ..
router.get("/", restricted, (req, res) => {
  Users.find(req.user)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

// .. GET USER BY ID ..
router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      res.status(200).json(user.username);
    })
    .catch(err => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});

// .. GET USER and USER POSTS ..
router.get("/:id/dash", (req, res) => {
  const { id, posts } = req.params;
  Users.getUserDash()
    .then(user => {
      console.log(user.posts);
      res
        .status(200)
        // .json(user)
        .json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});

// ... DELETE USER ...

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Users.find(req.params.id).then(user => {
    if (!user) {
      res.status(404).json({
        message: "The user with the specific ID does not exist."
      });
    }
    Users.remove(req.params.id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({
          error: "The user could not be removed."
        });
      });
  });
});

// .. GET USER POSTS ..
router.get("/:id/posts", (req, res) => {
  Users.findUserPosts(req.params.id).then(posts => {
    if (!posts[0]) {
      res.status(404).json({
        message: "The user with the specified ID does not have any posts."
      });
    } else if (posts) {
      res.status(200).json(posts);
    } else
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
  });
});

module.exports = router;
