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

console.log(`[boop]`);

import WebSocket from 'ws';
import {ServerSent, ServerType} from "@circa/pipe/src/messages";

interface Player {
  authorised: boolean;
  mobileNumber: string | null;
  client: WebSocket
}

const users = new Set<Player>();



const wss = new WebSocket.Server({
  port: 8009,
});

const broadcast = (message: ServerSent) => {
  console.log(`[broadcast]`, message);

  users.forEach((user) => {
    user.client.send(JSON.stringify(message));
  })
};



wss.on('connection', function connection(ws) {
  users.add({
    authorised: false,
    mobileNumber: null,
    client: ws,
  });

  console.log('new player connected!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send(JSON.stringify({"type": "QUEUED", time: Date.now() + (60 * 60 * 5) }));
});

let tick = 1;

setInterval(() => {
  broadcast({ type: ServerType.Tick, count: tick++ });
}, 1000);

