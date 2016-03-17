/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
"use strict"
var Driver = require('./Driver'),
    PoolEvents = require('../../events/PoolEvents');

class RequestPoolDriver extends Driver {
    constructor(pool) {
        super();

        this.pool = pool;
        this.pool.on(PoolEvents.NEW_REQUEST, (r) => {
            this.in(r.toJSON());
        });
    }

    send(data) {
        this.pool.add(data);
    }

}

module.exports = RequestPoolDriver;