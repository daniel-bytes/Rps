'use strict';

const tokenTypes = require('./token-types');
const tokenValues = Object.getOwnPropertyNames(tokenTypes)
                          .map(p => tokenTypes[p]);

function createToken(player, type) {
    if (!tokenValues.some(t => t === type)) {
        throw new Error(`Invalid token type ${type}.`);
    }

    return {
        player: () => player,
        
        type: () => type,

        toString: () => player.name() + ":" + type,

        isMovable: function() {
            const result = type === tokenTypes.rock
                        || type === tokenTypes.paper
                        || type === tokenTypes.scissor;

            return result;
        }
    }
}

module.exports = {
    create: createToken
};