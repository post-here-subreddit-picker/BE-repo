exports.up = function(knex) {
  return knex.schema.createTable("subreddits", function(subreddits) {
    subreddits.increments();

    subreddits.string("title", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("subreddits");
};
