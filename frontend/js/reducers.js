'use strict';

import { ActionTypes } from './actions';

const initialState = {};

function handleSelectToken(state, coordinates) {
    console.log('reducers: handleSelectToken');
    return {};
}

function handleReleaseToken(state, coordinates) {
    console.log('reducers: handleReleaseToken');
    return {};
}

function handleClearSelection(state) {
    console.log('reducers: handleClearSelection');
    return {};
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
