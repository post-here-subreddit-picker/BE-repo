const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get,
  add,
  update,
  remove,
  getSubreddit
};

function get(id) {
  let query = db("posts");

  if (id) {
    query.where("posts.id", id).first();

    const promises = [query, this.getSubreddit(id)];

    return Promise.all(promises).then(function(results) {
      let [post, subreddit] = results;

      if (post) {
        post.subreddit = subreddit;

        return mappers.postToBody(post), mappers.rdtPostToBody(post);
      } else {
        return null;
      }
    });
  } else {
    return query.then(posts => {
      return posts.map(post => mappers.postToBody(post));
    });
  }
}

function add(post) {
  return db("posts")
    .insert(post, "id")
    .then(([id]) => this.get(id));
}

function update(id, changes) {
  return db("posts")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? this.find(id) : null));
}

function remove(id) {
  return db("posts")
    .where("id", id)
    .del();
}

function getSubreddit(postId) {
  return db("posts").then(subreddit =>
    subreddit.map(subreddit => mappers.rdtPostToBody(subreddit))
  );
}
