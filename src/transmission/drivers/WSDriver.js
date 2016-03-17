/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
"use strict"
var Driver = require('./Driver'),
    PoolEvents = require('../../events/PoolEvents'),
    Connection = require('../../core/Connection'),
    ConnectionsManager = require('../../core/ConnectionsManager');


class WSDriver extends Driver {
    constructor(connectionManager) {
        super();

        this.cm = connectionManager;
    }

    send(data) {
        let connection = this.getConnection();
        connection.conn.send(data);
    }

    getConnection() {
        return this.cm.getRandom();
    }

}

module.exports = WSDriver;