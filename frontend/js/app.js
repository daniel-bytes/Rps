'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import AppCanvas from './app-canvas'
import { Provider } from 'react-redux'
import rpsApp from './app-reducers'
import { createStore } from 'redux'

let store = createStore(rpsApp)

ReactDOM.render(
  <Provider store={store}>
    <AppCanvas 
        rows="8" 
        cols="8" 
        width="800"
        height="800"
        tokenWidth="50"
        tokenHeight="50"
        tokenSpacing="10" />
  </Provider>,
  document.getElementById('content')
)