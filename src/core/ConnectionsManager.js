/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var Pool = require('./Pool'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');

function ConnectionsManager() {
    this.pool = new Pool();

};

ConnectionsManager.prototype.add = function (uuid, conn) {
    this.pool.add(uuid, conn);
};

ConnectionsManager.prototype.get = function(uuid) {
    return this.pool.get(uuid);
};

ConnectionsManager.prototype.getRandom = function() {
    var randomIndex = Math.random(0, this.pool.count());
    return this.pool.getByIndex(randomIndex);
};

util.inherits(ConnectionsManager, EventEmitter);

module.exports = ConnectionsManager;