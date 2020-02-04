
# post-here

# What does your API do?
Register and login users, adds, deletes and updates posts, returns posts by user ID, returns a list of users, gets user by ID, and gets posts by a user's ID.

# About
To contribute or utiilize this project, clone and download the git repository at https://github.com/post-here-subreddit-picker/BE-repo. Run npm install to download the necessary dependencies. Run npm run server in the command line to start the server on your localhost:5000. This project sends and recieves exclusively json packets using the jsonwebtoken dependency.

# Authentication
What is the preferred way of using the API? Leverage /auth/register or /auth/login to authenticate with the app and receive a token for accessing the user information routes.

# Error Codes
What errors and status codes can a user expect?

`200 OK`

The request has succeeded

`201 Created`

The request succeedded and the new resource has been created

`400 Bad Request`

The server could not understand the request due to invalid syntax

The most likely cause is an improper request body

`401 Unauthorized`

No authentication header was provided with the request

`404 Not found`

The server could not find the requested source

`500 Internal Server Error`

The server has encountered a situation it doesn't know how to handle

Rate limit
Is there a limit to the number of requests an user can send?

`None`


# REGISTER NEW USER

POST https://post-here3.herokuapp.com/auth/register

Example request body: 

`{"password": 'password' }`

Subsequent login required. Returns an Object with user and token key:value pairs.


Example response body:

```
{

"user_id": 32,

"username": "jane"

}
```

REQUIRED fields: username, password


# LOGIN

POST https://post-here3.herokuapp.com/auth/login

Returns an Object with user and token key:value paris. Example request body:

```
{

"username": "jane",

"password": "password"

}
```

Example response body:

```
{

"user_id": 32,

"username": "jane"

}
```

REQUIRED field username, password


# ADD POST

POST https://post-here3.herokuapp.com/api/posts

Requires authorization.

req.header.authorization = token;

Example request body:

```
{

"headline": "Reddit post Title",

"content": "Reddit post text description"
}
```

REQUIRED fields: headline, content

Returns the new post information.

Example response body:

```
{

"id": 5,

"user_id": 1,

"subreddit_id": null,

"headline": ""Reddit post Title"",

"content": "Reddit post text description",

"subreddit": []
}
```


# DELETE POST

DEL https://post-here3.herokuapp.com/api/post/:id

Requires authorization.

req.header.authorization = token;

Returns the number of posts deleted in a raw integer.

Example response body:

`1`

PATH VARIABLES
id


# UPDATE USER POST

PUT https://post-here3.herokuapp.com/api/post/:id

Requires authorization.

req.header.authorization = token;

Example request body:

```
{

"headline": "Reddit post Title",

"content": "Reddit post text description"
}
```

REQUIRED fields: headline, content

Returns the new post information.

Example response body:

```
{

"id": 5,

"user_id": 1,

"subreddit_id": null,

"headline": ""Reddit post Title"",

"content": "Reddit post text description",

"subreddit": []
}
```

PATH VARIABLES
id


# GET ALL USERS

GET https://post-here3.herokuapp.com/api/users

Requires authorization.

req.header.authorization = token;

Returns the all user information.

Example response body:

```
{
"user_id": 32, 

"username": "jane"
}
```


# GET USER BY ID

GET https://post-here3.herokuapp.com/api/users/:id

Requires authorization.

req.header.authorization = token;

Returns the new post information.

Example response body:

```
{

"user_id": 32,

"username": "jane"
}
```

PATH VARIABLES
id


# GET POST BY USER ID

GET https://post-here3.herokuapp.com/api/users/:id/posts

Requires authorization.

req.header.authorization = token;

Returns the post information.

Example response body:

```
{

"id": 5,

"user_id": 1,

"subreddit_id": null,

"headline": ""Reddit post Title"",

"content": "Reddit post text description",

"subreddit": []
}
```

PATH VARIABLES
id
