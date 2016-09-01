'use strict';

import { ActionTypes } from './actions';
import { parseGameProps } from './utility'

const gameprops = parseGameProps(document);

//import initialState from './dummy-data';
const initialState = {
    gameid: gameprops.gameid,
    playerid: gameprops.playerid,
    selected: null,
    available: [],
    parameters: {
        rows: 1,
        cols: 1,
        status: 1
    },
    currentPlayer: {
        player: {},
        tokens: []
    },
    otherPlayer: {
        player: {},
        tokens: []
    }
};

function handleSelectToken(state, coordinates) {
    const selectedToken = state.currentPlayer.tokens.filter(t => t.x === coordinates.x && t.y === coordinates.y);
    
    return Object.assign({}, state, {
        selected: selectedToken.length ? { x: coordinates.x, y: coordinates.y } : null,
        available: selectedToken.length ? selectedToken[0].availableMoves : []
    });
}

function handleClearSelection(state) {
    return Object.assign({}, state, {
        selected: null,
        available: []
    });
}

function handleClientUpdateBoard(state, game) {
    const gameState = Object.assign({}, game, {
        selected: null,
        available: []
    });
    return Object.assign({}, state, gameState);
}

export default function rpsApp(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case ActionTypes.UI_SELECT_TOKEN:
            return handleSelectToken(state, action.coordinates);

        case ActionTypes.UI_CLEAR_SELECTION:
            return handleClearSelection(state);

        case ActionTypes.CLIENT_UPDATE_BOARD:
            return handleClientUpdateBoard(state, action.data);

        default:
            return state;
    }
}
