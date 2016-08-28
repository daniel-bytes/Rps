'use strict';

function createElement(x, y, value) {
    return { 
        x, 
        y, 
        value,
        key: () => getKey(x, y)
    };
}

function getKey(x, y) {
    return `${x}:${y}`;
}

module.exports = {
    create: createElement,
    key: getKey
};