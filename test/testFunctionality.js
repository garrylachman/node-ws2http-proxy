/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var Server = require('../src/server/Server');

module.exports = {
    setUp: function (callback) {
        this.foo = 'bar';

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

        setTimeout(callback, 1000);
    },
    tearDown: function (callback) {
        // clean up
        this.server.stop();
        callback();
    },
    test1: function (test) {
        test.equals(this.foo, 'bar');
        test.done();
    }
};
