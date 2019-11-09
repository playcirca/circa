import React from 'react';
import ReactDOM from 'react-dom';
import {Welcome} from "./components/Welcome";



console.log('circa 0.1');
console.log(`ENV: ${process.env.NODE_ENV}`);

ReactDOM.render(
  <Welcome />,
  document.querySelector('.app'),
);


function createClient() {
  const ws = new WebSocket('ws://localhost:8009');

  ws.addEventListener('message', (e) => {
    console.log(e);
  });
}


createClient();
