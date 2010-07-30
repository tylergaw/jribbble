$(document).ready(
	function ()
	{		
		// API Ref: http://api.dribbble/shots/:id
		$.jribbble.getShotById(21188, 
			function (shotDetails)
			{
				$('#shotById').val(JSON.stringify(shotDetails));
			}
		);
		
		// API Ref: http://api.dribbble/shots/:list
		$.jribbble.getShotsByList('popular',
			function (listDetails)
			{
				$('#shotsByList').val(JSON.stringify(listDetails));
			},
			{page: 1, per_page: 5}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots
		$.jribbble.getShotsByPlayerId('tylergaw',
			function (shots)
			{
				$('#shotsByPlayer').val(JSON.stringify(shots));
			},
			{page: 1, per_page: 5}
		);
		
		// API Ref: http://api.dribbble/players/:id/shots/following
		$.jribbble.getShotsThatPlayerFollows('tylergaw',
			function (shots)
			{
				$('#shotsThatPlayerFollows').val(JSON.stringify(shots));
			},
			{page: 1, per_page: 5}
		);
		
		// API Ref: http://api.dribbble/players/:id
		$.jribbble.getPlayerById('tylergaw',
			function (playerDetails)
			{
				$('#playerDetails').val(JSON.stringify(playerDetails));
			}
		);
	}
);