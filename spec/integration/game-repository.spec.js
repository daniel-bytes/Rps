'use strict';

describe('game-repository', () => {
    let repositoryFactory = require('../../backend/repository/game-repository');
    let game = require('../../backend/engine/game');
    let player = require('../../backend/engine/player');
    let token = require('../../backend/engine/token');
    let tokenTypes = require('../../backend/engine/token-types');

    it('can get/set/remove a game', done => {
        const repository = repositoryFactory(null);
        const p1 = player.create('1', 'one');
        const p2 = player.create('2', 'two');

        let gameObj = game.create({ id: 'int-test-1', rows: 3, cols: 3 }, [
            { 
                player: p1, 
                tokens: [
                    { x: 0, y: 0, value: token.create(p1, tokenTypes.flag) },
                    { x: 1, y: 0, value: token.create(p1, tokenTypes.rock) }
                ]
            },
            { 
                player: p2, 
                tokens: [
                    { x: 0, y: 1, value: token.create(p2, tokenTypes.flag) },
                    { x: 1, y: 1, value: token.create(p2, tokenTypes.paper) }
                ]
            }
        ]);

        repository.store(gameObj).then(() => {
            return repository.fetch('int-test-1').then(g => {
                expect(g).toBeTruthy();
                expect(gameObj.serialize()).toEqual(g.serialize());
            }).then(() => {
                return repository.remove('int-test-1');
            })
        })
        .done(done);
    });
});