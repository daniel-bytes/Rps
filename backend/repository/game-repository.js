'use strict';

const game = require('../engine/game');

const Promise = require('bluebird');
const redis = require('redis');
const ttl = 60 * 60; // 1 hour

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

function storeGame(client, gameObj) {
    const json = gameObj.serialize();
    const key = gameObj.id();

    return client.setAsync(key, json).then(() => {
        return client.expireAsync(key, ttl);
    });
}

function fetchGame(client, id) {
    return client.getAsync(id).then(data => {
        return client.expireAsync(id, ttl).then(() => {
            return game.deserialize(data);
        });
    }); 
}

function removeGame(client, id) {
    return client.delAsync(id);
}

function gameExists(client, id) {
    return client.existsAsync(id);
}

module.exports = function(config) {
    const client = redis.createClient(config);

    return {
        store: gameObj => storeGame(client, gameObj),
        fetch: id => fetchGame(client, id),
        remove: id => removeGame(client, id),
        exists: id => gameExists(client, id)
    }
};
