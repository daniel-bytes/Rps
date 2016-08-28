'use strict';

// If a current trajectory is followed until the end,
// these are the possible outcomes.
const endpointTypes = {
    wall: 0,
    friend: 1,
    enemy: 10
};

function calculateMove(gameObj, playerObj, randomThreshold = .7) {
    // divide tokens
    const tokens = gameObj.tokens();
    const playerTokens = [];
    const allTokens = {};

    for (let token of tokens) {
        if (token.value.player().is(playerObj)) {
            playerTokens.push(token);
        }
        
        allTokens[`${token.x}:${token.y}`] = token;
    }

    if (!playerTokens.length) {
        throw new Error('No tokens for player');
    }

    // get available moves, and include distance to closest other player token
    let results = [];
    for (let token of playerTokens) {
        let moves = gameObj.validMovesFrom(token);

        for (let move of moves) {
            let tempMove = { x: move.x, y: move.y };
            let direction = 1;
            let property = 'x';
            let totalMoves = 0;
            let endpointType = 0;

            if (move.x < token.x) { // left
                direction = -1;
                property = 'x';
            }
            else if (move.x > token.x) { // right
                direction = 1;
                property = 'x';
            }
            if (move.y < token.y) { // up
                direction = -1;
                property = 'y';
            }
            else if (move.y > token.y) { // down
                direction = 1;
                property = 'y';
            }

            do {
                const otherToken = allTokens[`${tempMove.x}:${tempMove.y}`];
                totalMoves++;
                tempMove[property] += direction;

                if (!gameObj.isInBounds(tempMove)) {
                    endpointType = endpointTypes.wall;
                    break;
                }

                if (otherToken) {
                    if (otherToken.value.player().is(playerObj)) {
                        endpointType = endpointTypes.friend;
                    }
                    else {
                        endpointType = endpointTypes.enemy;
                    }
                    break;
                }                
            }
            while(true);

            results.push({
                move,
                totalMoves,
                endpointType
            });
        }
    }

    results.sort((lhs, rhs) => {
        const lhsValue = (lhs.endpointType + lhs.totalMoves);
        const rhsValue = (rhs.endpointType + rhs.totalMoves);

        return rhsValue - lhsValue; // bigger lhsValue actually sorts first
    });

    if (Math.random() <= randomThreshold) {
        return results[0];
    }
    
    return results[ Math.floor(Math.random() * results.length) ];
}

module.exports = {
    calculate: (gameObj, playerObj) => calculateMove(gameObj, playerObj)
}