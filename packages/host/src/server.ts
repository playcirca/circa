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
import {addMinutes} from 'date-fns';

console.log(`[boop]`);

import WebSocket from 'ws';
import {createHost} from "./host";
import {GameManifest} from "./types";

const exampleManifest: GameManifest = {
  name: 'Example Game!',
  startTime: addMinutes(new Date(), 5).toISOString(),
  "questions": [
    {
      "type": "range",
      "range": {
        "from": 0,
        "to": 2000,
        "step": 0.5
      },
      "question": "How long is Brighton Pier?",
      "answer": 733.5,
      "unit": "m"
    },
    {
      "type": "range",
      "range": {
        "from": 0,
        "to": 1000,
        "step": 1
      },
      "question": "How tall is the i360?",
      "answer": 130,
      "unit": "m"
    }
  ]};

const wss = new WebSocket.Server({
  port: 8009,
});

const host = createHost(wss);

host.addGame(exampleManifest);
