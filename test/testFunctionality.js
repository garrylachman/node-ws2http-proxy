/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var Server = require('../src/server/Server'),
    Client = require('../src/client/Client');

module.exports = {
    setUp: function (callback) {
        // setup
        this.server = new Server({
            proxy: {
                host: "127.0.0.1",
                port: 8002
            },
            ws: {
                host: "127.0.0.1",
                port: 8001
            }
        });
        this.client = undefined;

        setTimeout(callback, 1000);
    },
    tearDown: function (callback) {
        // clean up
        this.server.stop();
        this.client.stop();
        callback();
    },
    testClient: function (test) {
        var _this = this;

        this.client = new Client({
            wss: {
                host: "127.0.0.1",
                port: 8001
            }
        });

        setTimeout(function(){
            test.equal(_this.server.connections.count(), 1, 'Must be 1 connection');
            test.done();
        },1000);


    }
};
