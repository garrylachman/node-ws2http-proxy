/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var extend = require('extend'),
    WebSocketServer = require('ws').Server,
    RequestItem = require('../core/Request'),
    WSServerEvents = require('../events/WSServerEvents'),
    Connection = require('../core/Connection'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;


function WSServer(options) {
    this.options = {
        host: '0.0.0.0',
        port: 8080
    };
    extend(this.options, options);

    EventEmitter.call(this);
};

util.inherits(WSServer, EventEmitter);

WSServer.prototype.start = function() {
    this.wsServer = new WebSocketServer({
        port: this.options.port,
        host: this.options.host
    });
};

WSServer.prototype.stop = function() {
    this.wsServer.close();
};

WSServer.prototype.capture = function () {
    var _this = this;

    this.wsServer.on('connection', function connection(wsc) {
        var c = new Connection(wsc);
        _this.emit(WSServerEvents.ON_CONNECTION, c);
    });
};

module.exports = WSServer;

