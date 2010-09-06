$(document).ready(
	function ()
	{		
		// API Ref: http://api.dribbble/shots/:id
		$.jribbble.getShotById(37388, 
			function (shot)
			{
				$('#shotById a:first').attr('href', shot.url);
				$('#shotById img').attr('src', shot.image_url);
				$('#shotById h3').text(shot.title);
				$('#shot-player').append(shot.player.name);
				$('#shot-views').append(shot.views_count);
				$('#shot-likes').append(shot.likes_count);
				$('#shot-comments').append(shot.comments_count);
				$('#shot-rebounds').append(shot.rebounds_count);
				$('#shot-url').attr('href', shot.url).text(shot.url);
			}
		);
		
		// API Ref: http://api.dribbble/shots/:id/comments
		$.jribbble.getCommentsOfShot(51986,
			function (response)
			{
				var html = [];
				$.each(response.comments, function (i, comment)
				{
					html.push('<li>');
					html.push('<a href="' + comment.player.url + '">');
					html.push('<img src="' + comment.player.avatar_url + '" alt="" width="30" height="30"></a>');
					html.push('<h5>' + comment.player.name + '</h5>');
					html.push('<p>' + comment.body + '</p>');
					html.push('</li>');
				});
				$('#shotCommentsList').html(html.join(''));
			}
		);
		
		// Method used only for comments demo full sized shot
		$.jribbble.getShotById(51986, 
			function (shot)
			{
				$('#shotComments a:first').attr('href', shot.url);
				$('#shotComments a:first img').attr('src', shot.image_url);
				$('#shotComments h3').html(shot.title + ' <i>by ' + shot.player.name + '</i>');
			}
		);
		
		
		// API Ref: http://api.dribbble/shots/:id/rebounds
		$.jribbble.getReboundsOfShot(10745, 
			function (rebounds)
			{
				var html = [];
				$.each(rebounds.shots, function (i, shot)
				{
					html.push('<li><h3>' + shot.player.name + '</h3>');
					html.push('<a href="' + shot.url + '">');
					html.push('<img src="' + shot.image_teaser_url + '" ');
					html.push('alt="' + shot.title + '">');
					html.push('</a>');
					html.push('<h4>' + shot.title + '</h4></li>');
				});
				
				$('#reboundsOfShot').html(html.join(''));
			},
			{page: 1, per_page: 8}
		);
		
		// API Ref: http://api.dribbble/shots/:list
		$.jribbble.getShotsByList('popular',
			function (listDetails)
			{
				var html = [];
				$.each(listDetails.shots, function (i, shot)
				{
					html.push('<li><h3>' + shot.player.name + '</h3>');
					html.push('<a href="' + shot.url + '">');
					html.push('<img src="' + shot.image_teaser_url + '" ');
					html.push('alt="' + shot.title + '">');
					html.push('</a>');
					html.push('<h4>' + shot.title + '</h4></li>');
				});
				
				$('#shotsByList').html(html.join(''));
			},
			{page: 2, per_page: 8}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots
		$.jribbble.getShotsByPlayerId('tylergaw',
			function (playerShots)
			{
				var html = [];
				$.each(playerShots.shots, function (i, shot)
				{
					html.push('<li><a href="' + shot.url + '">');
					html.push('<img src="' + shot.image_teaser_url + '" ');
					html.push('alt="' + shot.title + '"></a>');
					html.push('<h4>' + shot.title + '</h4></li>');
				});
				
				$('#shotsByPlayerId').html(html.join(''));
			},
			{page: 1, per_page: 4}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots/following
		$.jribbble.getShotsThatPlayerFollows('tylergaw',
			function (followedShots)
			{
				var html = [];
				$.each(followedShots.shots, function (i, shot)
				{
					html.push('<li><h3>' + shot.player.name + '</h3>');
					html.push('<a href="' + shot.url + '">');
					html.push('<img src="' + shot.image_teaser_url + '" ');
					html.push('alt="' + shot.title + '">');
					html.push('</a>');
					html.push('<h4>' + shot.title + '</h4></li>');
				});
				
				$('#shotsPlayerFollows').html(html.join(''));
			},
			{page: 3, per_page: 8}
		);
		
		// API Ref: http://api.dribbble/players/:id
		$.jribbble.getPlayerById('tylergaw',
			function (player)
			{				
				$('#player a').attr('href', player.url);
				$('#player img').attr('src', player.avatar_url);
				$('#player h3').html(player.name + ' - <i>' + player.location + '</i>');
				$('#player-shots').append(player.shots_count);
				$('#player-following').append(player.following_count);
				$('#player-followers').append(player.followers_count);
				$('#player-draftees').append(player.draftees_count);
				$('#player-url').text(player.url);
			}
		);
		
		// API Ref: http://api.dribbble/players/:id/followers
		$.jribbble.getPlayerFollowers('hoefler',
			function (followers)
			{
				var html = [];
				$.each(followers.players, function (i, player)
				{
					html.push('<li><h3>' + player.name + '</h3>');
					html.push('<a href="' + player.url + '">');
					html.push('<img src="' + player.avatar_url + '" ');
					html.push('alt=""></a></li>');
				});
				$('#playerFollowers').html(html.join(''));
			}, 
			{page: 2, per_page: 8}
		);
		
		// API Ref: http://api.dribbble/players/:id/following
		$.jribbble.getPlayerFollowing('tylergaw',
			function (following)
			{
				var html = [];
				$.each(following.players, function (i, player)
				{
					html.push('<li><h3>' + player.name + '</h3>');
					html.push('<a href="' + player.url + '">');
					html.push('<img src="' + player.avatar_url + '" ');
					html.push('alt=""></a></li>');
				});
				$('#playerFollowing').html(html.join(''));
			},
			{per_page: 8}
		);
		
		// API Ref: http://api.dribbble/players/:id/draftees
		$.jribbble.getPlayerDraftees('cameronmoll',
			function (draftees)
			{
				var html = [];
				$.each(draftees.players, function (i, player)
				{
					html.push('<li><h3>' + player.name + '</h3>');
					html.push('<a href="' + player.url + '">');
					html.push('<img src="' + player.avatar_url + '" ');
					html.push('alt=""></a></li>');
				});
				$('#playerDraftees').html(html.join(''));
			},
			{per_page: 8}
		);
	}
);