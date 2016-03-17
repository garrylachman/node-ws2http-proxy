/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
"use strict"
var genUUID = require('node-uuid');

class Request {
    constructor(method, url, headers, uuid) {
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.uuid = uuid ? uuid : this.generateUUID();
    }
    generateUUID() {
        return genUUID.v4();
    }
    addResponseClient(p2c) {
        this.p2c = p2c;
    }
    toJSON() {
        return JSON.stringify({
            method: this.method,
            url: this.url,
            headers: this.headers,
            uuid: this.uuid
        });
    }
    static fromJSON(str) {
        let json = JSON.parse(str);
        return new Request(json.method, json.url, json.headers, json.uuid);
    }
};

module.exports = Request;
