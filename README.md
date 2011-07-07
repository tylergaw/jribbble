# Jribbble

A jQuery plugin to fetch data from the [Dribbble API](http://dribbble.com/api)

Live demos available at [http://lab.tylergaw.com/jribbble](http://lab.tylergaw.com/jribbble)

## Building

Jribbble uses a Makefile that is pretty much jQuery's Makefile. The Makefile just adds the version number and
date to the output files. It also creates the Ugly version of Jribbble using [UglifyJS](https://github.com/mishoo/UglifyJS)

NodeJS is required to build an Ugly version of Jribbble.

To build navigate to the Jribbble directory and run the `make` command

## Usage

### Get a shot `$.jribbble.getShotById(shotId, callback)`
* `shotId` INT The id of the shot
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).

### Get the comments of a shot `$.jribbble.getCommentsOfShot(shotId, callback, [pagingOpts])`
* `shotId` INT The id of the shot
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

### Get the rebbbounds of a shot `$.jribbble.getReboundsOfShot(shotId, callback, [pagingOpts])`
* `shotId` INT The id of the shot
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

### Get a list of shots by the list name `$.jribbble.getShotsByList(listName, callback, [pagingOpts])`
* `listName` STRING Can be one of: "popular", "everyone", "debuts"
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

### Get a list of a player's shots `$.jribbble.getShotsByPlayerId(playerId, callback, [pagingOpts])`
* `playerId` STRING or INT Can be a player's interger id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

### Get a list of shots a player is following `$.jribbble.getShotsThatPlayerFollows(playerId, callback, [pagingOpts])`
* `playerId` STRING or INT Can be a player's interger id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

### Get the profile details of a player `$.jribbble.getPlayerById(playerId, callback)`
* `playerId` STRING or INT Can be a player's interger id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).

### Get the followers of a player `$.jribbble.getPlayerFollowers(playerId, callback, [pagingOpts])`
* `playerId` STRING or INT Can be a player's interger id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

### Get the players a player is following `$.jribbble.getPlayerFollowing(playerId, callback, [pagingOpts])`
* `playerId` STRING or INT Can be a player's interger id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`

### Get the draftees of a player `$.jribbble.getPlayerDraftees(playerId, callback, [pagingOpts])`
* `playerId` STRING or INT Can be a player's interger id or username
* `callback` FUNC Function to call once the request has completed successfully. One parameter will be passed containing the JSON response of the request; callback(data).
* `pagingOpts OBJ OPTIONAL` An object that may contain 1 or 2 members; `page`, `per_page`. Example: `{page: 1, per_page: 15}`