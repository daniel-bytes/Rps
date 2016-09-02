'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './app-container'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { initializeBoard } from './actions'
import { parseGameProps } from './utility'
import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client';


let socket = io(null, { forceNew: true });
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/'); 
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
let gameprops = parseGameProps(document);

store.dispatch(
  initializeBoard(gameprops.gameid, gameprops.playerid)
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('content')
)