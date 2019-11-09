import React from 'react';
import ReactDOM from 'react-dom';

console.log('circa 0.1');
console.log(`ENV: ${process.env.NODE_ENV}`);

ReactDOM.render(
  <div>
    <h2>Welcome to</h2>
    <h1>circa</h1>
  </div>,
  document.querySelector('.app'),
);


function createClient() {
  const ws = new WebSocket('ws://localhost:8009');

  ws.addEventListener('message', (e) => {
    console.log(e);
  });
}


createClient();
