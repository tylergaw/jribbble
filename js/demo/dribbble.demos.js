$(document).ready(
	function ()
	{
		// NOTE: Since the API does not yet support JSONP we are setting 
		// the baseUrl to point to my Apache proxyPass
		// Dan, can we get some JSONP love?
		$.fn.dribbble.baseUrl = '/api.dribbble/';
		
		// API Ref: http://api.dribbble/shots/:id
		$.fn.dribbble.getShotById(21188, 
			function (shotDetails)
			{
				$('#shotById').val(JSON.stringify(shotDetails));
			}
		);
		
		// API Ref: http://api.dribbble/shots/:list
		$.fn.dribbble.getShotsByList('popular',
			function (listDetails)
			{
				$('#shotsByList').val(JSON.stringify(listDetails));
			},
			{page: 1, per_page: 5}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots
		$.fn.dribbble.getShotsByPlayerId('tylergaw',
			function (shots)
			{
				$('#shotsByPlayer').val(JSON.stringify(shots));
			},
			{page: 1, per_page: 5}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots/following
		$.fn.dribbble.getShotsThatPlayerFollows('tylergaw',
			function (shots)
			{
				$('#shotsThatPlayerFollows').val(JSON.stringify(shots));
			},
			{page: 1, per_page: 5}
		);
		
		// API Ref: http://api.dribbble/players/:id
		$.fn.dribbble.getPlayerById('tylergaw',
			function (playerDetails)
			{
				$('#playerDetails').val(JSON.stringify(playerDetails));
			}
		);
	}
);