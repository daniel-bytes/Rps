'use strict';

const token = require('./token');
const tokenTypes = require('./token-types');
const tokenRules = require('./token-rules');
const tokenRuleResults = require('./token-rule-result');
const gameStatus = require('./game-status');
const board = require('./board');
const matrixElement = require('./matrix-element');
const player = require('./player');
const id_generator = require('./id-generator');

function createToken(player, type, x, y) {
    return {
        x: x,
        y: y,
        value: token.create(player, type)
    }
}

function createGame(parameters, playersWithTokens) {
    if (!playersWithTokens || playersWithTokens.length !== 2) {
        throw new Error("Invalid value for argument 'playersWithTokens'");
    }

    const rows = parameters.rows;
    const cols = parameters.cols;
    const currentPlayer = parameters.currentPlayer;
    const player1 = playersWithTokens[0].player;
    const player2 = playersWithTokens[1].player;
    let gameBoard = board.create(rows, cols, playersWithTokens[0].tokens
                                    .concat(
                                        playersWithTokens[1].tokens
                                    ));

    return {
        id: () => parameters.id,

        player1: () => player1,

        player2: () => player2,

        players: () => [ player1, player2 ],

        tokens: () => gameBoard.tokens(),

        isPlayerTokenAt: function(playerId, position) {
            const result = gameBoard.tokens().filter(t => t.x === position.x &&
                                                          t.y === position.y &&
                                                          t.value.player().id() === playerId);
            return result.length === 1;
        },

        isInBounds: function(position) {
            return position.x >= 0
                && position.x < parameters.cols
                && position.y >= 0
                && position.y < parameters.rows;
        },

        status: function() {
            const tokens = gameBoard.tokens().map(x => x.value);
            const flags = tokens.filter(t => t.type() === tokenTypes.flag);

            if (flags.length < 1 || flags.length > 2) {
                return gameStatus.invalid;
            }
            
            if (flags.length === 2) {
                const movableTokens = tokens.filter(t =>  t.isMovable());

                const p1Count = movableTokens.filter(t => t.player().is(player1)).length;
                const p2Count = movableTokens.filter(t => t.player().is(player2)).length;

                if (p1Count === 0) {
                    if (p2Count === 0) {
                        return gameStatus.invalid;
                    }

                    return gameStatus.player2Wins;
                }
                else if (p2Count === 0) {
                    return gameStatus.player1Wins;
                }

                return gameStatus.inProgress;
            }

            if (flags[0].player().is(player1)) {
                return gameStatus.player1Wins;
            }
            else {
                return gameStatus.player2Wins;
            }
        },

        validMovesFrom: function(from) {
            return gameBoard.validMovesFrom(from.x, from.y).map(mv => {
                return {
                    x: from.x + mv.x,
                    y: from.y + mv.y
                }
            });
        },

        move: function(from, to) {
            const validMoves = gameBoard.validMovesFrom(from.x, from.y);

            if (!validMoves.some(m => m.x === to.x && m.y === to.y)) {
                return false;
            }

            const lhsToken = gameBoard.get(from.x, from.y);
            const rhsToken = gameBoard.get(to.x, to.y);

            if (!rhsToken) {
                return true;
            }

            const result = tokenRules.execute(lhsToken.value, rhsToken.value);
            const lhsElement = matrixElement.create(from.x, from.y, lhsToken.value);
            const rhsElement = matrixElement.create(to.x, to.y, rhsToken.value);

            switch(result) {
                case tokenRuleResults.lhsLoses:
                    gameBoard = gameBoard.without(lhsElement);
                    break;
                case tokenRuleResults.rhsLoses:
                    gameBoard = gameBoard.without(rhsElement);
                    break;
                case tokenRuleResults.bothLose:
                    gameBoard = gameBoard.without(lhsElement).without(rhsElement);
                    break;
            }
            return (result > 0);
        },

        toObject: function() {
            const tokens = gameBoard.tokens();

            return {
                parameters,
                player1: {
                    player: player1.serialize(),
                    tokens: tokens.filter(t => t.value.player().is(player1))
                                  .map(t => ({ x: t.x, y: t.y, type: t.value.type()}))
                },
                player2: {
                    player: player2.serialize(),
                    tokens: tokens.filter(t => t.value.player().is(player2))
                                  .map(t => ({ x: t.x, y: t.y, type: t.value.type()}))
                },
            };
        },

        serialize: function() {
            const obj = this.toObject();
            return JSON.stringify(obj);
        }
    }
}

function deserializeGame(data) {
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    const parameters = data.parameters;
    const player1 = player.create(data.player1.player.id, data.player1.player.name, data.player1.player.isComputer);
    const player2 = player.create(data.player2.player.id, data.player2.player.name, data.player2.player.isComputer);
    const player1WithTokens = {
        player: player1,
        tokens: data.player1.tokens.map(t => ({ x: t.x, y: t.y, value: token.create(player1, t.type)}))
    };
    const player2WithTokens = {
        player: player2,
        tokens: data.player2.tokens.map(t => ({ x: t.x, y: t.y, value: token.create(player2, t.type)}))
    };
    return createGame(parameters, [player1WithTokens, player2WithTokens]);
}

function generateGame(parameters, players) {
    if (!players || players.length !== 2) {
        throw new Error("Invalid value for argument 'players'");
    }

    // make sure parameters are valid
    parameters = typeof parameters !== 'object' ? {} : parameters;
    parameters.id = parameters.id || id_generator();
    parameters.currentPlayer = 0;
    parameters.rows = parameters.rows || 8;
    parameters.cols = parameters.cols || 8;
    parameters.rowsPerPlayer = parameters.rowsPerPlayer || 3;
    parameters.bombsPerPlayer = parameters.bombsPerPlayer || 2;

    const rows = parameters.rows;
    const cols = parameters.cols;
    const rowsPerPlayer = parameters.rowsPerPlayer;
    const bombsPerPlayer = parameters.bombsPerPlayer;
    const tokensPerPlayer = rowsPerPlayer * cols;
    const availableCoordinates = [ [], [] ];

    function popCoordinate(playerIdx) {
        const len = availableCoordinates[playerIdx].length;
        if (!len) {
            return null;
        }
        const idx = Math.floor( Math.random() * len );
        const result = availableCoordinates[playerIdx].splice(idx, 1);

        return result[0];
    }

    // TODO : validate parameters
    const playersWithTokens = players.map(p => ({ player: p, tokens: [] }));
    const playerTokenTypes = [ tokenTypes.rock, tokenTypes.paper, tokenTypes.scissor ];

    for (let playerIdx = 0; playerIdx < 2; playerIdx++) {
        // setup available coordinates
        const startRow = playerIdx === 0 ? (rows - rowsPerPlayer) : 0;
        
        for (let i = 0; i < tokensPerPlayer; i++) {
            const x = (i % cols);
            const y = Math.floor(i / cols) + startRow;
            availableCoordinates[playerIdx].push({ x, y});
        }

        // configure board
        const flagCoord = popCoordinate(playerIdx);
        const flagToken = createToken(players[playerIdx], tokenTypes.flag, flagCoord.x, flagCoord.y);
        playersWithTokens[playerIdx].tokens.push(flagToken);

        for (let i = 0; i < bombsPerPlayer; i++) {
            const bombCoord = popCoordinate(playerIdx);
            const bombToken = createToken(players[playerIdx], tokenTypes.bomb, bombCoord.x, bombCoord.y);
            playersWithTokens[playerIdx].tokens.push(bombToken);
        }

        var playerTokenCounter = 0;
        
        while (availableCoordinates[playerIdx].length) {
            const playerCoord = popCoordinate(playerIdx);
            const playerTokenType = playerTokenTypes[ playerTokenCounter++ % playerTokenTypes.length ];
            const playerToken = createToken(players[playerIdx], playerTokenType, playerCoord.x, playerCoord.y);
            playersWithTokens[playerIdx].tokens.push(playerToken);
        }
    }

    return createGame(parameters, playersWithTokens);
}

module.exports = {
    create: createGame,
    generate: generateGame,
    deserialize: deserializeGame
};