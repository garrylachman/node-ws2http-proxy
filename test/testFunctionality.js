/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
"use strict"
var Server = require('../src/server/Server'),
    Client = require('../src/client/Client'),
    Connection = require('../src/core/Connection'),
    WebSocket = require('ws');

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
    testRequest: function (test) {
        test.equal(1,1,"1");
        test.done();
    }
};
