'use strict';

'use strict';

import React from 'react'

export default class Token extends React.Component {
    getTokenText(type) {
        switch(type) {
            case 0: return "X"; // other player
            case 1: return "F"; // flag
            case 2: return "R"; // rock
            case 3: return "P"; // paper
            case 4: return "S"; // scissor
            case 5: return "B"; // bomb
            default: return "";
        }
    }

    tokenSelected() {
        this.props.onTokenSelected(this.props.coordinates);
    }

    tokenReleased() {
        this.props.onTokenReleased(this.props.coordinates)
    }

    render() {
        const isUserToken = this.props.tokenType > 0;
        const textPadding = 8;
        const rectid = `rect:${this.props.id}`;
        const textid = `text:${this.props.id}`;
        const text = this.getTokenText(this.props.tokenType);
        const textX = this.props.x + textPadding;
        const textY = this.props.y + this.props.height - textPadding;
        const textSize = this.props.width;
        const cursor = isUserToken ? "pointer" : "default";
        const onMouseDown = isUserToken ? this.tokenSelected.bind(this) : null;
        const onMouseUp = this.tokenReleased.bind(this);

        return (
        <g>
            <rect
                id={rectid}
                x={this.props.x} 
                y={this.props.y} 
                width={this.props.width} 
                height={this.props.height} 
                cursor={cursor}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                stroke="black" 
                fill="transparent" />
            <text 
                id={textid}
                x={textX}
                y={textY}
                style={{ fontSize: textSize }}
                cursor={cursor}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                textAnchor="start">{text}</text>
        </g>
        );
    }
};

