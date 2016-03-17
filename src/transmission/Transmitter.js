/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
"use strict"
var extend = require('extend'),
    Driver = require('./drivers/Driver'),
    DriverEvents = require('../events/DriverEvents'),
    EventEmitter = require('events').EventEmitter;

class Transmitter {
    constructor(_in, _out) {
        this.in = _in;
        this.out = _out;

        this.in.on(DriverEvents.IN, (data) => {
            console.log(data);
        });
    }
}

module.exports = Transmitter;