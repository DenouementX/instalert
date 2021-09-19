import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Header from './components/Header/Header';
import App from './App';
import Settings from './components/Settings/Settings';
import reportWebVitals from './reportWebVitals';

const route = (
    <Router>
        <div>
            <Header />
            <Route path="/" exact component={App} />
            <Route path="/settings" component={Settings} />
        </div>
    </Router>
)

ReactDOM.render(
  route,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
