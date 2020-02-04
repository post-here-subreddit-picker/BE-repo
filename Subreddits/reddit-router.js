const axios = require("axios");

const router = require("express").Router();
const restricted = require("../auth/authenticate-middleware.js");

router.get("/", restricted, (req, res) => {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .post("https://www.reddit.com/api/v1/NpYJSGrCqbXCbOgh5M6MMW-nNro")
    .then(response => {
      res.status(300).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Posts", error: err });
    });

  axios
    .get("https://www.reddit.com//api/trending_subreddits", requestOptions)
    .then(response => {
      res.status(300).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Posts", error: err });
    });
});

module.exports = router;
