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

  // Provide an object of key: value params. Get back a URL encoded string if
  // params has keys.
  var parseParams = function(params) {
    var p = $.param(params);

    if (p) {
      return '?' + p;
    } else {
      return '';
    }
  };

  // TODO: Document this function ya dingus
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

  var jribbbleBase = function() {
    var ext = $.extend({}, $.Deferred());

    var Queue = function() {
      this.methods = [];
      this.response = null;
      this.flushed = false;

      this.add = function(fn) {
        if (this.flushed) {
          fn(this.scope);
        } else {
          this.methods.push(fn);
        }
      };

      this.flush = function(scope) {
        if (this.flushed) {
          return;
        }

        this.scope = scope;
        this.flushed = true;

        while(this.methods[0]) {
          this.methods.shift()(scope);
        }

        return scope;
      };

      return this;
    };

    ext.queue = new Queue();
    ext.url = API_URL;

    ext.get = function() {
      if (!ACCESS_TOKEN) {
        console.error('Jribbble: Missing Dribbble access token. Set one with $.jribbble.accessToken = YOUR_ACCESS_TOKEN. If you do not have an access token, you must register a new application at https://dribbble.com/account/applications/new');

        return false;
      }

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
    }

    return ext;
  };

  // var Shots = function(undefined, shotsOpts) {
  //   $.extend(this, $.Deferred(), jribbbleBase);
  //
  //   this.queue = new Queue();
  //   this.url = API_URL + '/shots';
  //   this.initArgsArray = [].slice.call(arguments);
  //   this.initOpts = shotsOpts || {};
  //   this.queue.flush(this);
  //   return this;

    // this.shots = function(args, opts) {
    //   var params = opts || this.initOpts;
    //   var negotiated = negotiateArgs(args || this.initArgsArray) || {};
    //   var url = this.url;
    //
    //   if (negotiated.resource) {
    //     url += '/' + negotiated.resource;
    //     delete negotiated.resource;
    //   }
    //
    //   url += this.parseParams($.extend(negotiated, params));
    //   this.url = url;
    //
    //   return this;
    // };

    // this.attachments = function(undefined, opts) {
    //   var params = opts || {};
    //   var negotiated = negotiateArgs([].slice.call(arguments)) || {};
    //   var url = this.url + '/attachments';
    //
    //   if (negotiated.resource) {
    //     url += '/' + negotiated.resource;
    //     delete negotiated.resource;
    //   }
    //
    //   url += this.parseParams($.extend(negotiated, params));
    //   this.url = url;
    //
    //   // Maybe the GET is here?
    //
    //   return this;
    // };

    // this.buckets = function() {
    //   this.url = this.url + '/buckets';
    //   return this;
    // };

    // this.comments = function(id) {
    //   var resource = id || null;
    //   this.url = this.url + '/comments';
    //
    //   if (resource) {
    //     this.url += '/' + resource;
    //   }
    //
    //   // This is a subordinate resource of likes, it cannot be called directly
    //   this.likes = function() {
    //     if (!resource) {
    //       console.warn('Jribbble: You have to pass a comment id to get the likes for it. ex: comments("1234").likes()');
    //     } else {
    //       this.url += '/likes';
    //     }
    //
    //     return this;
    //   }
    //
    //   return this;
    // };

    // return this;
  // };

  // Shots.prototype = {
  //   shots: function(args, opts) {
  //     var params = opts || this.initOpts;
  //     var negotiated = negotiateArgs(args || this.initArgsArray) || {};
  //     var url = this.url;
  //
  //     if (negotiated.resource) {
  //       url += '/' + negotiated.resource;
  //       delete negotiated.resource;
  //     }
  //
  //     url += this.parseParams($.extend(negotiated, params));
  //
  //     this.queue.add(function(self) {
  //       self.url = url;
  //     });
  //
  //     return this;
  //   }
  // }

  $.jribbble.shots = function(undefined, opts) {
    var shotsParams = opts || {};
    var shotArgsNegotiated = negotiateArgs([].slice.call(arguments)) || {};

    var Shots = function() {
      $.extend(this, jribbbleBase());

      this.url += '/shots';

      this.queue.add(function(self) {
        if (shotArgsNegotiated.resource) {
          self.resource = shotArgsNegotiated.resource;
          self.url += '/' + shotArgsNegotiated.resource;
          delete shotArgsNegotiated.resource;
        }

        self.url += parseParams($.extend(shotArgsNegotiated, shotsParams));
      });

      // Jribbble seems to need an async queue, because we need to run the
      // server request at the end of the chain, but we will never know how
      // long the chain is. This is a super hack way of "waiting" to make sure
      // the queue is stocked before we flush it.
      setTimeout(function() {
        this.queue.flush(this).get();
      }.bind(this));

      return this;
    };

    Shots.prototype.attachments = function() {
      this.queue.add(function(self) {
        if (!self.resource) {
          throw new Error('Jribbble: You have to provide a shot ID to get attachments. ex: $.jribbble.shots("1234").attachments()');
        }

        self.url += '/attachments';
      });

      return this;
    };

    Shots.prototype.buckets = function() {
      this.queue.add(function(self) {
        self.url += '/buckets';
      });

      return this;
    };

    return new Shots();


    // this.queue = new Queue();
    // this.url = API_URL + '/shots';
    //
    // // TODO: no
    // var self = this;
    //
    // var params = opts || {};
    // var negotiated = negotiateArgs([].slice.call(arguments)) || {};
    //
    // if (negotiated.resource) {
    //   this.url += '/' + negotiated.resource;
    //   delete negotiated.resource;
    // }
    //
    // this.url += parseParams($.extend(negotiated, params));
    //
    // // this.queue.add(function() {
    //   // return this.url;
    // // }.bind(this));
    //
    // this.queue.flush(this.url);
    // return this;
  };

  // $.jribbble.shots.prototype = {
  //   attachments: function(undefined, opts) {
  //     this.url += '/attachments';
  //     var params = opts || {};
  //     var negotiated = negotiateArgs([].slice.call(arguments)) || {};
  //
  //     if (negotiated.resource) {
  //       this.url += '/' + negotiated.resource;
  //       delete negotiated.resource;
  //     }
  //
  //     this.url += parseParams($.extend(negotiated, params));
  //
  //     this.queue.add(function(self) {
  //       self.url = url;
  //     });
  //
  //     return this;
  //   }
  // };

  $.jribbble.setToken = function(token) {
    ACCESS_TOKEN = token;
    return this;
  };
})(jQuery, window , document);
