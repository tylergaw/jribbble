;(function($, window, document, undefined) {
  'use strict';

  // This is our public access point.
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

  var jribbbleBase = {
    get: function() {
      if (!ACCESS_TOKEN) {
        console.error('Jribbble: Missing Dribbble access token. Set one with $.jribbble.accessToken = YOUR_ACCESS_TOKEN. If you do not have an access token, you must register a new application at https://dribbble.com/account/applications/new');

        return false;
      }
      console.log(this.url);
      $.ajax({
        type: 'GET',
        url: this.url,
        beforeSend: function(jqxhr) {
          jqxhr.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
        },
        success: function(res) {
          this.resolve(res);
        }.bind(this),
        error: function(jqxhr) {
          this.reject(jqxhr);
        }.bind(this)
      });

      return this;
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
    $.extend(this, $.Deferred(), jribbbleBase);

    this.url = API_URL + '/shots';
    this.initArgsArray = [].slice.call(arguments);
    this.initOpts = shotsOpts || {};

    this.shots = function(args, opts) {
      var params = opts || this.initOpts;
      var negotiated = negotiateArgs(args || this.initArgsArray) || {};
      var url = this.url;

      if (negotiated.resource) {
        url += '/' + negotiated.resource;
        delete negotiated.resource;
      }

      url += this.parseParams($.extend(negotiated, params));
      this.url = url;

      return this;
    };

    this.attachments = function(undefined, opts) {
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
      this.url = this.url + '/buckets';
      return this;
    };

    this.comments = function(id) {
      var resource = id || null;
      this.url = this.url + '/comments';

      if (resource) {
        this.url += '/' + resource;
      }

      // This is a subordinate resource of likes, it cannot be called directly
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

    this.start = function() {
      return this.shots(this.initArgsArray, this.initOpts);
    };

    return this;
  };

  $.jribbble.shots = function(undefined, opts) {
    var shots = new Shots(undefined, opts).start();
    console.log(shots);
    return shots.get();
  };

  $.jribbble.setToken = function(token) {
    ACCESS_TOKEN = token;
    return this;
  };
})(jQuery, window , document);
