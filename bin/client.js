#!/usr/bin/env node
/**
 * Created by garrylachman_macbook on 17/03/2016.
 */

var program = require('commander'),
    Server = require('../src/client/Client');

program
    .version('0.0.1')
    .option('-h, --wss-host <wsshost>', 'WebSocket server host')
    .option('-p, --wss-port <wssport>', 'WebSocket server port')
    .parse(process.argv);

var client = new Client({
    wss: {
        host: program.wssHost,
        port: program.wssPort
    }
});
console.log(client);


