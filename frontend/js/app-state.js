'use strict';

import gameStatus from '../../backend/engine/game-status';

export class Token {
    constructor(isPlayer, tokenType, x, y, availableMoves) {
        this._state = {};
        this._state.isPlayer = isPlayer === true;
        this._state.tokenType = tokenType;
        this._state.x = x;
        this._state.y = y;
        this._state.availableMoves = availableMoves || [];
    }

    x() { return this._state.x; }
    y() { return this._state.y; }
    isPlayer() { return this._state.isPlayer; }
    tokenType() { return this._state.tokenType; }
    availableMoves() { return this._state.availableMoves; }
    coordinates() { return { x: this.x(), y: this.y() }; }
}

export class AppState {
    constructor(prevState, serverState) {
        this._state = {};

        if (prevState && prevState._state) {
            this._state = Object.assign(this._state, prevState._state);  
        }

        if (serverState) {
            this._state.gameId = serverState.id;
            this._state.rows = serverState.parameters.rows;
            this._state.cols = serverState.parameters.cols;
            this._state.tokens = [];

            if (serverState.currentPlayer) {
                this._state.playerId = serverState.currentPlayer.id;
                this._state.playerName = serverState.currentPlayer.name;

                if (serverState.currentPlayer.tokens) {
                    this._state = this._state.tokens.concat(
                        serverState.currentPlayer.tokens.map(t => new Token(true, t.type, t.x, t.y, t.availableMoves))
                    );
                }
            }

            if (serverState.otherPlayer) {
                this._state.otherPlayerName = state.otherPlayer.name;

                if (serverState.otherPlayer.tokens) {
                    this._state = this._state.tokens.concat(
                        serverState.otherPlayer.tokens.map(t => new Token(false, t.type, t.x, t.y, t.availableMoves))
                    );
                }
            }

            this._state.isCurrentPlayerTurn = this._state.playerId === this._state.currentPlayerId
        }
    }

    gameid() { return this._state.gameid; }
    playerid() { return this._state.playerid; }
    playerName() { return this._state.playerName; }
    otherPlayerName() { return this._state.otherPlayerName; }
    isCurrentPlayerTurn() { return this._state.isCurrentPlayerTurn; }
    rows() { return this._state.rows; }
    cols() { return this._state.cols; }
    width() { return this._state.width; }
    height() { return this._state.height; }
    tokenWidth() { return this._state.tokenWidth; }
    tokenHeight() { return this._state.tokenHeight; }
    tokenSpacing() { return this._state.tokenSpacing; }

    tokens() { return this._state.tokens; }
    selected() { return this._state.selected; }
    available() { return this._state.available; }

    isSelected() { return !!this._state.selected; }

    clearSelected() {
        this._state.selected = null;
        this._state.available = [];
    }

    setSelected(x, y) {
        this.clearSelected();

        const selectedToken = _state.tokens.filter(t => t.x === coordinates.x && t.y === coordinates.y);

        if (selectedToken && selectedToken.isPlayer()) {
            this._state.selected = selectedToken.coordinates();
            this._state.available = selectedToken.availableMoves();
        }
    }

    canMoveTo(x, y) {
        return this._state.available && 
            this._state.available.some(t => t.x === x && t.y === y);
    }
}