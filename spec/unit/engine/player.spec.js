'use strict';

describe('player', () => {
    const player = require('../../../backend/engine/player');

    it('can be created', () => {
        const value = player.create(123, 'dan', 1);
        expect(value).not.toBeNull();
        expect(value.id()).toBe(123);
        expect(value.name()).toBe('dan');
        expect(value.index()).toBe(1);
    });

    it('can check if it is equal to another player', () => {
        const value1 = player.create('1', 'one', 0);
        const value2 = player.create('2', 'two', 1);
        const value3 = player.create('1', 'one', 0);

        expect(value1.is(value2)).toBe(false);
        expect(value1.is(value3)).toBe(true);
    })
});