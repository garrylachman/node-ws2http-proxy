/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var extend = require('extend'),
    WebSocket = require('ws'),
    RequestPool = require('../core/Pool'),
    PoolEvents = require('../events/PoolEvents');


function Client(options) {

    this.options = {
        wss: {
            host: "127.0.0.1",
            port: 8001
        }
    };
    extend(this.options, options);

    // POOL
    this.requestPool = new RequestPool();
    this.requestPool.on(PoolEvents.NEW_REQUEST, (r) => {
        console.log("--- PoolEvents.NEW_REQUEST: "+r.uuid+"---");
    });

    this.wss = new WebSocket('ws://'+this.options.wss.host + ':' + this.options.wss.port);

    this.wss.on('open', function open() {

    });

    this.wss.on('message', function(data, flags) {
        // flags.binary will be set if a binary data is received.
        // flags.masked will be set if the data was masked.
    });


};

Client.prototype.stop = function(){
    this.wss.close();
};



module.exports = Client;

