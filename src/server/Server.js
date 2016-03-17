var extend = require('extend'),
    ProxyServer = require('../proxy/ProxyServer'),
    ProxyServerEvents = require('../events/ProxyServerEvents'),
    WSServer = require('../ws/WSServer'),
    WSServerEvents = require('../events/WSServerEvents'),
    RequestPool = require('../core/Pool'),
    Connection = require('../core/Connection'),
    ConnectionsManager = require('../core/ConnectionsManager'),
    PoolEvents = require('../events/PoolEvents'),
    Transmitter = require('../transmission/Transmitter'),
    RequestPoolDriver = require('../transmission/drivers/RequestPoolDriver'),
    WSDriver = require('../transmission/drivers/WSDriver');


function Server(options) {

    this.options = {
        proxy: {},
        ws: {}
    };
    extend(this.options, options);

    // POOL
    this.requestPool = new RequestPool();
    this.requestPool.on(PoolEvents.NEW_REQUEST, (r) => {
        console.log("--- PoolEvents.NEW_REQUEST: "+r.uuid+"---");
    });

    // CONNECTIONS
    this.connections = new ConnectionsManager();

    // PROXY
    this.proxyServer = new ProxyServer(this.options.proxy);
    this.proxyServer.start();
    this.proxyServer.capture();
    this.proxyServer.on(ProxyServerEvents.ON_REQUEST, (r) => {
        console.log("--- ProxyServerEvents.ON_REQUEST: "+r.uuid+"---");
        this.requestPool.add(r.uuid, r);
    });

    // WS
    this.wsServer = new WSServer(this.options.ws);
    this.wsServer.start();
    this.wsServer.capture();
    this.wsServer.on(WSServerEvents.ON_CONNECTION, (c) => {
        console.log("--- WSServerEvents.ON_CONNECTION: "+c.uuid+"---");
        this.connections.add(c.uuid, c);
    });

    this.transmitter = new Transmitter(
        new RequestPoolDriver(this.requestPool),
        new WSDriver(this.connections)
    );

};

Server.prototype.stop = function(){
    this.proxyServer.stop();
    this.wsServer.stop();
};



module.exports = Server;

