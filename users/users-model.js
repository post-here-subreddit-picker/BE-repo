const db = require("../data/dbConfig.js");
const mappers = require("../data/helpers/mappers.js");

module.exports = {
  find,
  findBy,
  add,
  findById,
  getUserDash,
  findUserPosts
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserDash(id) {
  let query = db("users as u");

  if (id) {
    query.where("u.id", id).first();

    const promises = [query, this.findUserPosts(id)];

    return Promise.all(promises).then(function(results) {
      let [user, posts] = results;

      if (user) {
        user.posts = posts;

        return mappers.userToBody(user);
      } else {
        return null;
      }
    });
  } else {
    return query.then(users => {
      return users.map(user => mappers.userToBody(user));
    });
  }
}

function findUserPosts(userId) {
  return db("posts")
    .where("user_id", userId)
    .then(posts => posts.map(post => mappers.postToBody(post)));
}
