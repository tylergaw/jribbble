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

or direct download:
- [jribbble.min.js]()
- [jribbble.js]()

## Using Jribbble
Jribbble covers all non-authenticated methods of the [Dribbble API](http://developer.dribbble.com/v1/). All available methods are accessed from the `jribbble` object which is a member of the `jQuery` or `$` object.

*Note:* If you need access to Dribbble methods using `POST` or `PUT` you will need
to access the API using OAuth. Jribbble only supports unauthenticated `GET` methods.

```
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

    // Jribbble methods return a promise
    $.jribbble.shots().then(success, error);
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

#### Shots
- [$.jribbble.shots](#jribbbleshotsid-options)
- [$.jribbble.shots.attachments](#jribbbleshotsshotidattachmentsattachmentid-options)
- [$.jribbble.shots.buckets](#jribbbleshotsshotidbucketsoptions)
- [$.jribbble.shots.comments](#jribbbleshotsshotidcommentscommentid-options)
- [$.jribbble.shots.comments.likes](#jribbbleshotsshotidcommentscommentidlikesoptions)
- [$.jribbble.shots.likes](#jribbbleshotsshotidlikesoptions)
- [$.jribbble.shots.projects](#jribbbleshotsshotidprojectsoptions)
- [$.jribbble.shots.rebounds](#jribbbleshotsshotidreboundsoptions)

#### Users

#### Teams

#### Buckets

#### Projects

- [$.jribbble.projects](#jribbbleprojectsprojectId)
- [$.jribbble.projects.shots](#jribbbleprojectsprojectIdshotsoptions)

### Shots

#### `$.jribbble.shots(id, options)`

**Description:** Gets a list of shots.

**Parameters:**
- id - *optional* `String or Int` A shot id or a shot list name. See [API Docs](http://developer.dribbble.com/v1/shots/#list-shots) for list names.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. See [API Docs](http://developer.dribbble.com/v1/shots/#list-shots) for a full list.

**Example usage:**
```javascript
// Get a single shot
$.jribbble.shots(2055068).then(function(res) {
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

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/RPRVew/?editors=101).

#### `$.jribbble.shots(shotId).attachments(attachmentId, options)`

**Description:** Gets the attachments or single attachment for a shot.

**Parameters:**
- shotId - *required* `String or Int`
- attachmentId - *optional* `String or Int` Only required if you want a single attachment. `options` are not rejected, but will have no effect when `attachmentId` is used.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Attachments only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
// Get all attachments for a shot
$.jribbble.shots(2066347).attachments().then(function(res) {
  // Do cool stuff with response
});
```
Live example [on Codepen.io](http://codepen.io/tylergaw/pen/XbKgJy/?editors=101).

```javascript
// Get a single attachment for a shot
$.jribbble.shots(2066347).attachments(370029).then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/ZGOyGM/?editors=101).

#### `$.jribbble.shots(shotId).buckets(options)`

**Description:** Gets the buckets for a shot.

**Parameters:**
- shotId - *required* `String or Int`
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Buckets only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
// Get all buckets for a shot at 36 per page
$.jribbble.shots(2067006).buckets({'per_page': 36}).then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/ZGOayV/?editors=101).

#### `$.jribbble.shots(shotId).comments(commentId, options)`

**Description:** Gets the comments or single comment for a shot.

**Parameters:**
- shotId - *required* `String or Int`
- commentId - *optional* `String or Int` Only required if you want a single comment. `options` are not rejected, but will have no effect when `commentId` is used.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Comments only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
// Get all comments for a shot
$.jribbble.shots(2067969).comments().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/LVZrBq/?editors=101).

```javascript
// Get a single comment for a shot
$.jribbble.shots(2067969).comments(4448286).then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/yNJERz/?editors=101).

#### `$.jribbble.shots(shotId).comments(commentId).likes(options)`

**Description:** Gets the likes for a comment.

**Parameters:**
- shotId - *required* `String or Int`
- commentId - *required* `String or Int` The id of the comment
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Likes only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
// Get the likes for a comment.
$.jribbble.shots(2069352).comments(4450321).likes().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/LVZwQL/?editors=101).

#### `$.jribbble.shots(shotId).likes(options)`

**Description:** Gets the likes for a shot.

**Parameters:**
- shotId - *required* `String or Int`
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Likes only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
// Get the likes for a comment.
$.jribbble.shots(2058881).likes().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/jPVVZb/?editors=101).

#### `$.jribbble.shots(shotId).projects(options)`

**Description:** Gets the projects for a shot.

**Parameters:**
- shotId - *required* `String or Int`
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Projects only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
// Get the likes for a comment.
$.jribbble.shots(2077496).projects().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/qdqqYo/?editors=101).

#### `$.jribbble.shots(shotId).rebounds(options)`

**Description:** Gets the rebounds for a shot.

**Parameters:**
- shotId - *required* `String or Int`
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Rebounds only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
// Get the likes for a comment.
$.jribbble.shots(2046896).rebounds().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/XbNpqx/?editors=101).

### Users

### Teams

### Buckets

### Projects

#### `$.jribbble.projects(projectId)`

**Description:** Gets a single project

**Parameters:**
- projectId - *required* `String or Int`

**Example usage:**
```javascript
// Get the likes for a comment.
$.jribbble.projects(267945).then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/MwbJPB/?editors=101).

#### `$.jribbble.projects(projectId).shots(options)`

**Description:** Gets the shots for a project

**Parameters:**
- projectId - *required* `String or Int`
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Shots only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
// Get the likes for a comment.
$.jribbble.projects(267945).shots(options).then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/mJORaE/?editors=101).

---------------------------------------------------------------------------

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
