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

interface Player {
  authorised: boolean;
  mobileNumber: string | null;
  client: WebSocket
}

const users = new Set<Player>();

const wss = new WebSocket.Server({
  port: 8009,
});

wss.on('connection', function connection(ws) {
  users.add({
    authorised: false,
    mobileNumber: null,
    client: ws,
  });

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
