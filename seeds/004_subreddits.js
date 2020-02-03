exports.seed = function(knex, Promise) {
  return knex("subreddits").insert([
    {
      title: "/r/announcements" 
    },
    {
      title: "/r/funny" 
    },
    {
      title: "/r/AskReddit" 
    },
    {
      title: "/r/gaming" 
    },
    {
      title: "/r/pics" 
    },
    {
      title: "/r/aww" 
    },
    {
      title: "/r/science" 
    },
    {
      title: "/r/worldnews" 
    },
    {
      title: "/r/Music" 
    },
    {
      title: "/r/movies" 
    },

  ]);
};

