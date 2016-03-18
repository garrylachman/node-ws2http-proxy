/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
"use strict"
var RequestItem = require('../core/Request'),
    ResponseItem = require('../core/Response'),
    request = require('request'),
    extend = require('extend');

class Executer {
    constructor() {
        this.defaultRequest = {
            timeout: 30000
        };
    }
    execute(req) {
        let options = {};
        extend(options, this.defaultRequest, {
            method: req.method,
            url: req.url,
            headers: req.headers
        });

        return new Promise( (resolve, reject) => {
            request(options, (error, response, body) => {
                try {
                    resolve(new ResponseItem(req, response.statusCode, response.headers, body));
                } catch (er) {
                    // General error if we dont have valid response
                    reject(new ResponseItem(req, 400, {}, ""));
                }
            });
        });
    }
}

module.exports = Executer;