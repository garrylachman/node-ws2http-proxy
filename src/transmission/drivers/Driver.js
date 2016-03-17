/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
"use strict"
var DriverEvents = require('../../events/DriverEvents'),
    extend = require('extend'),
    EventEmitter = require('events').EventEmitter;

class Driver extends EventEmitter {
    constructor(options) {
        super();

        this.options = {};
        extend(this.options, options);
    }

    send(data) {

    }

    in(data) {
        this.emit(DriverEvents.IN, data)
    }
}

module.exports = Driver;