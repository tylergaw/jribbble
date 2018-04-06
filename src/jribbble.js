/* Jribbble @VERSION | @DATE - Copyright (c) @YEAR, Tyler Gaw me@tylergaw.com - Released under the ISC-LICENSE @preserve */
window.jribbble = (function() {
  var accessToken = null;
  var get = function(path, callback) {
    var url = "https://api.dribbble.com/v2/" + path;
    var req = new XMLHttpRequest();
    req.addEventListener("load", function() {
      if (callback) {
        if (typeof callback === "function") {
          if (this.status === 200) {
            try {
              callback(JSON.parse(this.responseText));
            } catch (err) {
              callback({
                error: "There was an error parsing the server response as JSON"
              });
            }
          } else {
            callback({
              error:
                "There was an error making the request to api.dribble.com.",
              status: this.status
            });
          }
        }
      }
    });
    req.open("GET", url);
    req.setRequestHeader("Authorization", "Bearer " + accessToken);
    req.send();
  };

  /**
   * This must be called via apply()
   * @return {Object}
   */
  var processArguments = function() {
    var args = [].slice.call(arguments);
    var resourceId = null;
    var opts = {};
    var callback = function() {};
    var query = "";

    for (var i = 0; i < args.length; i += 1) {
      switch (typeof args[i]) {
        case "string":
          resourceId = args[i];
          break;
        case "object":
          opts = args[i];
          break;
        case "function":
          callback = args[i];
      }
    }

    if (opts.token) {
      accessToken = opts.token;
    }

    if (!accessToken) {
      throw new Error(
        "jribbble needs a valid access token. You can either include this as an option: jribbble.shots({token: '1234'}) or with jribbble.setToken('1234')"
      );
    }

    var params = ["page", "per_page"]
      .map(function(p) {
        return opts[p] ? p + "=" + opts[p] : null;
      })
      .filter(function(i) {
        return i;
      })
      .join("&");

    return {
      resourceId: resourceId,
      callback: callback,
      query: params ? "?" + params : ""
    };
  };

  var createApiMethod = function(path) {
    return function() {
      var args = processArguments.apply(null, arguments);
      get(path + args.query, args.callback);
    };
  };

  return {
    setToken: function(token) {
      if (!token) {
        throw new Error("jribbble.setToken() expects a valid access_token");
      }
      accessToken = token;
    },
    shots: function() {
      var args = processArguments.apply(this.shots, arguments);
      var path = args.resourceId ? "shots/" + args.resourceId : "user/shots";
      get(path + args.query, args.callback);
    },
    user: createApiMethod("user"),
    projects: createApiMethod("user/projects"),
    likes: createApiMethod("user/likes"),
    popular: createApiMethod("popular_shots")
  };
})();
