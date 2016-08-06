'use strict';

const matrix = require('./matrix');
const tokenTypes = require('./token-types');

function createBoard(rows, cols) {
    const board = matrix.create(rows, cols);

    return {
        setToken: function(x, y, token) {
            board.set(x, y, token);
        },

        flatten: function() {
            return board.clone().reduce((a, b) => a.concat(b), []);
        },

        print: function() {
            board.print();
        },

        validMovesFrom: function(x, y) {
            //console.log(`validMovesFrom {${x}:${y}}`)
            const token = board.get(x, y);
            
            if (!token || !token.isMovable()) {
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
                //console.log(`Filter {${x1}:${y1}}`);

                if (x1 < 0 || x1 >= board.cols()) {
                    //console.log('Invalid X')
                    return false;
                }
                if (y1 < 0 || y1 >= board.rows()) {
                    //console.log('Invalid Y')
                    return false;
                }

                const otherToken = board.get(x1, y1);

                if (!otherToken) {
                    //console.log('OK - no token at location')
                    return true;
                }

                if (otherToken.player().is(player)) {
                    //console.log('Same player')
                    return false;
                }
                
                //console.log('OK - token is other player token')
                return true;
            });

            //console.log(validMoves)
            return validMoves;
        }
    }
}

module.exports = {
    create: createBoard
};