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
 * Date: @DATE
 *
 */

(function ($) {
	'use strict';
	
	// @return OBJ
	$.fn.jribbble = function () {
						
		// Make a request to the API
		// @param STRING url
		// @param FUNCTION callback
		// @param OBJ OPTIONAL options
		this.makeRequest = function (url, callback, options) {
			var successHandler = function (data) {
				if ($.isFunction(callback)) {
					callback(data);
				}
			},
			
				// Catch any double '/' that may be caused by our pathname storage
				cleanURL = url.replace('//', '/');

			$.ajax({
				data: options,
				dataType: 'jsonp',
				success: successHandler,
				type: 'GET',
				url: $.jribbble.baseUrl + cleanURL
			});
		};

        // Returning "this", allows this plugin to be chainable
		return this;
    };
	
	// Create a public object for jribbble
	$.jribbble = {};
	
	// Public Static Members
	// Can be set globally for all jquery.jribbble requests
	
	// @member STRING baseUrl - Will be prepended to all API requests
	$.jribbble.baseUrl = 'http://api.dribbble.com';
	
	// @member OBJ paths - Pathnames to resourses
	$.jribbble.paths = {
		shots:     '/shots/',
		rebounds:  '/rebounds/',
		following: '/following/',
		players:   '/players/',
		followers: '/followers/',
		draftees:  '/draftees/',
		comments:  '/comments/',
		likes:     '/likes/'
	};
	
	// Public Static Methods
	// These are available at any time, you do not have to
	// instantiate the jribbble plugin on an element to use
	
	// Retrieve the shot specified by shotId
	// @param INT shotId - The id of the shot you want.
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback
	$.jribbble.getShotById = function (shotId, callback) {
		var resource = $.jribbble.paths.shots + shotId;
		$.fn.jribbble().makeRequest(resource, callback);
	};
	
	// Retrieve the rebounds of a shot specified by shotId
	// @param INT shotId - The id of the shot you want rebounds for.
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	$.jribbble.getReboundsOfShot = function (shotId, callback, pagingOpts) {
		var resource = $.jribbble.paths.shots + shotId + $.jribbble.paths.rebounds;
		$.fn.jribbble().makeRequest(resource, callback, pagingOpts);
	};
	
	// @param STRING listName - One of the following: 'debuts', 'everyone', 'popular'
	// @param FUNCTION callback  - Function that will be called once the
	//                             request has successfully completed. The data
	//                             from the request will be passed to the callback
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	$.jribbble.getShotsByList = function (listName, callback, pagingOpts) {
		var resource = $.jribbble.paths.shots + listName;
		$.fn.jribbble().makeRequest(resource, callback, pagingOpts);
	};
	
	// Retrieve the most recent shots for the player specified by playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	$.jribbble.getShotsByPlayerId = function (playerId, callback, pagingOpts) {	
		var resource = $.jribbble.paths.players + playerId + $.jribbble.paths.shots;
		$.fn.jribbble().makeRequest(resource, callback, pagingOpts);
	};
	
	// Retrieve the most recent shots published by those the player, specified by playerId, follows
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	$.jribbble.getShotsThatPlayerFollows = function (playerId, callback, pagingOpts) {		
		var resource = $.jribbble.paths.players + playerId + $.jribbble.paths.shots + $.jribbble.paths.following;
		$.fn.jribbble().makeRequest(resource, callback, pagingOpts);
	};
	
	// Retrieve profile details for the player specified by playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	$.jribbble.getPlayerById = function (playerId, callback) {
		var resource = $.jribbble.paths.players + playerId;
		$.fn.jribbble().makeRequest(resource, callback);
	};
	
	// Retrieve followers of a player by the playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	$.jribbble.getPlayerFollowers = function (playerId, callback, pagingOpts) {
		var resource = $.jribbble.paths.players + playerId + $.jribbble.paths.followers;
		$.fn.jribbble().makeRequest(resource, callback, pagingOpts);
	};
	
	// Retrieve the list of players that are following playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	$.jribbble.getPlayerFollowing = function (playerId, callback, pagingOpts) {
		var resource = $.jribbble.paths.players + playerId + $.jribbble.paths.following;
		$.fn.jribbble().makeRequest(resource, callback, pagingOpts);
	};
	
	// Retrieve the list of players drafted by the playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	$.jribbble.getPlayerDraftees = function (playerId, callback, pagingOpts) {
		var resource = $.jribbble.paths.players + playerId + $.jribbble.paths.draftees;
		$.fn.jribbble().makeRequest(resource, callback, pagingOpts);
	};
	
	// Retrieve the set of comments for the shot specified by shotId
	// @param INT shotId - The id of the shot you want comments for.
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	$.jribbble.getCommentsOfShot = function (shotId, callback, pagingOpts) {
		var resource = $.jribbble.paths.shots + shotId + $.jribbble.paths.comments;
		$.fn.jribbble().makeRequest(resource, callback, pagingOpts);
	};
	
	// Retrieve the set of likes of the player specified by playerID
	// @param INT shotId - The id of the shot you want comments for.
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	$.jribbble.getLikesOfPlayer = function (playerId, callback, pagingOpts) {
		var resource = $.jribbble.paths.players + playerId + $.jribbble.paths.shots + $.jribbble.paths.likes;
		$.fn.jribbble().makeRequest(resource, callback, pagingOpts);
	};

}(jQuery));