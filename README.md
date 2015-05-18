# Jribbble [![Build Status](https://travis-ci.org/tylergaw/jribbble.svg)](https://travis-ci.org/tylergaw/jribbble)
A jQuery plugin to retrieve shot and player info from the [Dribbble API](http://developer.dribbble.com/v1/)

Live demos available on [Codepen.io](http://codepen.io/collection/nWvjrg/)

## Dependencies
* jQuery 1.8+

## Getting Jribbble

with Bower
```
bower install --save jribbble
```

with npm
```
npm install --save jribbble
```

or direct download:
- [jribbble.js]()
- [jribbble.min.js]()

## Using Jribbble
Jribbble covers all non-authenticated methods of the [Dribbble API](http://developer.dribbble.com/v1/). All available methods are accessed from the `jribbble` object which is a member of the `jQuery` or `$` object.

*Note:* If you need access to Dribbble methods using `POST` or `PUT` you will need
to access the API using OAuth. Jribbble only supports unauthenticated `GET` methods.

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Jribbble Basic Usage</title>
</head>
<body>
  <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
  <script src="jribbble.min.js"></script>

  <script>
    function success(apiResponse) {
      // do cool stuff with apiResponse
    };

    function error(jqxhr) {
      // Handle errors
    };
    // To use Jribbble you will need to register an application at:
    // https://dribbble.com/account/applications/new
    // Before calling any methods of jribbble you must set your
    // dribbble client access token
    $.jribbble.setToken('<your_dribbble_client_access_token>');
    $.jribbble.shots().then(success, error);
  </script>
</body>
```

## Available methods

### `$.jribbble.setToken(token)`

**Description:** Sets the required Dribbble application client access token. If you do not have a token, create a new app at [https://dribbble.com/account/applications/new](https://dribbble.com/account/applications/new)

**Parameters:**
- token - *required* `String or Int` Your Dribbble App client access token

**Example usage:**
```javascript
$.jribbble.setToken('123456789');
```

### `$.jribbble.shots(id, options)`

**Description:** Gets a list of shots.

**Parameters:**
- id - *optional* `String or Int` A shot id or a shot list name. See [API Docs](http://developer.dribbble.com/v1/shots/#list-shots) for list names.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. See [API Docs](http://developer.dribbble.com/v1/shots/#list-shots) for a full list.

**Example usage:**
```javascript
// Get a single shot
$.jribbble.shots(2055068);
```
See this [live on Codepen.io](http://codepen.io/tylergaw/pen/KpMmjZ?editors=101).

```javascript
// Get the second page of debut shots from the past month sorted by number of
// views at 35 per page.
$.jribbble.shots('debuts', {
  'sort': 'views',
  'timeframe': 'month',
  'per_page': 35
});
```

See this [live on Codepen.io](http://codepen.io/tylergaw/pen/RPRVew/?editors=101).

## Contributing
Jribbble is open source. [Issues](https://github.com/tylergaw/jribbble/issues) and [pull requests](https://github.com/tylergaw/jribbble/pulls) gladly accepted.

### Tests
Jribbble uses Qunit and PhantomJS for tests. If you submit a pull request, you should most likely write a new test or modify an existing test. All tests must pass for a pull request to be accepted.

Installing test dependencies:
```
npm install && npm install -g node-qunit-phantomjs
```

running the tests:
```
make test
```

The tests will also run when pull requests are submitted. See [Travis](https://travis-ci.org/tylergaw/jribbble) for build status.

### Building Jribbble
Jribbble includes a small Makefile that includes a build task. The task copies the jribbble.js source to the `/dist` directory and creates a minified version of it using UglifyJS2. To build jribbble run:

```
make
```

from the root directory
