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
