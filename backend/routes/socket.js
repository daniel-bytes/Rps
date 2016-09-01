'use strict';

const gameService = require('../services/game-service');

function handleInitializeAction(socket, data) {
    gameService.fetch(data.gameid, data.playerid).then(g => {
        socket.emit('action', { type: 'client/INITIALIZE', data: g });
    });
}

module.exports = function(io) {
    console.log('initializing socket.io')
    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('action', function(action) {
            console.log('action received');
            console.log(action);

            switch(action.type) {
                case "server/INITIALIZE":
                    handleInitializeAction(socket, action.data);
                    break;
            }
        })
    });
}