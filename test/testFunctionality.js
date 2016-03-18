/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
"use strict"
var Server = require('../src/server/Server'),
    Client = require('../src/client/Client'),
    Connection = require('../src/core/Connection'),
    ProxyServer = require('../src/proxy/ProxyServer'),
    ProxyServerEvents = require('../src/events/ProxyServerEvents'),
    Request = require('../src/core/Request'),
    PoolEvents = require('../src/events/PoolEvents'),
    WebSocket = require('ws'),
    request = require('request');

module.exports = {
    setUp: function (callback) {
        this.serverOptions = {
            proxy: {
                host: "127.0.0.1",
                port: 8002
            },
            ws: {
                host: "127.0.0.1",
                port: 8001
            }
        };

        this.clientOptions = {
            wss: {
                host: "127.0.0.1",
                port: 8001
            }
        };

        function createServer() {
            this.server = new Server(this.serverOptions);
        }

        function createClient() {
            this.client = new Client(this.clientOptions);
        }

        setTimeout(createServer.bind(this), 500);
        setTimeout(createClient.bind(this), 1000);
        setTimeout(callback, 1500)
    },
    tearDown: function (callback) {
        this.client.stop();
        this.server.stop();
        callback();
    },
    testConfigure: function(test) {
        test.equal(this.server.proxyServer.options.host, this.serverOptions.proxy.host, 'Configure proxy host');
        test.equal(this.server.proxyServer.options.port, this.serverOptions.proxy.port, 'Configure proxy port');
        test.equal(this.server.wsServer.options.host, this.serverOptions.ws.host, 'Configure websocket host');
        test.equal(this.server.wsServer.options.port, this.serverOptions.ws.port, 'Configure websocket port');
        test.done();
    },
    testServer: function(test) {
        test.equal(this.server.connections.count(), 1, 'Must be 1 connection');
        test.done();
    },
    testClient: function (test) {
        test.ok(this.client.isConnected(), 'Check if client connected');
        test.done();
    },
    testConnection: function (test) {
        // try 5 times get random connection
        for(let i=0; i<5; i++) {
            let rc = this.server.connections.getRandom();
            test.ok(rc instanceof Connection, 'Random connection #'+i);
            test.ok(rc.uuid.length > 0, 'Connection has uuid #'+i);
            test.ok(rc.conn instanceof WebSocket, 'Connection has WebSocket #'+i);
            test.equal(rc.conn.readyState, WebSocket.OPEN, 'Connection ws readyState is WebSocket.OPEN #'+i);
        }

        var randomConnection = this.server.connections.getRandom();
        test.strictEqual(randomConnection, this.server.connections.get(randomConnection.uuid), 'Get connection by uuid')
        this.server.connections.remove(randomConnection.uuid);
        test.equal(this.server.connections.count(), 0, 'ConnectionManager remove check - must have 0 connections');
        this.server.connections.add(randomConnection.uuid, randomConnection);
        test.equal(this.server.connections.count(), 1, 'ConnectionManager add check - must have 1 connection');

        test.done();
    },
    testRequestGET: function (test) {
        var requestID = undefined;

        this.server.proxyServer.on(ProxyServerEvents.ON_REQUEST, (r) => {
            test.ok(r instanceof Request, "Proxy server receive new request");
            test.ok(r.uuid.length > 0, 'Request has uuid');
            requestID = r.uuid;
        });

        // delay in 100ms to ensure we got already request id
        this.server.requestPool.on(PoolEvents.NEW_REQUEST, (r) => setTimeout(() => {
            test.ok(r instanceof Request, "Request pool receive new request");
            test.ok(r.uuid.length > 0, 'Request has uuid');
            test.equal(r.uuid, requestID, 'Validate same request that proxy receive');
        }, 100));

        this.client.requestPool.on(PoolEvents.NEW_REQUEST, (r) => {
            test.ok(r instanceof Request, "Client request pool receive new request");
            test.ok(r.uuid.length > 0, 'Request has uuid');
            test.equal(r.uuid, requestID, 'Validate same request that proxy receive');
        });

        request({
            method: 'GET',
            uri: 'http://httpbin.org/get',
            proxy: 'http://127.0.0.1:8002',
            timeout: 3000,
        },  (error, response, body) => {

            //test.ifError(error);
            test.equal(this.server.requestPool.count(), 1, "Request pool has 1 request");
            var r = this.server.requestPool.get(requestID);
            test.ok(r instanceof Request, "The request from the pool is instace of Request");

            setTimeout(test.done, 5000);
        });



    }
};
