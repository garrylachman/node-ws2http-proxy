/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
"use strict"
class Response {
    constructor(req, statusCode, headers, body) {
        this.req = req;
        this.statusCode = statusCode;
        this.headers = headers;
        this.body = body;
        this.uuid = req.uuid;
    }
    toJSON() {
        return JSON.stringify({
            uuid: this.uuid,
            statusCode: this.method,
            headers: this.headers,
            body: new Buffer(this.body).toString('base64'),
            request: this.req.toJSON()
        });
    }
    static fromJSON(str) {
        let json = JSON.parse(str);
        //return new Request(json.method, json.url, json.headers, json.uuid);
    }
};

module.exports = Response;
