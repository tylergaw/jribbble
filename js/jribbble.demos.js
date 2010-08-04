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
				$('#shot-url').attr('href', shot.url).text(shot.url);
			}
		);
		
		// API Ref: http://api.dribbble/shots/:list
		$.jribbble.getShotsByList('popular',
			function (listDetails)
			{
				var html = '';
				$.each(listDetails.shots, function (i, shot)
				{
					html += '<li><h3>' + shot.player.name + '</h3>';
					html += '<a href="' + shot.url + '">';
					html += '<img src="' + shot.image_teaser_url + '" ';
					html += 'alt="' + shot.title + '">';
					html += '</a>';
					html += '<h4>' + shot.title + '</h4></li>';
				});
				
				$('#shotsByList').html(html);
			},
			{page: 2, per_page: 8}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots
		$.jribbble.getShotsByPlayerId('tylergaw',
			function (playerShots)
			{
				var html = '';
				
				$.each(playerShots.shots, function (i, shot)
				{
					html += '<li><a href="' + shot.url + '">';
					html += '<img src="' + shot.image_teaser_url + '" ';
					html += 'alt="' + shot.title + '"></a>';
					html += '<h4>' + shot.title + '</h4></li>';
				});
				
				$('#shotsByPlayerId').html(html);
			},
			{page: 1, per_page: 4}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots/following
		$.jribbble.getShotsThatPlayerFollows('tylergaw',
			function (followedShots)
			{
				var html = '';
				$.each(followedShots.shots, function (i, shot)
				{
					html += '<li><h3>' + shot.player.name + '</h3>';
					html += '<a href="' + shot.url + '">';
					html += '<img src="' + shot.image_teaser_url + '" ';
					html += 'alt="' + shot.title + '">';
					html += '</a>';
					html += '<h4>' + shot.title + '</h4></li>';
				});
				
				$('#shotsPlayerFollows').html(html);
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
				$('#player-url').text(player.url);
			}
		);
		
		// Run Syntax Highlighter
		JRB.prettyThisBitchUp();
	}
);