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

    render() {
        const textPadding = 8;
        const text = this.getTokenText(this.props.tokenType);
        const textX = this.props.x + textPadding;
        const textY = this.props.y + this.props.height - textPadding;
        const textSize = this.props.width;
        const cursor = this.props.tokenType > 0 ? "pointer" : "default";

        return (
        <g>
            <rect 
                x={this.props.x} 
                y={this.props.y} 
                width={this.props.width} 
                height={this.props.height} 
                stroke="black" 
                fill="transparent"
                cursor={cursor} />
            <text 
                x={textX}
                y={textY}
                style={{ fontSize: textSize }}
                cursor={cursor}
                textAnchor="start">{text}</text>
        </g>
        );
    }
};

