/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var extend = require('extend'),
    WebSocket = require('ws'),
    RequestPool = require('../core/Pool'),
    PoolEvents = require('../events/PoolEvents'),
    RequestItem = require('../core/Request'),
    Executer = require('../execute/Executer');


function Client(options) {

    this.options = {
        wss: {
            host: "127.0.0.1",
            port: 8001
        }
    };
    extend(this.options, options);

    this.executer = new Executer();

    // POOL
    this.requestPool = new RequestPool();
    this.requestPool.on(PoolEvents.NEW_REQUEST, (r) => {
        console.log("--- client :: PoolEvents.NEW_REQUEST: "+r.uuid+"---");
        this.executer.execute(r)
            .then(
                (res) => {
                    console.log(res.toJSON());
                },
                (error) => {
                    console.log(error);
                }
            );
    });

    this.wss = new WebSocket('ws://'+this.options.wss.host + ':' + this.options.wss.port);

    this.wss.on('open', function open() {

    });

    this.wss.on('message', (data, flags) => {
        // flags.binary will be set if a binary data is received.
        // flags.masked will be set if the data was masked.
        var req = RequestItem.fromJSON(data);
        this.requestPool.add(req.uuid, req);
    });
};

Client.prototype.stop = function(){
    this.wss.close();
};

Client.prototype.isConnected = function() {
    return this.wss.readyState == WebSocket.OPEN;
};

module.exports = Client;

