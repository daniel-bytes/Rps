'use strict';

describe('token', () => {
    const token = require('../../../backend/engine/token');

    it('can be created', () => {
        const value = token.create({}, 1);
        expect(value).not.toBeNull();
    });

    it('can throw when passed an invalid token value', () => {
        expect( () => token.create({}, 100) ).toThrow();
    });
});