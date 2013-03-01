/**
 * jQuery Plugin - Jribbble v@VERSION
 * A jQuery plugin to fetch shot and player data from the Dribbble API,
 * http://dribbble.com/api
 *
 * Copyright (c) 2011 Tyler Gaw
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Build Date: @DATE
 *
 */

;(function($, window, document, undefined) {
	'use strict';

    $.jribbble = {};

    var jsonpGET = function (path, args) {
        $.ajax({
            type: 'GET',
            url: 'http://api.dribbble.com' + path,
            data: args[1] || {},
            dataType: 'jsonp',
            success: function (data) {
                if (typeof (data) === 'undefined') {
                    args[0]({error: true});
                }
                else {
                    args[0](data);
                }
            }
        });
    };

    var methods = {
        'getShotById': '/shots/$/',
        'getReboundsOfShot': '/shots/$/rebounds/',
        'getShotsByList': '/shots/$/',
        'getShotsByPlayerId': '/players/$/shots/',
        'getShotsThatPlayerFollows': '/players/$/shots/following/',
        'getPlayerById': '/players/$/',
        'getPlayerFollowers': '/players/$/followers/',
        'getPlayerFollowing': '/players/$/following/',
        'getPlayerDraftees': '/players/$/draftees/',
        'getCommentsOfShot': '/shots/$/comments/',
        'getShotsThatPlayerLikes': '/players/$/shots/likes/'
    };

    var createAPIMethod = function (urlPattern) {
        return function () {
            var // Convert arguments to a real Array
                args = [].slice.call(arguments),

                // We run shift() on args here because we don't need to send
                // the first argument to jsonpGET.
                url = urlPattern.replace('$', args.shift());

            jsonpGET(url, args);
        };
    };

    for (var method in methods) {
        $.jribbble[method] = createAPIMethod(methods[method]);
    }

})(jQuery, window , document);