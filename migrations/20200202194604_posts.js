exports.up = function(knex) {
  return knex.schema.createTable("posts", function(posts) {
    posts.increments();

    posts
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    posts
      .integer("subreddit_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("subreddits")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    posts.string("headline", 128).notNullable();
    posts.text("content").notNullable();
    posts.boolean("posted").defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts");
};
