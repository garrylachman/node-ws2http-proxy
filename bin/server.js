#!/usr/bin/env node
/**
 * Created by garrylachman_macbook on 17/03/2016.
 */

var program = require('commander'),
    Server = require('../src/server/Server');

program
    .version('0.0.1')
    .option('-h, --proxy-host <proxyhost>', 'HTTP Proxy host')
    .option('-p, --proxy-port <proxyport>', 'HTTP Proxy port')
    .option('-H, --ws-host <wshost>', 'WebSockets host')
    .option('-P, --ws-port <wsport>', 'WebSockets port')
    .parse(process.argv);

var server = new Server({
    proxy: {
        host: program.proxyHost,
        port: program.proxyPort
    },
    ws: {
        host: program.wsHost,
        port: program.wsPort
    }
});
console.log(server);


