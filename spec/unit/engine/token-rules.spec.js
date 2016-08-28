'use strict';

describe('token rules', () => {
    const player = require('../../../backend/engine/player');
    const token = require('../../../backend/engine/token');
    const tokenTypes = require('../../../backend/engine/token-types');
    const tokenRuleResult = require('../../../backend/engine/token-rule-result');
    const tokenRules = require('../../../backend/engine/token-rules');

    const p1 = player.create('1', 'first');
    const p2 = player.create('2', 'second');

    it('can be executed for rock:rock', () => {
        const lhs = token.create(p1, tokenTypes.rock);
        const rhs = token.create(p2, tokenTypes.rock);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.bothLose);
    });

    it('can be executed for rock:paper', () => {
        const lhs = token.create(p1, tokenTypes.rock);
        const rhs = token.create(p2, tokenTypes.paper);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.lhsLoses);
    });

    it('can be executed for rock:scissor', () => {
        const lhs = token.create(p1, tokenTypes.rock);
        const rhs = token.create(p2, tokenTypes.scissor);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.rhsLoses);
    });

    it('can be executed for rock:bomb', () => {
        const lhs = token.create(p1, tokenTypes.rock);
        const rhs = token.create(p2, tokenTypes.bomb);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.bothLose);
    });

    it('can be executed for rock:flag', () => {
        const lhs = token.create(p1, tokenTypes.rock);
        const rhs = token.create(p2, tokenTypes.flag);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.rhsLoses);
    });

    it('can be executed for paper:rock', () => {
        const lhs = token.create(p1, tokenTypes.paper);
        const rhs = token.create(p2, tokenTypes.rock);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.rhsLoses);
    });

    it('can be executed for paper:paper', () => {
        const lhs = token.create(p1, tokenTypes.paper);
        const rhs = token.create(p2, tokenTypes.paper);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.bothLose);
    });

    it('can be executed for paper:scissor', () => {
        const lhs = token.create(p1, tokenTypes.paper);
        const rhs = token.create(p2, tokenTypes.scissor);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.lhsLoses);
    });

    it('can be executed for paper:bomb', () => {
        const lhs = token.create(p1, tokenTypes.paper);
        const rhs = token.create(p2, tokenTypes.bomb);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.bothLose);
    });

    it('can be executed for paper:flag', () => {
        const lhs = token.create(p1, tokenTypes.paper);
        const rhs = token.create(p2, tokenTypes.flag);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.rhsLoses);
    });

    it('can be executed for scissor:rock', () => {
        const lhs = token.create(p1, tokenTypes.scissor);
        const rhs = token.create(p2, tokenTypes.rock);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.lhsLoses);
    });

    it('can be executed for scissor:paper', () => {
        const lhs = token.create(p1, tokenTypes.scissor);
        const rhs = token.create(p2, tokenTypes.paper);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.rhsLoses);
    });

    it('can be executed for scissor:scissor', () => {
        const lhs = token.create(p1, tokenTypes.scissor);
        const rhs = token.create(p2, tokenTypes.scissor);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.bothLose);
    });

    it('can be executed for scissor:bomb', () => {
        const lhs = token.create(p1, tokenTypes.paper);
        const rhs = token.create(p2, tokenTypes.bomb);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.bothLose);
    });

    it('can be executed for scissor:flag', () => {
        const lhs = token.create(p1, tokenTypes.paper);
        const rhs = token.create(p2, tokenTypes.flag);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.rhsLoses);
    });

    it('can be executed for flag', () => {
        const lhs = token.create(p1, tokenTypes.flag);
        const rhs = token.create(p2, tokenTypes.bomb);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.invalid_lhsNotMovable);
    });

    it('can be executed for bomb', () => {
        const lhs = token.create(p1, tokenTypes.bomb);
        const rhs = token.create(p2, tokenTypes.bomb);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.invalid_lhsNotMovable);
    });

    it('can be executed for null rhs', () => {
        const lhs = token.create(p1, tokenTypes.bomb);
        const result = tokenRules.execute(lhs, null);
        expect(result).toBe(tokenRuleResult.invalid_rhsNotAToken);
    });

    it('can be executed for same player', () => {
        const lhs = token.create(p1, tokenTypes.rock);
        const rhs = token.create(p1, tokenTypes.paper);
        const result = tokenRules.execute(lhs, rhs);
        expect(result).toBe(tokenRuleResult.invalid_rhsSamePlayer);
    });
});