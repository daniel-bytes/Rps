'use strict';

import tokenTypes from '../../backend/engine/token-types';
import { parseCookies } from './utility';

const url = document.location.pathname.split('/');
const cookies = parseCookies(document);

export default {
    parameters: {
        id: cookies.gameid,
        rows: 4,
        cols: 4,
        currentPlayer: 0,
        bombsPerPlayer: 2,
        rowsPerPlayer: 2
    },
    currentPlayer: {
        player: {
            id: cookies.playerid,
            name: 'player 1',
            isComputer: false
        },
        tokens: [
            {
                x: 0,
                y: 3,
                type: tokenTypes.bomb,
                availableMoves: []
            },
            {
                x: 1,
                y: 3,
                type: tokenTypes.flag,
                availableMoves: []
            },
            {
                x: 2,
                y: 3,
                type: tokenTypes.rock,
                availableMoves: [{ x: 2, y: 2 }]
            },
            {
                x: 3,
                y: 3,
                type: tokenTypes.bomb,
                availableMoves: []
            },
            {
                x: 1,
                y: 2,
                type: tokenTypes.paper,
                availableMoves: [{ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 2}]
            },
            {
                x: 3,
                y: 2,
                type: tokenTypes.scissor,
                availableMoves: [{ x: 3, y: 1 }, { x: 2, y: 2 }]
            }
        ]
    },
    otherPlayer: {
        player: {
            id: 'p2',
            name: 'player 2',
            isComputer: true
        },
        tokens: [
            {
                x: 0,
                y: 0,
                type: tokenTypes.unknown
            },
            {
                x: 1,
                y: 0,
                type: tokenTypes.unknown
            },
            {
                x: 2,
                y: 0,
                type: tokenTypes.unknown
            },
            {
                x: 3,
                y: 0,
                type: tokenTypes.unknown
            }
        ]
    }
}