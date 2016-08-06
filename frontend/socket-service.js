'use strict';

const io = require('socket.io-client');

module.exports = function() {
    const socket = io();

    return {
        emit: (name, data) => {
            socket.emit(name, data);
        }
    }
}