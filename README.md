# Jribbble [![Build Status](https://travis-ci.org/tylergaw/jribbble.svg)](https://travis-ci.org/tylergaw/jribbble)

A JavaScript library for the [Dribbble API](http://developer.dribbble.com/v2/)

## The Oauth Process

To use Jribbble, you must obtain a valid [Oauth access token](http://developer.dribbble.com/v2/oauth/).
For help getting a token and live examples, see the guide at [https://jribbble.glitch.me](https://jribbble.glitch.me)

## Getting Jribbble

Jribbble is available on npm or by direct download.

```
npm install jribbble
```
or direct download:
- [jribbble.min.js](https://github.com/tylergaw/jribbble/tree/3.0.0/dist/jribbble.min.js)
- [jribbble.js](https://github.com/tylergaw/jribbble/tree/3.0.0/dist/jribbble.js)

## Using Jribbble
Jribbble works will all `public` scoped methods of the [Dribbble API](https://developer.dribbble.com/v2/).

```html
<body>
  <script src="/path/to/jribbble.min.js"></script>
  <script>
    jribbble.shots({token: "<your_oauth_access_token>"}, function(shotsArray) {
      console.log(shotsArray); // The JSON from the API Request.
    });
  </script>
</body>
```

Refer to the [Dribbble V2 API Docs](http://developer.dribbble.com/v2/) for details on response objects.

## Setting your access token
Before you can use any of Jribbble's methods, you must set your Dribbble app's client access token.
If you do not have a token, follow the setup guide on [https://jribbble.glitch.me](https://jribbble.glitch.me)

You can set the token as an option of any method call as shown in the examples `{token: "<your_oauth_access_token>"}`, or you can set it with `jribbble.setToken`:

#### `jribbble.setToken(token)`

**Description:** Sets the required Dribbble access_token

**Parameters:**
- token - *required* `String` Your Dribbble access_token from the Oauth handshake process

Using `setToken` is optional. It’s probably most useful if you’re calling multiple `jribbble` methods on a single page.

**Example usage:**
```javascript
jribbble.setToken("123456789");
```

## Available methods

- [jribbble.shots](#shots)
- [jribbble.user](#user)
- [jribbble.projects](#projects)

### Methods that will only work with Dribbble-approved apps
- [jribbble.likes](#likes)
- [jribbble.popular](#popular)

*Note: You will need to contact Dribbble support to get an approved app, Jribbble can't approve apps.*

### Shots

#### `jribbble.shots(id, options, callback)`

**Description:** Gets your shots or a single shot by id.

**Parameters:**
- id - *optional* `String` or `Number` A shot id
- options - *optional* `Object` Key:value pairs. Valid keys include `token`, `page`, and `per_page`
- callback - `Function` Will receive a single argument. An single shot object if an id
was provided, an array of shot objects if no id provided.

**Example usage:**
```javascript
// Get a list of your shots and display them in the DOM.
jribbble.shots({token: "<your_oauth_access_token>"}, function(shotsArray) {
  document.querySelector(".dribbble-shots").innerHTML = shotsArray.reduce(function(html, shot) {
    return html + '<li><a href="'+  shot.html_url + '" target="_blank"><img src="' + shot.images.normal + '"></a></li>';
  }, "");
});
```

```javascript
// Get a single shot by id and display it as an `img` in the DOM.
jribbble.shots("2055068", {token: "<your_oauth_access_token>"}, function(shotObject) {
  docment.getElementById("shot").innerHTML = '<img src="' + shot.images.normal + '">';
});
```

```javascript
// Get the second page of your shots at 12 per page and display them in the DOM.
jribbble.shots({token: "<your_oauth_access_token>", page: 2, per_page: 12}, function(shotsArray) {
  document.querySelector(".dribbble-shots").innerHTML = shotsArray.reduce(function(html, shot) {
    return html + '<li><a href="'+  shot.html_url + '" target="_blank"><img src="' + shot.images.normal + '"></a></li>';
  }, "");
});
```

See the [Dribbble API Docs for Shots](http://developer.dribbble.com/v2/shots/) for the full response object.

### User

#### `jribbble.user(options, callback)`

**Description:** Gets the current user based on the `access_token`.

**Parameters:**
- callback - `Function` Will receive a single argument. An single shot object if an id
was provided, an array of shot objects if no id provided.

**Example usage:**
```javascript
// Get your profile information and display it in the DOM
jribbble.user({ token: "your_oauth_access_token" }, function(userObj) {
  var html = [
    '<img src="' + userObj.avatar_url + '">',
    '<h3>' + userObj.name + '</h3>',
    '<h4>' + userObj.bio + '</h4>',
    '<p>Location: ' + userObj.location + '</p>'
  ];
  document.getElementById("user").innerHTML = html.join("");
});
```

See the [Dribbble API Docs for User](http://developer.dribbble.com/v2/user/) for the full response object.

### Projects

#### `jribbble.projects(options, callback)`

**Description:** Gets the current users projects

**Example usage:**
```javascript
// Get a list of your projects and display them in the DOM.
jribbble.projects({token: "your_oauth_access_token"}, function(projectsArray) {
  document.querySelector(".dribbble-projects").innerHTML = projectsArray.reduce(function(html, project) {
    return html + '<li><h4>' + project.name + '</h4><p>' + project.description + '</p></li>';
  }, "");
});
```

See the [Dribbble API Docs for Projects](http://developer.dribbble.com/v2/projects/) for the full response object.

### Likes

**Note: This will only work for Dribbble-approved applications**.

#### `jribbble.likes(options, callback)`

**Description:** Gets the current users likes

**Example usage:**
```javascript
jribbble.likes({token: "your_oauth_access_token"}, function(likesArray) {
  // Do cool stuff with response
});
```

See the [Dribbble API Docs for Likes](http://developer.dribbble.com/v2/likes/) for the full response object.

### Popular

**Note: This will only work for Dribbble-approved applications**.

#### `jribbble.popular(options, callback)`

**Description:** Gets a list of popular shots

**Example usage:**
```javascript
jribbble.popular({token: "your_oauth_access_token"}, function(shotsArray) {
  // Do cool stuff with response
});
```

See the [Dribbble API Docs for popular shots](http://developer.dribbble.com/v2/shots/#list-popular-shots) for the full response object.

#### Pagination
Methods that get a list of items can use pagination as described in the [Dribbble Docs](https://developer.dribbble.com/v2/#pagination)

You can provide `page` and `per_page` via the `options` object of Jribbble methods.

**Example**
```javascript
jribbble.shots({page: 2, per_page: 13}, function(shotsArray) {});
```

---------------------------------------------------------------------------

## Contributing
Jribbble is open source. [Issues](https://github.com/tylergaw/jribbble/issues) and [pull requests](https://github.com/tylergaw/jribbble/pulls) gladly accepted.

Install development dependencies:

```
npm install
```

### Tests
For PRs to be accepted, all tests must pass. They in [Travis](https://travis-ci.org/tylergaw/jribbble) for all PRs. There are two options to run tests locally.

Watch all files and rerun tests on change:
```
npm run test-watch
```

Run all tests once:
```
npm test
```

### Using Jribbble locally
We don't have any type of built in setup for this. To work locally, I create a
file in the root directory `sandbox.html`. This file is ignored by git. In there
I add HTML as an end-user would, expect I point to the `src` version of Jribbble
to test new changes as I'm working.

I view `sandbox.html` in a browser using a Python server:

```
python -m http.server
```

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
