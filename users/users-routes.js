const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/authenticate-middleware.js");

router.get("/", restricted, (req, res) => {
  Users.findBy(req.user)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

router.get("/:id/posts", (req, res) => {
  Post.findUserPosts(req.params.id).then(posts => {
    if (!posts[0]) {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    } else if (posts) {
      console.log(posts);
      res.status(200).json(posts);
    } else
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
  });
});

router.get("/dash", restricted, (req, res) => {
  Users.findBy(req.id)
  .then(user => {
    return user
  }
  // i'm not sure how to make the logic for this.
  )
});



module.exports = router;

