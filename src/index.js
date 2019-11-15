import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import UserLogin from './components/usuario/UserLogin';
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <div className="App">
    <UserLogin />
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
