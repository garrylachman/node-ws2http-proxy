/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var Pool = require('./Pool'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');

function ConnectionsManager() {
    this.pool = new Pool();
    EventEmitter.call(this);
};

ConnectionsManager.prototype.add = function (uuid, conn) {
    this.pool.add(uuid, conn);
};

ConnectionsManager.prototype.get = function(uuid) {
    return this.pool.get(uuid);
};

ConnectionsManager.prototype.remove = function(uuid) {
    this.pool.remove(uuid);
};

ConnectionsManager.prototype.getRandom = function() {
    var randomIndex = Math.floor(Math.random(0, this.pool.count()));
    return this.pool.getByIndex(randomIndex);
};

ConnectionsManager.prototype.count = function(uuid) {
    return this.pool.count();
};

util.inherits(ConnectionsManager, EventEmitter);

module.exports = ConnectionsManager;
