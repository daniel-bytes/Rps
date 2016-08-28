'use strict';

function createPlayer(id, name, isComputer) {
    const isComputerPlayer = !!isComputer;

    return {
        id: () => id,
        name: () => name,
        isComputer: () =>isComputerPlayer,
        toString: () => name,

        is: function(player) {
            return this.id() === player.id();
        },

        serialize: function() {
            return {
                id: this.id(),
                name: this.name(),
                isComputer: this.isComputer()
            }
        }
    }
}

module.exports = { 
    create: createPlayer
};