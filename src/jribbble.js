;(function($, window, document, undefined) {
  'use strict';

  $.jribbble = {};

  var ACCESS_TOKEN = null;
  var API_URL = 'https://api.dribbble.com/v1';

  // The types of shot lists that are available through the API.
  // The default shot list–retrieved by shots()–is any type.
  var SHOT_LIST_TYPES = [
    'animated',
    'attachments',
    'debuts',
    'playoffs',
    'rebounds',
    'teams'
  ];

  var createCORSRequest = function(method, url) {
    var xhr = new XMLHttpRequest();

    if ('withCredentials' in xhr) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != 'undefined') {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  };

  var jribbbleBase = {
    get: function() {
      if (!ACCESS_TOKEN) {
        console.error('Jribbble: Missing Dribbble access token. Set one with $.jribbble.accessToken = YOUR_ACCESS_TOKEN. If you do not have an access token, you must register a new application at https://dribbble.com/account/applications/new');

        return false;
      }

      var method = 'GET';
      var xhr = createCORSRequest(method, this.url);

      xhr.onload = function() {
        var res = JSON.parse(xhr.response);

        if (xhr.statusText !== 'OK') {
          this.reject(res);
        } else {
          this.resolve(res);
        }

      }.bind(this);

      xhr.onerror = function() {
        this.reject();
      }.bind(this);

      xhr.withCredentials = true;
      xhr.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
      xhr.send();
    },

    // Provide an object of key: value params. Get back a URL encoded string if
    // params has keys.
    parseParams: function(params) {
      var p = $.param(params);

      if (p) {
        return '?' + p;
      } else {
        return '';
      }
    }
  };

  var negotiateArgs = function(args) {
    if (args.length !== 0) {
      var firstArg = args[0];
      var type = typeof firstArg;
      var params = {};

      // These are valid shot(s) ID types
      if (type === 'number' || type === 'string') {
        var list = SHOT_LIST_TYPES.indexOf(firstArg);

        // As a conveinence, you can pass the name of a shot list to shots()
        // Checking to see if the given firstArg is in that list.
        if (list > -1) {
          params.list = firstArg;
        } else {
          params.resource = firstArg;
        }
      } else if (type === 'object') {
        params = firstArg;
      }

      return params;
    }
  };

  var Shots = function(undefined, shotsOpts) {
    var shotsArgsArray = [].slice.call(arguments);

    $.extend(this, $.Deferred(), jribbbleBase);

    this.url = API_URL;

    this.shots = function(args, opts) {
      var params = opts || {};
      var negotiated = negotiateArgs(args) || {};
      var url = this.url + '/shots';

      if (negotiated.resource) {
        url += '/' + negotiated.resource;
        delete negotiated.resource;
      }

      url += this.parseParams($.extend(negotiated, params));

      this.url = url;

      return this;
    };

    this.attachments = function(undefined, opts) {
      this.shots(shotsArgsArray, shotsOpts);

      var params = opts || {};
      var negotiated = negotiateArgs([].slice.call(arguments)) || {};
      var url = this.url + '/attachments';

      if (negotiated.resource) {
        url += '/' + negotiated.resource;
        delete negotiated.resource;
      }

      url += this.parseParams($.extend(negotiated, params));

      this.url = url;

      return this;
    };

    this.buckets = function() {
      this.shots(shotsArgsArray, shotsOpts);
      this.url = this.url + '/buckets';

      return this;
    };

    this.comments = function(id) {
      var resource = id || null;
      this.shots(shotsArgsArray, shotsOpts);
      this.url = this.url + '/comments';

      if (resource) {
        this.url += '/' + resource;
      }

      this.likes = function() {
        if (!resource) {
          console.warn('Jribbble: You have to pass a comment id to get the likes for it. ex: comments("1234").likes()');
        } else {
          this.url += '/likes';
        }

        return this;
      }

      return this;
    };

    return this;
  };

  $.jribbble.shots = function(undefined, opts) {
    var shots = new Shots(undefined, opts);

    console.log(shots);
    console.log('----------');

    return shots;
  };

  $.jribbble.setToken = function(token) {
    ACCESS_TOKEN = token;
    return this;
  };

  // DEPRACATED...probably
  // var API_METHODS = {
  //   'getShotsByList': '/shots/',
  //
  //   'getShotList': '/shots/',
  //   'getAnimatedShots': '/shots/?list=animated',
  //
  //   'getShotById': '/shots/$/',
  //
  //   'getUser': '/users/$/',
  //   'getReboundsOfShot': '/shots/$/rebounds/',
  //
  //   'getShotsByPlayerId': '/players/$/shots/',
  //   'getShotsThatPlayerFollows': '/players/$/shots/following/',
  //   'getPlayerById': '/players/$/',
  //   'getPlayerFollowers': '/players/$/followers/',
  //   'getPlayerFollowing': '/players/$/following/',
  //   'getPlayerDraftees': '/players/$/draftees/',
  //   'getCommentsOfShot': '/shots/$/comments/',
  //   'getShotsThatPlayerLikes': '/players/$/shots/likes/'
  // };

  // var createAPIMethod = function(urlPattern) {
  //   return function() {
  //     // Convert arguments to a real Array
  //     var args = [].slice.call(arguments);
  //
  //     // We run shift() on args here because we don't need to send
  //     // the first argument to makeAPIRequest.
  //     var url = urlPattern.replace('$', args.shift());
  //     console.log(url);
  //
  //     makeAPIRequest(url, args);
  //   };
  // };
  //
  // for (var method in API_METHODS) {
  //   $.jribbble[method] = createAPIMethod(API_METHODS[method]);
  // }

})(jQuery, window , document);
