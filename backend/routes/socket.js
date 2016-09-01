'use strict';

const gameService = require('../services/game-service');
const COMPUTER_MOVE_DELAY_MS = 500;

function handleInitializeAction(socket, data) {
    console.log(`gameid ${data.gameid}: initializing board`);

    gameService.fetch(data.gameid, data.playerid).then(g => {
        socket.emit('action', { type: 'client/UPDATE_BOARD', data: g });
        //console.log(JSON.stringify(g, null, 2));
        if (g.parameters.currentPlayer === 1 && g.otherPlayer.player.isComputer) {
            setTimeout(() => {
                console.log(`gameid ${data.gameid}: starting computer move`);

                gameService.moveComputer(data.gameid, data.playerid).then(g2 => {
                    console.log(`gameid ${data.gameid}: computer move complete`);
                    socket.emit('action', { type: 'client/UPDATE_BOARD', data: g2 });
                })
            }, COMPUTER_MOVE_DELAY_MS);
        }
    });
}

function handleMoveTokenAction(socket, data) {
    console.log(`gameid ${data.gameid}: starting move for player`);

    gameService.movePlayer(data.gameid, data.playerid, data.from, data.to).then(g => {
        console.log(`gameid ${data.gameid}: player move complete`);
        socket.emit('action', { type: 'client/UPDATE_BOARD', data: g });

        if (g.otherPlayer.player.isComputer) {
            setTimeout(() => {
                console.log(`gameid ${data.gameid}: starting computer move`);

                gameService.moveComputer(data.gameid, data.playerid).then(g2 => {
                    console.log(`gameid ${data.gameid}: computer move complete`);
                    socket.emit('action', { type: 'client/UPDATE_BOARD', data: g2 });
                })
            }, COMPUTER_MOVE_DELAY_MS);
        }
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

                case "server/MOVE_TOKEN":
                    handleMoveTokenAction(socket, action.data);
                    break;
            }
        })
    });
}