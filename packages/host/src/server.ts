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
  startTime: addMinutes(new Date(), 1).toISOString(),
  "questions": [
    {
      "type": "range",
      "range": {
        "from": 0,
        "to": 10000000,
        "step": 2500
      },
      "question": "What is the volume of water in an Olympic swimming pool?",
      "answer": 10000000,
      "unit": "L"
    },
    {
      "type": "range",
      "range": {
        "from": 0,
        "to": 5000,
        "step": 5
      },
      "question": " How long is the Brighton Pier? ",
      "answer": 525,
      "unit": "m"
    },    {
      "type": "range",
      "range": {
        "from": 0,
        "to": 75,
        "step": 0.1
      },
      "question": "Bopper the Whopper is Britain’s ‘fattest dog’ — how heavy is he?",
      "answer": 49.9,
      "unit": "kg"
    },    {
      "type": "range",
      "range": {
        "from": 0,
        "to": 10000,
        "step": 1
      },
      "question": "How much money does Amazon CEO Jeff Bezos earn every second?",
      "answer": 2489,
      "unit": "m"
    },
  ]};

const wss = new WebSocket.Server({
  port: 8009,
});

const host = createHost(wss);

host.addGame(exampleManifest);
