'use strict';

import React from 'react'

export default class App extends React.Component {
  click() {
    alert('ok!');
  }

  render() {
    return (
      <svg width="200" height="200">
        <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" onClick={this.click} />
        <rect x="50" y="10" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="90" y="10" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="130" y="10" width="30" height="30" stroke="black" fill="transparent" />

        <rect x="10" y="50" width="30" height="30" stroke="black" fill="transparent" onClick={this.click} />
        <rect x="50" y="50" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="90" y="50" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="130" y="50" width="30" height="30" stroke="black" fill="transparent" />

        <rect x="10" y="90" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="50" y="90" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="90" y="90" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="130" y="90" width="30" height="30" stroke="black" fill="transparent" />

        <rect x="10" y="130" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="50" y="130" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="90" y="130" width="30" height="30" stroke="black" fill="transparent" />
        <rect x="130" y="130" width="30" height="30" stroke="black" fill="transparent" />
      </svg>
    );
  }
};

