$(document).ready(
	function ()
	{		
		// API Ref: http://api.dribbble/shots/:id
		$.fn.jribbble.getShotById(21188, 
			function (shotDetails)
			{
				$('#shotById').val(JSON.stringify(shotDetails));
			}
		);
		
		// API Ref: http://api.dribbble/shots/:list
		$.fn.jribbble.getShotsByList('popular',
			function (listDetails)
			{
				$('#shotsByList').val(JSON.stringify(listDetails));
			},
			{page: 1, per_page: 5}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots
		$.fn.jribbble.getShotsByPlayerId('tylergaw',
			function (shots)
			{
				$('#shotsByPlayer').val(JSON.stringify(shots));
			},
			{page: 1, per_page: 5}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots/following
		$.fn.jribbble.getShotsThatPlayerFollows('tylergaw',
			function (shots)
			{
				$('#shotsThatPlayerFollows').val(JSON.stringify(shots));
			},
			{page: 1, per_page: 5}
		);
		
		// API Ref: http://api.dribbble/players/:id
		$.fn.jribbble.getPlayerById('tylergaw',
			function (playerDetails)
			{
				$('#playerDetails').val(JSON.stringify(playerDetails));
			}
		);
	}
);