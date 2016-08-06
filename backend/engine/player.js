'use strict';

function createPlayer(id, name, index) {
    return {
        id: () => id,
        name: () => name,
        index: () => index,
        toString: () => name,

        is: function(player) {
            return this.id() === player.id();
        }
    }
}

module.exports = { 
    create: createPlayer
};