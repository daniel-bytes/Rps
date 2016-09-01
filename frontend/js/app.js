'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './app-container'
import { Provider } from 'react-redux'
import rpsApp from './reducers'
import { createStore } from 'redux'

let store = createStore(rpsApp)

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('content')
)