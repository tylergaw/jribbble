 player.name + ' / ' + player.location + '</h3>');
		html.push('<h4><a href="' + player.url + '">' + player.url + '</a></h4>');
		html.push('<ul><li><b>Shots: </b>' + player.shots_count + '</li>');
		html.push('<li><b>Following: </b>' + player.following_count + '</li>');
		html.push('<li><b>Followers: </b>' + player.followers_count + '</li>');
		html.push('<li><b>Draftees: </b>' + player.draftees_count + '</li></ul></div>');
		
		$('#playerProfile').html(html.join(''));
	});
	
### Get the followers of a player `$.jribbble.getPlayerFollowers(playerId, callback, [pagingOpts])`
#### Parameters
* `playerId` STRING or INT Can be a player's interger id or username
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
* `playerId` STRING or INT Can be a player's interger id or username
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
	
### Get the draftees of a player `$.jribbble.getPlayerDraftees(playerId, callback, [pagingOpts])`
#### Parameters
* `playerId` STRING or INT Can be a player's interger id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

#### Example
	$.jribbble.getPlayerDraftees('cameronmoll', function (draftees) {
		var html = [];
		
		$.each(draftees.players, function (i, player) {
			html.push('<li><h3>' + player.name + '</h3>');
			html.push('<a href="' + player.url + '">');
			html.push('<img src="' + player.avatar_url + '" ');
			html.push('alt=""></a></li>');
		});
		
		$('#playerDraftees').html(html.join(''));
	}, {per_page: 12});
    
### Get a list of shots a player has liked `$.jribbble.getShotsThatPlayerLikes(playerId, callback, [pagingOpts])`
#### Parameters
* `playerId` STRING or INT Can be a player's interger id or username
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