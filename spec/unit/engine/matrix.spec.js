'use strict';

describe('matrix', () => {
    let matrix = require('../../../backend/engine/matrix');
    let matrixElement = require('../../../backend/engine/matrix-element');

    it('can be created', () => {
        const value = matrix.create(2, 2);
        expect(value).not.toBeNull();
        expect(value.get(0, 0)).not.toBeTruthy();
    });

    it('can be created with data', () => {
        const arr = [ matrixElement.create(0, 0, 'a') ];
        const value = matrix.create(2, 2, arr);
        expect(value).not.toBeNull();
        expect(value.get(0, 0)).not.toBeNull();
        expect(value.get(0, 1)).not.toBeTruthy();
        expect(value.get(1, 0)).not.toBeTruthy();
    });

    it('can report its row size', () => {
        const value = matrix.create(2, 3);
        expect(value.rows()).toBe(2);
    });

    it('can report its column size', () => {
        const value = matrix.create(2, 3);
        expect(value.cols()).toBe(3);
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