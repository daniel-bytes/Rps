'use strict';

import React from 'react'
import Token from './Token'

export default class AppCanvas extends React.Component {
    tokenSelected(coordinates) {
        this.props.onTokenSelected(coordinates);
    }

    tokenReleased(coordinates) {
        this.props.onTokenReleased(coordinates);
    }

    windowMouseUp() {
        this.props.onSelectionCleared();
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.windowMouseUp.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.windowMouseUp);
    }

    getCoordinates(rows, cols) {
        const coordinates = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                coordinates.push({ x: col, y: row });
            }
        }

        return coordinates;
    }

    render() {
        const rows = parseInt(this.props.rows);
        const cols = parseInt(this.props.cols);
        const width = parseInt(this.props.tokenWidth);
        const height = parseInt(this.props.tokenHeight);
        const spacing = parseInt(this.props.tokenSpacing);

        const tokens = this.getCoordinates(rows, cols).map(c => {
            const key = `${c.x}:${c.y}`;
            const x = spacing + (c.x * (width + spacing));
            const y = spacing + (c.y * (height + spacing));
            const tokenType = Math.random() < .5 ? null : parseInt(Math.floor(Math.random() * 6));

            return (
                <Token 
                    key={key}
                    coordinates={c}
                    x={x} 
                    y={y} 
                    width={width} 
                    height={height} 
                    tokenType={tokenType} 
                    onTokenSelected={this.tokenSelected.bind(this)}
                    onTokenReleased={this.tokenReleased.bind(this)} />
            );
        });

        return (
            <svg id="canvas" 
                width={this.props.width} 
                height={this.props.height}>{tokens}</svg>
        );
    }
};

