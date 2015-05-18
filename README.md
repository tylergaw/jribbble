# Jribbble [![Build Status](https://travis-ci.org/tylergaw/jribbble.svg)](https://travis-ci.org/tylergaw/jribbble)
A jQuery plugin to retrieve shot and player info from the [Dribbble API](http://developer.dribbble.com/v1/)

## Dependencies
* jQuery 1.8+

## Getting Jribbble

with Bower
```
bower install jribbble
```

with npm
```
npm install jribbble
```

or direct download:
- [jribbble.js]()
- [jribbble.min.js]()

## Using Jribbble
All available methods are accessed from the `jribbble` object which is a member of the `jQuery` or `$` object.

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
    // To use Jribbble you will need to register an application at:
    // https://dribbble.com/account/applications/new
    // Before calling any methods of jribbble you must set your
    // dribbble client access token
    $.jribbble.setToken('<your_dribbble_client_access_token>');

    $.jribbble.shots().then(function(apiResponse) {
      console.log(apiResponse);
    });
  </script>
</body>
```

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
