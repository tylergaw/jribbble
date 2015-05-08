var xhr = sinon.useFakeXMLHttpRequest();
var API_URL = 'https://api.dribbble.com/v1';

// We don't need a real token here because we won't be making requests to the API
$.jribbble.setToken('1234');

test('jribbble.shots', function(assert) {
  var url = API_URL + '/shots';

  var shots = function(args) {
    var shots = $.jribbble.shots(args);
    console.log(args.per_page);
    console.log(shots.url);
    return shots;
  };

  // assert.equal(
  //   shots().url, url,
  //   'shots() with no arguments.'
  // );

  assert.equal(
    shots({'per_page': 5, 'page': 2}).url, url + '?per_page=5&page=2',
    'shots() with per_page and page params.'
  );
  //
  // assert.equal(
  //   $.jribbble.shots('animated').url,
  //   url + '?list=animated',
  //   'shots() with a list name.'
  // );
  //
  // assert.equal(
  //   $.jribbble.shots('1234').url,
  //   url + '/1234',
  //   'shots() with a shot ID.'
  // );
  //
  // assert.equal(
  //   $.jribbble.shots('1234', {'per_page': 3}).url,
  //   url + '/1234?per_page=3',
  //   'shots() with a shot ID and per_page param.'
  // );
});

// test('jribbble.shots.attachments urls', function(assert) {
//   var url = API_URL + '/shots/1234';
//
//   assert.equal(
//     $.jribbble.shots('1234').attachments().url,
//     url + '/attachments',
//     'All attachments() for the shot 1234.'
//   );
// });
