'use strict';

const express = require('express');
const router = express.Router();
const gameService = require('../services/game-service');
const templateDir = __dirname + '/../../frontend/template';

router.get('/', function(req, res, next) {
	return res.sendFile('home.html', { root: templateDir });
});

router.post('/play', function(req, res, next) {
	const userName = req.body.username || 'New Player';
	
	gameService.generate(userName).then(result => {
		const playerId = result.currentPlayer.player.id;
		const gameId = result.parameters.id;

		res.cookie('playerid', playerId);
		res.cookie('gameid', gameId);
		res.redirect('/play/' + gameId);
	});
});

router.get('/play/:id', function(req, res, next) {
	gameService.validate(req.params.id).then(result => {
		if (result) {
			return res.sendFile('index.html', { root: templateDir });
		}
		return res.redirect('/');
	})
});

module.exports = router;