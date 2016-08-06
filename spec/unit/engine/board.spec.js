'use strict';

describe('board', () => {
    const board = require('../../../backend/engine/board');
    const token = require('../../../backend/engine/token');
    const player = require('../../../backend/engine/player');
    
    it('can be created', () => {
        const value = board.create(2, 2);
        expect(value).not.toBeNull();
    });

    it('can be flattened', () => {
        const value = board.create(2, 2);
        const flat = value.flatten();
        expect(flat).not.toBeNull();
        expect(flat.length).toBe(4);
    });

    it('can get valid moves in an empty grid for a valid token', () => {
        const p1 = player.create('1', 'pl1', 0);
        const t = token.create(p1, 2);
        const value = board.create(3, 3);
        value.setToken(1, 1, t);
        //value.print();

        const validMoves = value.validMovesFrom(1, 1);
        expect(validMoves.length).toBe(4);
        expect(validMoves.some(pt => pt.x == 0 && pt.y == 1)).toBe(true);
        expect(validMoves.some(pt => pt.x == 2 && pt.y == 1)).toBe(true);
        expect(validMoves.some(pt => pt.x == 1 && pt.y == 0)).toBe(true);
        expect(validMoves.some(pt => pt.x == 1 && pt.y == 2)).toBe(true);
    });

    it('can get valid moves when there is another player', () => {
        const p1 = player.create('1', 'p1', 0);
        const p2 = player.create('2', 'p2', 1);
        const p1t1 = token.create(p1, 2);
        const p1t2 = token.create(p1, 1);
        const p2t1 = token.create(p2, 1);
        const value = board.create(2, 2);
        value.setToken(0, 0, p1t1);
        value.setToken(0, 1, p1t2);
        value.setToken(1, 0, p2t1);

        const validMoves = value.validMovesFrom(0, 0);

        expect(validMoves.length).toBe(1);
        expect(validMoves[0]).toEqual({ x: 1, y: 0});
    });
});