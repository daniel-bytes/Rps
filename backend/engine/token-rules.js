'use strict';

const tokenTypes = require('./token-types');
const tokenRuleResult = require('./token-rule-result');

const outcomeMatrix = {};
outcomeMatrix[`${tokenTypes.rock}:${tokenTypes.paper}`] = tokenRuleResult.lhsLoses;
outcomeMatrix[`${tokenTypes.rock}:${tokenTypes.scissor}`] = tokenRuleResult.rhsLoses;
outcomeMatrix[`${tokenTypes.paper}:${tokenTypes.scissor}`] = tokenRuleResult.lhsLoses;
outcomeMatrix[`${tokenTypes.paper}:${tokenTypes.rock}`] = tokenRuleResult.rhsLoses;
outcomeMatrix[`${tokenTypes.scissor}:${tokenTypes.rock}`] = tokenRuleResult.lhsLoses;
outcomeMatrix[`${tokenTypes.scissor}:${tokenTypes.paper}`] = tokenRuleResult.rhsLoses;

function executeRule(lhs, rhs) {
    if (!lhs) {
        throw new Error('lhs must be a valid token');
    }

    if (!rhs) {
        return tokenRuleResult.invalid_rhsNotAToken;
    }

    if (lhs.player().is(rhs.player())) {
        return tokenRuleResult.invalid_rhsSamePlayer;
    }

    var lhsType = lhs.type();
    var rhsType = rhs.type();

    if (lhsType !== tokenTypes.rock && lhsType !== tokenTypes.paper && lhsType !== tokenTypes.scissor) {
        return tokenRuleResult.invalid_lhsNotMovable;
    }

    if (rhsType === tokenTypes.bomb || lhsType === rhsType) {
        return tokenRuleResult.bothLose;
    }

    if (rhsType === tokenTypes.flag) {
        return tokenRuleResult.rhsLoses;
    }
    
    return outcomeMatrix[`${lhsType}:${rhsType}`];
}

module.exports = {
    execute: executeRule
};