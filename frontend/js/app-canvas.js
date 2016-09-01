'use strict';

import React from 'react'
import Token from './Token'

export default class AppCanvas extends React.Component {
    tokenSelected(coordinates) {
        if (this.props.gameInProgress &&
            this.props.isPlayerTurn) 
        {
            this.props.onTokenSelected(coordinates);
        }
    }

    tokenReleased(coordinates) {
        if (this.props.gameInProgress &&
            this.props.isPlayerTurn && 
            this.props.selected &&
            this.props.available &&
            this.props.available.length &&
            (this.props.selected.x !== coordinates.x || this.props.selected.y !== coordinates.y)) 
        {
            this.props.onTokenMoved(this.props.gameid, this.props.playerid, this.props.selected, coordinates);
        }
    }

    windowMouseUp() {
        this.props.onSelectionCleared();
    }

    componentDidMount() {
        if (this.props.gameInProgress) {
            window.addEventListener('mouseup', this.windowMouseUp.bind(this));
        }
        else {
            alert('Game Over!  ' + (this.props.parameters.status === 2 ? "You Win!" : "You Lost!"));
        }
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.windowMouseUp);
    }

    getToken(x, y) {
        let results = this.props.currentPlayer.tokens.filter(t => t.x === x && t.y === y);

        if (!results.length) {
            results = this.props.otherPlayer.tokens.filter(t => t.x === x && t.y === y);
        }

        return results.length ? results[0] : null;
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

    isSelected(x, y) {
        if (this.props.selected) {
            return x === this.props.selected.x && y === this.props.selected.y; 
        }

        return false;
    }

    isAvailable(x, y) {
        if (this.props.available) {
            return this.props.available.some(t => x === t.x && y === t.y);
        } 

        return false;
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
            const token = this.getToken(c.x, c.y);
            const tokenType = token ? token.type : null;
            const selected = this.isSelected(c.x, c.y);
            const available = this.isAvailable(c.x, c.y);

            return (
                <Token 
                    key={key}
                    coordinates={c}
                    x={x} 
                    y={y} 
                    width={width} 
                    height={height} 
                    tokenType={tokenType} 
                    selected={selected}
                    available={available}
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

