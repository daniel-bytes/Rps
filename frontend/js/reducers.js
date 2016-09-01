'use strict';

import { ActionTypes } from './actions';
import initialState from './dummy-data';
//const initialState = { };

function handleSelectToken(state, coordinates) {
    const selectedToken = state.currentPlayer.tokens.filter(t => t.x === coordinates.x && t.y === coordinates.y);

    return Object.assign({}, state, {
        selected: selectedToken.length ? { x: coordinates.x, y: coordinates.y } : null,
        available: selectedToken.length ? selectedToken[0].availableMoves : []
    });
}

function handleReleaseToken(state, coordinates) {
    return Object.assign({}, state);
}

function handleClearSelection(state) {
    return Object.assign({}, state, {
        selected: null,
        available: []
    });
}

export default function rpsApp(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case ActionTypes.SELECT_TOKEN:
            return handleSelectToken(state, action.coordinates);
        
        case  ActionTypes.RELEASE_TOKEN:
            return handleReleaseToken(state, action.coordinates);

        case ActionTypes.CLEAR_SELECTION:
            return handleClearSelection(state);

        default:
            return state;
    }
}
