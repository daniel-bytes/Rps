'use strict';

describe('matrix', () => {
    let matrix = require('../../../backend/engine/matrix');

    it('can be created', () => {
        const value = matrix.create(2, 2);
        expect(value).not.toBeNull();
        expect(value.get(0, 0)).toBeNull();
    });

    it('can set values', () => {
        const value = matrix.create(2, 2);
        value.set(1, 1, 2);
        expect(value.get(1, 1)).toBe(2);
    });

    it('can report its row size', () => {
        const value = matrix.create(2, 3);
        expect(value.rows()).toBe(2);
    });

    it('can report its column size', () => {
        const value = matrix.create(2, 3);
        expect(value.cols()).toBe(3);
    });

    it('throws when given a non-number row index when getting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.get('foo', 0) ).toThrow();
    });

    it('throws when given a negative row index when getting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.get(-1, 0) ).toThrow();
    });

    it('throws when given a row index that is too high when getting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.get(1, 0) ).toThrow();
    });

    it('throws when given a non-number col index when getting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.get(0, 'foo') ).toThrow();
    });

    it('throws when given a negative col index when getting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.get(0, -1) ).toThrow();
    });

    it('throws when given a col index that is too high when getting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.get(0, 1) ).toThrow();
    });

    it('throws when given a non-number row index when setting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.set('foo', 0, null) ).toThrow();
    });

    it('throws when given a negative row index when setting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.set(-1, 0, null) ).toThrow();
    });

    it('throws when given a row index that is too high when setting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.set(1, 0, null) ).toThrow();
    });

    it('throws when given a non-number col index when setting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.set(0, 'foo', null) ).toThrow();
    });

    it('throws when given a negative col index when setting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.set(0, -1, null) ).toThrow();
    });

    it('throws when given a col index that is too high when setting', () => {
        const value = matrix.create(1, 1);
        expect( () => value.set(0, 1, null) ).toThrow();
    });

    it('throws when given a non-number value of rows', () => {
        expect( () => { matrix.create('two', 2) }).toThrow();
    });

    it('throws when given a negative number value of rows', () => {
        expect( () => { matrix.create(-2, 2) }).toThrow();
    });

    it('throws when given zero number value of rows', () => {
        expect( () => { matrix.create(0, 2) }).toThrow();
    });

    it('throws when given a non-number value of cols', () => {
        expect( () => { matrix.create(2, 'two') }).toThrow();
    });

    it('throws when given a negative number value of cols', () => {
        expect( () => { matrix.create(2, -2) }).toThrow();
    });

    it('throws when given zero number value of cols', () => {
        expect( () => { matrix.create(2, 0) }).toThrow();
    });
});