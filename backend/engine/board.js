'use strict';

const matrix = require('./matrix');
const tokenTypes = require('./token-types');

function createBoard(rows, cols, tokens) {
    let boardMatrix = matrix.create(rows, cols, tokens);

    return {
        get: function(x, y) {
            return boardMatrix.get(x, y);
        },

        tokens: function() {
            return boardMatrix.elements();
        },

        without: function(matrixElement) {
            boardMatrix = boardMatrix.without(matrixElement);
            return this;
        },

        validMovesFrom: function(x, y) {
            let matrixElement = boardMatrix.get(x, y);

            if (!matrixElement || !matrixElement.value) {
                return [];
            }

            let token = matrixElement.value;

            if (!token.isMovable()) {
                return [];
            }
            
            const player = token.player();

            const allMoves = [  { x: x - 1, y: y },    // left
                                { x: 1, y: y - 1 },    // top
                                { x: x + 1, y: y },    // right
                                { x: x, y: y + 1 }  ]; // bottom
            
            var validMoves = allMoves.filter(pt => {
                const x1 = pt.x;
                const y1 = pt.y;

                if (x1 < 0 || x1 >= boardMatrix.cols()) {
                    return false;
                }
                if (y1 < 0 || y1 >= boardMatrix.rows()) {
                    return false;
                }

                const otherToken = boardMatrix.get(x1, y1);

                if (!otherToken || !otherToken.value) {
                    return true;
                }

                if (otherToken.value.player().is(player)) {
                    return false;
                }
                
                return true;
            });

            return validMoves;
        }
    }
}

module.exports = {
    create: createBoard
};