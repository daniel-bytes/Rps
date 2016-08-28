'use strict';

describe('game', () => {
    const game = require('../../../backend/engine/game');
    const player = require('../../../backend/engine/player');
    const token = require('../../../backend/engine/token');
    const tokenTypes = require('../../../backend/engine/token-types');
    const gameStatus = require('../../../backend/engine/game-status');

    let gameObj = null;
    let serializedGame = null;

    beforeEach(() => {
        /*
         fl1  -   -
         pr2 rk1 sc2
          -  fl2  -
        */
        const p1 = player.create(1, 'one');
        const p2 = player.create(2, 'two');

        const p1Flag = token.create(p1, tokenTypes.flag);
        const p1Rock = token.create(p1, tokenTypes.rock);
        const p2Flag = token.create(p2, tokenTypes.flag);
        const p2Scissor = token.create(p2, tokenTypes.scissor);
        const p2Paper = token.create(p2, tokenTypes.paper);
        const playersWithTokens = [
            { player: p1, tokens: [ { x:0, y:0, value: p1Flag }, 
                                    { x:1, y:1, value: p1Rock }] },
            { player: p2, tokens: [ { x:2, y:1, value: p2Scissor }, 
                                    { x:1, y:2, value: p2Flag },
                                    { x:0, y:1, value: p2Paper }] },
        ];
        gameObj = game.create({ rows: 3, cols: 3 }, playersWithTokens);

        serializedGame = {
            parameters: { rows: 3, cols: 3 },
            player1: {
                player: { id: 1, name: 'one' },
                tokens: [
                    { x:0, y:0, type:tokenTypes.flag },
                    { x:1, y:1, type:tokenTypes.rock }
                ]
            },
            player2: {
                player: { id: 2, name: 'two' },
                tokens: [
                    { x:2, y:1, type:tokenTypes.scissor },
                    { x:1, y:2, type:tokenTypes.flag },
                    { x:0, y:1, type:tokenTypes.paper }
                ]
            },
        };
    });

    it('can move a token to an empty location', () => {
        const result = gameObj.move({x:1, y:1}, {x:1, y:0});
        const status = gameObj.status();
        expect(result).toBe(true);
        expect(status).toBe(gameStatus.inProgress);
    });

    it('can move a token to an enemy token and defeats token', () => {
        const result = gameObj.move({x:1, y:1}, {x:2, y:1});
        const status = gameObj.status();
        expect(result).toBe(true);
        expect(status).toBe(gameStatus.inProgress);
    });

    it('can move a token to an enemy token and loses to token', () => {
        const result = gameObj.move({x:1, y:1}, {x:0, y:1});
        const status = gameObj.status();
        expect(result).toBe(true);
        expect(status).toBe(gameStatus.player2Wins); // player 1 runs out of movable tokens
    });

    it('can move a token to an enemy flag and win game', () => {
        const result = gameObj.move({x:1, y:1}, {x:1, y:2});
        const status = gameObj.status();
        expect(result).toBe(true);
        expect(status).toBe(gameStatus.player1Wins); // player 2 flag captured
    });

    it('can be serialized', () => {
        const result = gameObj.serialize();
        const expected = JSON.stringify(serializedGame);
        expect(result).toEqual(expected);
    });

    it('can be deserialized', () => {
        const expected = JSON.stringify(serializedGame);
        const deserializedGame = game.deserialize(expected);
        const serializedResult = deserializedGame.serialize();

        expect(serializedResult).toEqual(expected);
    });
});