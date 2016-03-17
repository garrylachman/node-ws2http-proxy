/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    PoolEvents = require('../events/PoolEvents');

function Pool() {
    this.list = {};

    EventEmitter.call(this);
};

Pool.prototype.add = function(uuid, item) {
    this.list[uuid] = item;
    this.emit(PoolEvents.NEW_REQUEST, item);
};

Pool.prototype.remove = function(uuid) {
    this.list[uuid] = undefined;
    delete this.list[uuid];
};

Pool.prototype.get = function(uuid) {
    return this.list[uuid];
}

util.inherits(Pool, EventEmitter);

module.exports = Pool;