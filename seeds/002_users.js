exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "Frank",
      password:
        "Frank1"
    },
    {
      username: "Sue",
      password:
        "Sue1"
    },
    {
      username: "Frank3",
      password:
        "Frank1"
    },
    {
      username: "Frank2",
      password:
        "Frank1"
    },
    {
      username: "Frank5",
      password:
        "Frank1"
    },
    {
      username: "Frank6",
      password:
        "Frank1"
    },
    {
      username: "Frank7",
      password:
        "Frank1"
    },
    {
      username: "Frank8",
      password:
        "Frank1"
    },
  ]);
};