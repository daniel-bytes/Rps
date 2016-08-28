'use strict';

const gameRepository = require('../repository/game-repository');
const game = require('../engine/game');
const gameAi = require('../engine/game-ai');
const player = require('../engine/player');
const tokenTypes = require('../engine/token-types');
const gameStatus = require('../engine/game-status');
const idGenerator = require('../engine/id-generator');
const config = require('../../package.json').config;

const redisConfig = config['redis'];
const gameParams = config['game-parameters'];
const repo = gameRepository(redisConfig);

function transformToUiRepresentation(gameObj, playerObj) {
    const result = gameObj.toObject();
    result.parameters.status = gameObj.status();
    result.lookups = {
        tokenTypes: tokenTypes,
        gameStatus: gameStatus
    };

    const currentPlayer = [result.player1, result.player2].filter(p => !p.player.isComputer && 
                                                                        p.player.id === playerObj.id());

    if (!currentPlayer.length) {
        throw new Error(`Failed to locate player with id ${playerObj.id()} in game`);
    }
    else if (currentPlayer.length > 1) {
        throw new Error(`Invalid game, both players are the same`);
    }

    const otherPlayer = result.player1 === currentPlayer[0] ? result.player2 : result.player1;

    result.currentPlayer = currentPlayer[0];
    result.otherPlayer = otherPlayer;

    delete result.player1;
    delete result.player2;

    // for current player, include available moves for each token
    result.currentPlayer.tokens = result.currentPlayer.tokens.map(t => {
        return {
            x: t.x,
            y: t.y,
            type: t.type,
            availableMoves: gameObj.validMovesFrom({x: t.x, y: t.y})
        };
    });

    // for other player, hide token types
    result.otherPlayer.tokens = result.otherPlayer.tokens.map(t => ({ x: t.x, y: t.y, type: tokenTypes.unknown}));

    return result;
}

function generateNewGame(userName) {
	const userId = idGenerator();
	const computerId = idGenerator();
	const gameId = idGenerator();
	const player1 = player.create(userId, userName || userName);
	const player2 = player.create(computerId, 'Computer', true);
	const parameters = {
		id: gameId,
		rows: gameParams.rows || 8,
		cols: gameParams.cols || 8,
		bombsPerPlayer: gameParams['bombs-per-player'] || 2,
		rowsPerPlayer: gameParams['rows-per-player'] || 3
	};

	const newGame = game.generate(parameters, [ player1, player2 ]);
	
	return repo.store(newGame).then(() => {
        return transformToUiRepresentation(newGame, player1);
    });
}

function validateGameId(id) {
    return repo.exists(id);
}

function fetchGame(gameId, playerId) {
    return repo.fetch(gameId).then(gameObj => {
        if (!gameObj) {
            throw new Error(`Invalid game id ${gameId}`);
        }

        const playerObjs = gameObj.players().filter(p => p.id() === playerId);

        if (playerObjs.length !== 1) {
            throw new Error(`Invalid player id ${playerId}`);
        }

        return transformToUiRepresentation(gameObj, playerObjs[0]);
    });
}

function movePlayer(gameId, playerId, from, to) {
    return repo.fetch(gameId).then(gameObj => {
        if (!gameObj) {
            throw new Error(`Invalid game id ${gameId}`);
        }

        const playerObjs = gameObj.players().filter(p => p.id() === playerId);

        if (playerObjs.length !== 1) {
            throw new Error(`Invalid player id ${playerId}`);
        }

        const validateTokenResult = gameObj.isPlayerTokenAt(playerId, from, to);

        if (!validateTokenResult) {
            throw new Error(`Invalid move, token at ${from.x}:${from.y} does not belong to player ${playerId}`);
        }

        gameObj.move(from, to);

        return transformToUiRepresentation(gameObj, playerObjs[0]);
    });
}

function moveComputer(gameId, playerId) {
    return repo.fetch(gameId).then(gameObj => {
        if (!gameObj) {
            throw new Error(`Invalid game id ${gameId}`);
        }

        const playerObjs = gameObj.players().filter(p => p.id() === playerId);

        if (playerObjs.length !== 1) {
            throw new Error(`Invalid player id ${playerId}`);
        }

        if (!playerObjs[0].isComputer()) {
            throw new Error(`Player with id ${playerId} is not a computer player`);
        }

        const move = gameAi.calculate(gameObj, playerObjs[0]);

        gameObj.move(move.from, move.to);

        return transformToUiRepresentation(gameObj, playerObjs[0]);
    });
}

module.exports = {
    generate: userName => generateNewGame(userName),
    validate: id => validateGameId(id),
    fetch: (gameId, playerId) => fetchGame(gameId, playerId),
    movePlayer: (gameId, playerId, from, to) => movePlayer(gameId, playerId, from, to),
    moveComputer: (gameId, playerId) => moveComputer(gameId, playerId)
}