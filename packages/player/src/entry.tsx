import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./components/App";



console.log('circa 0.1');
console.log(`ENV: ${process.env.NODE_ENV}`);

ReactDOM.render(
  <App />,
  document.querySelector('.app'),
);
