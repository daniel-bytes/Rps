'use strict';

const matrixElement = require('./matrix-element');

function createMatrix(rows, cols, elements) {
    if (!Number.isInteger(rows) || rows <= 0) {
        throw new Error(`Invalid rows value ${rows}, must be a positive integer`);
    }
    if (!Number.isInteger(cols) || cols <= 0) {
        throw new Error(`Invalid cols value ${cols}, must be a positive integer`);
    }
    
    let matrix = {};

    if (elements && elements.length) {
       matrix = elements.reduce((prev, cur) => {
           const elem = matrixElement.create(cur.x, cur.y, cur.value);
           prev[elem.key()] = elem;
           return prev;
       }, matrix); 
    }

    return {
        rows: () => {
            return rows;
        },

        cols: () => {
            return cols;
        },

        get: function(x, y) {
            const key = matrixElement.key(x, y);
            return matrix[key];
        },

        without: function(item) {
            const key = item.key();
            delete matrix[key];
            return this;
        },

        elements: function() {
            return Object.keys(matrix).map(k => matrix[k]);
        }
    }
}

module.exports = { 
    create: createMatrix
};