module.exports = {
  intToBoolean,
  booleanToInt,
  postToBody,
  rdtPostToBody
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToInt(bool) {
  return bool === true ? 1 : 0;
}

function postToBody(post) {
  const result = {
    ...post,
    posted: intToBoolean(post.posted)
  };

  if (post.rdtPosts) {
    result.rdtPosts = post.rdtPosts.map(rdtPost => ({
      ...rdtPost,
      posted: intToBoolean(rdtPost.posted)
    }));
  }

  return result;
}

function rdtPostToBody(rdtPost) {
  return {
    ...rdtPost,
    posted: intToBoolean
  };
}
