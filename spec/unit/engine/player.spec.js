'use strict';

describe('player', () => {
    const player = require('../../../backend/engine/player');

    it('can be created', () => {
        const value = player.create(123, 'dan');
        expect(value).not.toBeNull();
        expect(value.id()).toBe(123);
        expect(value.name()).toBe('dan');
    });

    it('can check if it is equal to another player', () => {
        const value1 = player.create('1', 'one');
        const value2 = player.create('2', 'two');
        const value3 = player.create('1', 'one');

        expect(value1.is(value2)).toBe(false);
        expect(value1.is(value3)).toBe(true);
    })
});