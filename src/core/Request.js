/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var genUUID = require('node-uuid');

function Request(method, url, headers, uuid) {
    this.method = method;
    this.url = url;
    this.headers = headers;
    this.uuid = uuid ? uuid : generateUUID();

    function generateUUID() {
        return genUUID.v4();
    }
};

Request.prototype.addResponseClient = function(p2c) {
    this.p2c = p2c;
};

Request.prototype.toJSON = function() {
    return JSON.stringify({
        method: this.method,
        url: this.url,
        headers: this.headers
    });
};

module.exports = Request;
