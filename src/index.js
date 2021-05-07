import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StateProvider} from "./pages/state-context.js"
import { BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <StateProvider>
    <App />
    </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


