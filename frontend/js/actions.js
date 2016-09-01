'use strict';

export const ActionTypes = {
    UI_SELECT_TOKEN: 'ui/SELECT_TOKEN',
    UI_CLEAR_SELECTION: 'ui/CLEAR_SELECTION',
    SERVER_INITIALIZE: 'server/INITIALIZE',
    SERVER_MOVE_TOKEN: 'server/MOVE_TOKEN',
    CLIENT_UPDATE_BOARD: 'client/UPDATE_BOARD'
}

export const initializeBoard = (gameid, playerid) => {
    return {
        type: ActionTypes.SERVER_INITIALIZE,
        data: { gameid, playerid }
    }
}

export const moveToken = (gameid, playerid, from, to) => {
    return {
        type: ActionTypes.SERVER_MOVE_TOKEN,
        data: { gameid, playerid, from, to }
    }
}

export const selectToken = (coordinates) => {
    return {
        type: ActionTypes.UI_SELECT_TOKEN,
        coordinates
    }
}

export const clearSelection = () => {
    return {
        type: ActionTypes.UI_CLEAR_SELECTION
    }
}