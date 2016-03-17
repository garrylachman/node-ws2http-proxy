var extend = require('extend'),
    HttpProxyServer = require('http-proxy-server'),
    RequestItem = require('../core/Request'),
    ProxyServerEvents = require('../events/ProxyServerEvents'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;


function ProxyServer(options) {
    this.options = {
        host: '0.0.0.0',
        port: 8080
    };
    extend(this.options, options);

    EventEmitter.call(this);

    this.proxyServer = new HttpProxyServer();
};

util.inherits(ProxyServer, EventEmitter);

ProxyServer.prototype.start = function() {
    this.proxyServer.listen(this.options.port, this.options.host);
};

ProxyServer.prototype.stop = function() {
    this.proxyServer.close();
};

ProxyServer.prototype.capture = function () {
    var _this = this;
    this.proxyServer.use(function(c2pRequest, p2cResponse) {

        var r = new RequestItem(c2pRequest.method, c2pRequest.url, c2pRequest.headers);
        r.addResponseClient(p2cResponse);

        _this.emit(ProxyServerEvents.ON_REQUEST, r);
    });
};

module.exports = ProxyServer;

