'use strict';

const FlakeIdGen = require('flake-idgen');
const intformat = require('biguint-format');
const id_generator = new FlakeIdGen;

module.exports = function() {
    const id = id_generator.next();
    const stringId = intformat(id, 'dec');
    return stringId;
}