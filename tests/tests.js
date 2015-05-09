var xhr = sinon.useFakeXMLHttpRequest();
var API_URL = 'https://api.dribbble.com/v1';

// We don't need a real token here because we won't be making requests to the API
$.jribbble.setToken('1234');

// Since we don't want to test Promises and we don't want to test the Dribbble API,
// we want to focus on the URLS that Jribbble creates. Each of theses tests makes
// a call to shots() passing it different valid inputs that should produce valid
// API URLs.
test('jribbble.shots urls', function(assert) {
  var url = API_URL + '/shots/';
  var done = assert.async();

  var shots = function(args) {
    var shots = $.jribbble.shots(args);
    return shots;
  };

  var shotsWithoutArgs = shots();
  var shotsWithParams = shots({
    'per_page': 5,
    'page': 2,
    'sort': 'views',
    'timeframe': 'month'
  });
  var shotsWithListName = shots('animated');
  var shotsWithID = shots('1234');

  // jribbble.shots is an async queue so we need to wait a moment.
  setTimeout(function() {
    assert.equal(
      shotsWithoutArgs.url,
      url,
      'shots() with no arguments: ' + shotsWithoutArgs.url
    );

    assert.equal(
      shotsWithParams.url,
      url + '?per_page=5&page=2&sort=views&timeframe=month',
      'shots() with per_page and page params: ' + shotsWithParams.url
    );

    assert.equal(
      shotsWithListName.url,
      url + '?list=animated',
      'shots() with a list name: ' + shotsWithListName.url
    );

    assert.equal(
      shotsWithID.url,
      url + '1234',
      'shots() with a shot ID: ' + shotsWithID.url
    );

    done();
  });
});

test('jribbble.shots.attachments urls', function(assert) {
  var url = API_URL + '/shots/1234/attachments/';
  var done = assert.async();

  var attachments = $.jribbble.shots('1234').attachments();
  var attachmentSingle = $.jribbble.shots('1234').attachments('456');

  setTimeout(function() {
    assert.equal(
      attachments.url,
      url,
      'attachments() with no arguments: ' + attachments.url
    );

    assert.equal(
      attachmentSingle.url,
      url + '456',
      'attachments() with a single attachment id argument: ' + attachmentSingle.url
    );

    done();
  });
});

test('jribbble.shots.buckets urls', function(assert) {
  var url = API_URL + '/shots/1234/buckets/';
  var done = assert.async();

  var buckets = $.jribbble.shots('1234').buckets();

  setTimeout(function() {
    assert.equal(
      buckets.url,
      url,
      'buckets() with no arguments: ' + buckets.url
    );

    done();
  });
});

test('jribbble.shots.comments urls', function(assert) {
  var url = API_URL + '/shots/1234/comments/';
  var done = assert.async();

  var comments = $.jribbble.shots('1234').comments();
  var commentSingle = $.jribbble.shots('1234').comments('456');
  var commentLikes = $.jribbble.shots('1234').comments('456').likes();

  setTimeout(function() {
    assert.equal(
      comments.url,
      url,
      'comments() with no arguments: ' + comments.url
    );

    assert.equal(
      commentSingle.url,
      url + '456',
      'comments() with a single comment id argument: ' + commentSingle.url
    );

    assert.equal(
      commentLikes.url,
      url + '456/likes/',
      'likes() for a comment with no arguments: ' + commentLikes.url
    );

    done();
  });
});

test('jribbble.shots.likes urls', function(assert) {
  var url = API_URL + '/shots/1234/likes/';
  var done = assert.async();

  var likes = $.jribbble.shots('1234').likes();
  var likesWithParams = $.jribbble.shots('1234').likes({
    'per_page': 5,
    'page': 2
  });

  setTimeout(function() {
    assert.equal(
      likes.url,
      url,
      'likes() with no arguments: ' + likes.url
    );

    assert.equal(
      likesWithParams.url,
      url + '?per_page=5&page=2',
      'likes() with per_page and page params: ' + likesWithParams.url
    );

    done();
  });
});
