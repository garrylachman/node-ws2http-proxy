var extend = require('extend'),
    ProxyServer = require('../proxy/ProxyServer'),
    ProxyServerEvents = require('../events/ProxyServerEvents'),
    RequestPool = require('../core/Pool'),
    PoolEvents = require('../events/PoolEvents');


function Server(options) {

    this.options = {
        proxy: {},
        ws: {}
    };
    extend(this.options, options);

    this.requestPool = new RequestPool();
    this.requestPool.on(PoolEvents.NEW_REQUEST, (r) => {
        console.log("--- PoolEvents.NEW_REQUEST: "+r.uuid+"---");
    });

    this.proxyServer = new ProxyServer(this.options.proxy);
    this.proxyServer.start();
    this.proxyServer.capture();

    this.proxyServer.on(ProxyServerEvents.ON_REQUEST, (r) => {
        console.log("--- ProxyServerEvents.ON_REQUEST: "+r.uuid+"---");
        this.requestPool.add(r.uuid, r);
    });

};



module.exports = Server;

