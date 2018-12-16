import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css'
import { ActionCableProvider } from 'react-actioncable-provider'


const store = createStore(reducer, applyMiddleware(thunk))




ReactDOM.render(<ActionCableProvider url='ws://https://kickseries-app-api.herokuapp.com/cable'><Provider store={store}><App /></Provider></ActionCableProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
