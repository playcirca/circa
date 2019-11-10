// connect to client
// give token
// authorise token with auth
// fully client connected. sick.
// wait for game broadcast.
// join "game"
// get questions from store.
// assemble cache manifest.
// questions broadcast.
// save answers, broadcast facts.
// respond with correct answer
// move on. repeat with other questions questions.
// make it tick based.
import WebSocket from 'ws';
const wss = new WebSocket.Server({
  port: 8009,
});
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send('something');
});
//# sourceMappingURL=server.js.map
