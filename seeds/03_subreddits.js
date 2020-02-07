exports.seed = function(knex, Promise) {
  return knex("subreddits").insert([
    {
      id: 1,
      title: "/r/announcements" 
    },
    {id: 2,
      title: "/r/funny" 
    },
    {id: 3,
      title: "/r/AskReddit" 
    },
    {id: 4,
      title: "/r/gaming" 
    },
    {id: 5,
      title: "/r/pics" 
    },
    {id: 6,
      title: "/r/aww" 
    },
    {id: 7,
      title: "/r/science" 
    },
    {id: 8,
      title: "/r/worldnews" 
    },
    {id: 9,
      title: "/r/Music" 
    },
    {id: 10,
      title: "/r/movies" 
    },

  ]);
};

