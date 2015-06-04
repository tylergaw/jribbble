# Jribbble [![Build Status](https://travis-ci.org/tylergaw/jribbble.svg)](https://travis-ci.org/tylergaw/jribbble)
A jQuery plugin to retrieve info from the [Dribbble API](http://developer.dribbble.com/v1/)

Live demos available on [Codepen.io](http://codepen.io/collection/nWvjrg/)

## Dependencies
* jQuery 1.8+

## Getting Jribbble

with Bower
```
bower install --save jribbble
```

or direct download:
- [jribbble.min.js](https://github.com/tylergaw/jribbble/blob/master/dist/jribbble.min.js)
- [jribbble.js](https://github.com/tylergaw/jribbble/blob/master/dist/jribbble.js)

## Using Jribbble
Jribbble covers all non-authenticated methods of the [Dribbble API](http://developer.dribbble.com/v1/). All available methods are accessed from the `jribbble` object which is a member of the `jQuery` or `$` object.

*Note:* If you need access to Dribbble methods using `POST` or `PUT` you will need
to access the API using OAuth. Jribbble only supports unauthenticated `GET` methods.

```html
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

- [$.jribbble.users](#jribbbleusersuserid)
- [$.jribbble.users.shots](#jribbbleusersuseridshotsoptions)
- [$.jribbble.users.buckets](#jribbbleusersuseridbucketsoptions)
- [$.jribbble.users.projects](#jribbbleusersuseridprojectsoptions)
- [$.jribbble.users.teams](#jribbbleusersuseridteamsoptions)
- [$.jribbble.users.likes](#jribbbleusersuseridlikesoptions)
- [$.jribbble.users.followers](#jribbbleusersuseridfollowersoptions)
- [$.jribbble.users.following](#jribbbleusersuseridfollowingoptions)
- [$.jribbble.users.isFollowing](#jribbbleusersuseridisfollowingtargetuserid)

#### Teams

- [$.jribbble.teams.members](#jribbbleteamsteamidmembersoptions)
- [$.jribbble.teams.shots](#jribbbleteamsteamidshotsoptions)

#### Buckets

- [$.jribbble.buckets](#jribbblebucketsbucketid)
- [$.jribbble.buckets.shots](#jribbblebucketsbucketidshotsoptions)

#### Projects

- [$.jribbble.projects](#jribbbleprojectsprojectid)
- [$.jribbble.projects.shots](#jribbbleprojectsprojectidshotsoptions)

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
// Get the likes for a shot.
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
// Get the projects for a shot.
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
// Get the rebounds for a shot.
$.jribbble.shots(2046896).rebounds().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/XbNpqx/?editors=101).

### Users

#### `$.jribbble.users(userId)`

**Description:** Gets a single user

**Parameters:**
- userId - *required* `String or Int` The username or id for the user.

**Example usage:**
```javascript
$.jribbble.users('tylergaw').then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/bdBrYK/?editors=101).

#### `$.jribbble.users(userId).shots(options)`

**Description:** Get a user's shots

**Parameters:**
- userId - *required* `String or Int` The username or id for the user.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. User's shots only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
$.jribbble.users('tylergaw').shots().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/NqpzvE/?editors=101).

#### `$.jribbble.users(userId).buckets(options)`

**Description:** Gets a user's buckets

**Parameters:**
- userId - *required* `String or Int` The username or id for the user.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Buckets only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
$.jribbble.users('markbult').buckets().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/bdBrXz/?editors=101).

#### `$.jribbble.users(userId).projects(options)`

**Description:** Gets a user's projects

**Parameters:**
- userId - *required* `String or Int` The username or id for the user.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. User projects only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
$.jribbble.users('creativemints').projects().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/xGqzjR/?editors=101).

#### `$.jribbble.users(userId).teams(options)`

**Description:** Gets the teams a user belongs to

**Parameters:**
- userId - *required* `String or Int` The username or id for the user.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. User teams only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
$.jribbble.users('veerlepieters').teams().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/RPpJJQ/?editors=101).

#### `$.jribbble.users(userId).likes(options)`

**Description:** Gets the shots a user likes

**Parameters:**
- userId - *required* `String or Int` The username or id for the user.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. User likes only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
$.jribbble.users('op45').likes().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/WvpyKm/?editors=101).

#### `$.jribbble.users(userId).followers(options)`

**Description:** Gets a user's followers

**Parameters:**
- userId - *required* `String or Int` The username or id for the user.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Followers only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
$.jribbble.users('tylergaw').followers().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/ZGBJdY/?editors=101).

#### `$.jribbble.users(userId).following(options)`

**Description:** Gets the users a user is following

**Parameters:**
- userId - *required* `String or Int` The username or id for the user.
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Following only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
$.jribbble.users('tylergaw').following().then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/jPVLdR/?editors=101).

#### `$.jribbble.users(userId).isFollowing(targetUserId)`

**Description:** Check to see if a user is following another user.

**Parameters:**
- userId - *required* `String or Int` The username or id for the user.
- targetUserId - *required* `String or Int` The username or id for the other user.

**Example usage:**
```javascript
$.jribbble.users('tylergaw').isFollowing('jimniels').then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/bdBrjx/?editors=101).

### Teams

#### `$.jribbble.teams(teamId).members(options)`

**Description:** Gets the members of a team.

**Parameters:**
- teamId - *required* `String`
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Teams only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
$.jribbble.teams('eight2eight').members(options).then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/bdBrgv/?editors=101).

#### `$.jribbble.teams(teamId).shots(options)`

**Description:** Gets the shots for a team.

**Parameters:**
- teamId - *required* `String`
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Shots only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
$.jribbble.teams('eight2eight').shots(options).then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/bdBrWM/?editors=101).

### Buckets

#### `$.jribbble.buckets(bucketId)`

**Description:** Gets a single bucket

**Parameters:**
- bucketId - *required* `String or Int`

**Example usage:**
```javascript
$.jribbble.buckets(114550).then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/mJORor/?editors=101).

#### `$.jribbble.buckets(bucketId).shots(options)`

**Description:** Gets the shots for a project

**Parameters:**
- bucketId - *required* `String or Int`
- options - *optional* `Object` Key:value pairs of options that will be included in the request as query parameters. Shots only support paging options. `per_page` and `page`.

**Example usage:**
```javascript
// Get the shots for a bucket.
$.jribbble.buckets(114550).shots(options).then(function(res) {
  // Do cool stuff with response
});
```

Live example [on Codepen.io](http://codepen.io/tylergaw/pen/ZGBLPq/?editors=101).

### Projects

#### `$.jribbble.projects(projectId)`

**Description:** Gets a single project

**Parameters:**
- projectId - *required* `String or Int`

**Example usage:**
```javascript
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
// Get the shots for a project.
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
Jribbble includes a small Makefile that includes a build task. The task copies the jribbble.js source to the `/dist` directory–adding the version number and build date–and creates a minified version of it using UglifyJS2.

To build Jribbble you'll need UglifyJS2:

```
npm install uglify-js -g
```

then run

```
make
```

from the root directory
