'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './app-container'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { initializeBoard } from './actions'
import { parseGameIdFromUrl, parseCookies } from './utility'
import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client';


let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/'); 
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
let gameid = parseGameIdFromUrl(document);
let cookies = parseCookies(document);

store.dispatch(initializeBoard(gameid || cookies.gameid, cookies.playerid));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('content')
)