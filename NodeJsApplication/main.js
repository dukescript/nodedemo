var ipaddress = 'localhost';
var port = 8085;

const WebSocket = require('ws');

var WebSocketServer = WebSocket.Server
  , wss = new WebSocketServer({host:ipaddress, port:port});

wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
        console.log('send response');
      client.send(data);
    }
  });
};

// use like this:
wss.on('connection', function(ws) {
  
  ws.on('message', function(message) {
      console.log('received message '+message);
      wss.broadcast("{message: 'message from server'}");
  });
});