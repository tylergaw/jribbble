var xhr = sinon.useFakeXMLHttpRequest();
var API_URL = 'https://api.dribbble.com/v1';

// We don't need a real token here because we won't be making requests to the API
$.jribbble.setToken('1234');

test('jribbble.shots urls', function(assert) {
  var url = API_URL + '/shots';
  assert.equal(
    $.jribbble.shots().url, url,
    'shots() with no arguments.'
  );

  assert.equal(
    $.jribbble.shots({'per_page': 5, 'page': 2}).url, url + '?per_page=5&page=2',
    'shots() with per_page and page params.'
  );

  assert.equal(
    $.jribbble.shots('animated').url,
    url + '?list=animated',
    'shots() with a list name.'
  );

  assert.equal(
    $.jribbble.shots('1234').url,
    url + '/1234',
    'shots() with a shot ID.'
  );

  assert.equal(
    $.jribbble.shots('1234', {'per_page': 3}).url,
    url + '/1234?per_page=3',
    'shots() with a shot ID and per_page param.'
  );
});
