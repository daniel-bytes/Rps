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

router.get('/api/game/:id', function(req, res, next) {
	const playerid = req.query.playerid || req.cookies.playerid;

	gameService.fetch(req.params.id, playerid).then(result => {
		if (req.query.pretty) {
			res.setHeader('Content-Type', 'application/json');
			return res.send(JSON.stringify(result, null, 3));
		}

		return res.json(result);
	})
});

module.exports = router;