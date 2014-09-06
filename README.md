# Jribbble
A jQuery plugin to fetch shot and player info from the [Dribbble API](http://dribbble.com/api)

Live demos available at [http://lab.tylergaw.com/jribbble](http://lab.tylergaw.com/jribbble)

## Dependencies
* For normal usage; jQuery 1.3 or higher
* For building your own Uglified version; [UglifyJS](https://github.com/mishoo/UglifyJS)
* If you're interested, there's also a dependency-free version of Jribbble: [https://github.com/tylergaw/jribbble-no-dependencies](https://github.com/tylergaw/jribbble-no-dependencies)

## Building
Jribbble uses a Makefile that is pretty much jQuery's Makefile. The Makefile adds the version number and
date to the output files then creates the Ugly version of Jribbble using [UglifyJS](https://github.com/mishoo/UglifyJS)

NodeJS is required to build an Ugly version of Jribbble.

To build navigate to the Jribbble directory and run the `make` command

## Usage
Jribbble makes available methods for retrieving shot and player information from the Dribbble.com API. All the available methods are accessed from the `jribbble` object which is a member of the `jQuery` or `$` object.

### Tutorials
A number of nice folks have taken the time to write articles explaining how to get started using Jribbble. If you have one you've written, add it here and submit a pull request.
- [How to use the Dribbble API by Sara Vieira](http://www.developerdrive.com/2014/09/how-to-use-the-dribbble-api/)
- [Build a Dribbble Portfolio Grid with Flexboxgrid and Jribbble by Jonathan Cutrell](http://webdesign.tutsplus.com/tutorials/build-a-dribbble-portfolio-grid-with-flexboxgrid-and-jribbble--cms-20423)
- [Create a Portfolio Powered by Dribbble by Chris Collins](http://theultralinx.com/2013/09/create-portfolio-powered-dribbble.html)

### Get a shot `$.jribbble.getShotById(shotId, callback)`
#### Parameters
 - `shotId` INT The id of the shot
 - `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).

#### Example
    $.jribbble.getShotById(196071, function (shot) {
        var html = [];

        $('#shotById a:first').attr('href', shot.url);
        $('#shotById img').attr('src', shot.image_url);
        $('#shotById h3').text(shot.title);
        $('#shotById h4').html('by <a href="' + shot.player.url + '">' + shot.player.name + '</a>');

        html.push('<li><b>Views:</b> ' + shot.views_count + '</li>');
        html.push('<li><b>Likes:</b> ' + shot.likes_count + '</li>');
        html.push('<li><b>Comments:</b> ' + shot.comments_count + '</li>');
        html.push('<li><b>Rebounds:</b> ' + shot.rebounds_count + '</li>');

        $('#shotById ul').html(html.join(''));
    });

### Get the comments of a shot `$.jribbble.getCommentsOfShot(shotId, callback, [pagingOpts])`
#### Parameters
* `shotId` INT The id of the shot
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

#### Example
	$.jribbble.getCommentsOfShot(51986, function (response) {
		var html = [];
		
		$.each(response.comments, function (i, comment) {
			html.push('<li>');
			html.push('<a href="' + comment.player.url + '">');
			html.push('<img src="' + comment.player.avatar_url + '" alt=""></a>');
			html.push('<h5>' + comment.player.name + '</h5>');
			html.push('<p>' + comment.body + '</p>');
			html.push('</li>');
		});
		
		$('#shotCommentsList').html(html.join(''));
	}, {page: 1, per_page: 5});

### Get the rebbbounds of a shot `$.jribbble.getReboundsOfShot(shotId, callback, [pagingOpts])`
#### Parameters
* `shotId` INT The id of the shot
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

#### Example
	$.jribbble.getReboundsOfShot(10745, function (rebounds) {
		var html = [];
		
		$.each(rebounds.shots, function (i, shot) {
			html.push('<li><h3>' + shot.title + '</h3>');
			html.push('<h4>by ' + shot.player.name + '</h4><a href="' + shot.url + '">');
			html.push('<img src="' + shot.image_teaser_url + '" ');
			html.push('alt="' + shot.title + '"></a></li>');
		});
			
		$('#reboundsOfShot').html(html.join(''));
	}, {page: 1, per_page: 10});
	
### Get a list of shots by the list name `$.jribbble.getShotsByList(listName, callback, [pagingOpts])`
#### Parameters
* `listName` STRING Can be one of: "popular", "everyone", "debuts"
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

#### Example
	$.jribbble.getShotsByList('popular', function (listDetails) {
		var html = [];
		
		$.each(listDetails.shots, function (i, shot) {
			html.push('<li><h3>' + shot.title + '</h3>');
			html.push('<h4>by ' + shot.player.name + '</h4><a href="' + shot.url + '">');
			html.push('<img src="' + shot.image_teaser_url + '" ');
			html.push('alt="' + shot.title + '"></a></li>');
		});
			
		$('#shotsByList').html(html.join(''));
	}, {page: 2, per_page: 10});
	
### Get a list of a player's shots `$.jribbble.getShotsByPlayerId(playerId, callback, [pagingOpts])`
#### Parameters
* `playerId` STRING or INT Can be a player's integer id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

#### Example
	$.jribbble.getShotsByPlayerId('tylergaw', function (playerShots) {
		var html = [];
		
		$.each(playerShots.shots, function (i, shot) {
			html.push('<li><h3>' + shot.title + '</h3>');
			html.push('<h4>by ' + shot.player.name + '</h4><a href="' + shot.url + '">');
			html.push('<img src="' + shot.image_teaser_url + '" ');
			html.push('alt="' + shot.title + '"></a></li>');
		});
			
		$('#shotsByPlayerId').html(html.join(''));
	}, {page: 1, per_page: 10});
	
### Get a list of shots a player is following `$.jribbble.getShotsThatPlayerFollows(playerId, callback, [pagingOpts])`
#### Parameters
* `playerId` STRING or INT Can be a player's integer id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

#### Example
	$.jribbble.getShotsThatPlayerFollows('tylergaw', function (followedShots) {
		var html = [];
		
		$.each(followedShots.shots, function (i, shot) {
			html.push('<li><h3>' + shot.title + '</h3>');
			html.push('<h4>by ' + shot.player.name + '</h4><a href="' + shot.url + '">');
			html.push('<img src="' + shot.image_teaser_url + '" ');
			html.push('alt="' + shot.title + '"></a></li>');
		});
			
		$('#shotsPlayerFollows').html(html.join(''));
	}, {page: 3, per_page: 10});
	
### Get the profile details of a player `$.jribbble.getPlayerById(playerId, callback)`
#### Parameters
* `playerId` STRING or INT Can be a player's integer id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).

#### Example
	$.jribbble.getPlayerById('tylergaw', function (player) {
		var html = [];
		
		html.push('<a href="' + player.url + '"><img src="' + player.avatar_url + '" alt=""></a>');
		html.push('<div><h3>' + player.name + ' / ' + player.location + '</h3>');
		html.push('<h4><a href="' + player.url + '">' + player.url + '</a></h4>');
		html.push('<ul><li><b>Shots: </b>' + player.shots_count + '</li>');
		html.push('<li><b>Following: </b>' + player.following_count + '</li>');
		html.push('<li><b>Followers: </b>' + player.followers_count + '</li>');
		html.push('<li><b>Draftees: </b>' + player.draftees_count + '</li></ul></div>');
		
		$('#playerProfile').html(html.join(''));
	});
	
### Get the followers of a player `$.jribbble.getPlayerFollowers(playerId, callback, [pagingOpts])`
#### Parameters
* `playerId` STRING or INT Can be a player's integer id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

#### Example
	$.jribbble.getPlayerFollowers('robertjpetro', function (followers) {
		var html = [];
		
		$.each(followers.players, function (i, player) {
			html.push('<li><h3>' + player.name + '</h3>');
			html.push('<a href="' + player.url + '">');
			html.push('<img src="' + player.avatar_url + '" ');
			html.push('alt=""></a></li>');
		});
		
		$('#playerFollowers').html(html.join(''));
	}, {per_page: 12});
	
### Get the players a player is following `$.jribbble.getPlayerFollowing(playerId, callback, [pagingOpts])`
#### Parameters
* `playerId` STRING or INT Can be a player's integer id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

#### Example
	$.jribbble.getPlayerFollowing('tylergaw', function (following) {
		var html = [];
		
		$.each(following.players, function (i, player) {
			html.push('<li><h3>' + player.name + '</h3>');
			html.push('<a href="' + player.url + '">');
			html.push('<img src="' + player.avatar_url + '" ');
			html.push('alt=""></a></li>');
		});
		
		$('#playerFollowing').html(html.join(''));
	}, {per_page: 12});
    
### Get a list of shots a player likes `$.jribbble.getShotsThatPlayerLikes(playerId, callback, [pagingOpts])`
#### Parameters
* `playerId` STRING or INT Can be a player's integer id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

#### Example
    $.jribbble.getShotsThatPlayerLikes('acreek', function (playerLikes) {
        var html = [];
        
        $.each(playerLikes.shots, function (i, shot) {
            html.push('<li><h3>' + shot.title + '</h3>');
            html.push('<h4>by ' + shot.player.name + '</h4><a href="' + shot.url + '">');
            html.push('<img src="' + shot.image_teaser_url + '" ');
            html.push('alt="' + shot.title + '"></a></li>');
        });
            
        $('#shotsPlayerLikes').html(html.join(''));
    }, {page: 1, per_page: 10});
