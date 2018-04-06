# Jribbble [![Build Status](https://travis-ci.org/tylergaw/jribbble.svg)](https://travis-ci.org/tylergaw/jribbble)

A JavaScript library for the [Dribbble API](http://developer.dribbble.com/v1/)

## Getting Jribbble

```
npm install jribbble
```

```
bower install jribbble
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
If you do not have a token, create a new app at [https://dribbble.com/account/applications/new](https://dribbble.com/account/applications/new)

#### `$.jribbble.setToken(token)`

**Description:** Sets the required Dribbble application client access token.

**Parameters:**
- token - *required* `String or Int` Your Dribbble App client access token

**Example usage:**
```javascript
$.jribbble.setToken('123456789');
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

**Description:** Gets a list of shots.

**Parameters:**
- id - *optional* `String or Int` A shot id or a shot list name. See [API Docs](http://developer.dribbble.com/v1/shots/#list-shots) for list names.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. See [API Docs](http://developer.dribbble.com/v1/shots/#list-shots) for a full list.

**Example usage:**
```javascript
// Get a single shot
jribbble.shots(2055068).then(function(res) {
  // Do cool stuff with response
});
```
Live example [on Codepen.io](http://codepen.io/tylergaw/pen/KpMmjZ?editors=101).

```javascript
// Get the second page of debut shots from the past month sorted by number of
// views at 35 per page.
$.jribbble.shots('debuts', {
  'sort': 'views',
  'timeframe': 'month',
  'per_page': 35
}).then(function(res) {
  // Do cool stuff with response
});
```

### User

#### `jribbble.user()`

**Description:** Gets the current user based on the `access_token`.

**Example usage:**
```javascript
jribbble.user(function(user) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/bdBrYK/?editors=101).

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
