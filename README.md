# Jribbble [![Build Status](https://travis-ci.org/tylergaw/jribbble.svg)](https://travis-ci.org/tylergaw/jribbble)

A JavaScript library for the [Dribbble API](http://developer.dribbble.com/v1/)

## Oauth Process

If you’re new to Dribbble and need help with getting an Oauth access token or
you want to see live examples, you should visit [https://jribbble.glitch.me](https://jribbble.glitch.me)

## Getting Jribbble

```
npm install jribbble
```
or direct download:
- [jribbble.min.js](https://github.com/tylergaw/jribbble/blob/master/dist/jribbble.min.js)
- [jribbble.js](https://github.com/tylergaw/jribbble/blob/master/dist/jribbble.js)

## Using Jribbble
Jribbble covers all public scope methods of the [Dribbble API](https://developer.dribbble.com/v2/).

```html
<body>
  <script src="/path/to/jribbble.min.js"></script>
  <script>
    jribbble.shots({token: "<your_oauth_access_token>"}, function(shots) {
      console.log(shots); // The JSON object from the API Request.
    });
  </script>
</body>
```

## Setting your app's client access token
Before you can use any of Jribbble's methods, you must set your Dribbble app's client access token.
If you do not have a token, follow the setup guide on [https://jribbble.glitch.me](https://jribbble.glitch.me)

You can set the token as an option of any method call as shown above, or you
can set it separately with `setToken`:

#### `jribbble.setToken(token)`

**Description:** Sets the required Dribbble access_token

**Parameters:**
- token - *required* `String or Int` Your Dribbble access_token from the Oauth handshake

**Example usage:**
```javascript
jribbble.setToken("123456789");
```

## Available methods

- [jribbble.shots](#jribbbleshotsid-options)
- [jribbble.user](#jribbbleusersuserid)
- [jribbble.projects](#jribbbleprojectsprojectid)

### Methods that will only work with approved Dribbble apps
- [jribbble.likes](#jribbbleprojectsprojectid)
- [jribbble.popular](#jribbbleprojectsprojectid)

### Shots

#### `jribbble.shots(id, options)`

**Description:** Gets your shots or a single shot by id.

**Parameters:**
- id - *optional* `String` A shot id
- options - *optional* `Object` Key:value pairs. Options include `token`, `page`, `per_page`
- callback - `Function`

**Example usage:**
```javascript
// Get a single shot
jribbble.shots("2055068", function(shotObject) {
  // Do cool stuff with response
});
```

```javascript
// Get a the second page of your shots at 10 per page.
jribbble.shots({page: 2, per_page: 10}, function(shotsArray) {
  // Do cool stuff with response
});
```

### User

#### `jribbble.user()`

**Description:** Gets the current user based on the `access_token`.

**Example usage:**
```javascript
jribbble.user(function(userObject) {
  // Do cool stuff with response
});
```

### Projects

#### `jribbble.projects()`

**Description:** Gets the current users projects

**Example usage:**
```javascript
jribbble.projects(function(projectsArray) {
  // Do cool stuff with response
});
```

### Likes

**Note: This will not work if you do not have a Dribbble-approved application**.

#### `jribbble.likes()`

**Description:** Gets the current users likes

**Example usage:**
```javascript
jribbble.likes(function(likesArray) {
  // Do cool stuff with response
});
```

### Popular

**Note: This will not work if you do not have a Dribbble-approved application**.

#### `jribbble.popular()`

**Description:** Gets a list of popular shots

**Example usage:**
```javascript
jribbble.popular(function(shotsArray) {
  // Do cool stuff with response
});
```

---------------------------------------------------------------------------

## Contributing
Jribbble is open source. [Issues](https://github.com/tylergaw/jribbble/issues) and [pull requests](https://github.com/tylergaw/jribbble/pulls) gladly accepted.


### Building Jribbble
Jribbble includes a Makefile that includes a build task. The task copies the jribbble.js source to the `/dist` directory–adding the version number and build date–and creates a minified version of it using UglifyJS2.

To build Jribbble you'll need UglifyJS2:

```
npm install uglify-js -g
```

then from the root directory run

```
make
```
