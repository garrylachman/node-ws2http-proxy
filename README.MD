# node-ws2http-proxy #

Http server over http websockets to avoid NATs.

1. Server - the server contains 2 servers. Http proxy server and WebSockets server.
the proxy node (client) connects to the websocket server and wait for work.
the proxy servers act as load balancer, he handle the http proxy request and forward it to
random proxy node via WebSockets.

2. Client - the client is the real proxy node that performe the request,
the client connect to the server and wait for work.

## flow ###
Request -> Proxy Server (server) -> Select connection (ws) -> Client (ws) execute request -> return the response via (ws) -> response to the cliet (http)