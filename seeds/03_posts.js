exports.seed = function(knex) {
  return knex("posts").insert([
    {
      user_id: 1,
      subreddit_id: 1,
      headline: "This is a headline",
      content: "Because I have no creativity right now."
    },
    {
      user_id: 2,
      subreddit_id: 2,
      headline: "I tried to be clever.",
      content: "I thought for a while."
    },
    {
      user_id: 2,
      subreddit_id: 3,
      headline: "Nothing emerged.",
      content: "This wasn't where the magic happens today lol."
    }
  ]);
};
