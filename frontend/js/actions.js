'use strict';

export const ActionTypes = {
    SELECT_TOKEN: 'SELECT_TOKEN',
    RELEASE_TOKEN: 'RELEASE_TOKEN',
    CLEAR_SELECTION: 'CLEAR_SELECTION',
    SERVER_INITIALIZE: 'server/INITIALIZE',
    CLIENT_INITIALIZE: 'client/INITIALIZE'
}

export const initializeBoard = (gameid, playerid) => {
    return {
        type: ActionTypes.SERVER_INITIALIZE,
        data: { gameid, playerid }
    }
}

export const selectToken = (coordinates) => {
    return {
        type: ActionTypes.SELECT_TOKEN,
        coordinates
    }
}

export const releaseToken = (coordinates) => {
    return {
        type: ActionTypes.RELEASE_TOKEN,
        coordinates
    }
}

export const clearSelection = () => {
    return {
        type: ActionTypes.CLEAR_SELECTION
    }
}