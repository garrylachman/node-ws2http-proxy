/**
 * Created by garrylachman_macbook on 17/03/2016.
 */
var genUUID = require('node-uuid');

function Connection(conn, uuid) {
    this.conn = conn;
    this.uuid = uuid ? uuid : generateUUID();

    function generateUUID() {
        return genUUID.v4();
    }
};

module.exports = Connection;
