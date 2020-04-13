import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ClientMapProvider } from './components/ClientMapContext';
import { IntlProvider } from 'react-intl';
ReactDOM.render(<IntlProvider locale="en"><ClientMapProvider><App /></ClientMapProvider></IntlProvider>, document.getElementById('root'));


serviceWorker.unregister();
