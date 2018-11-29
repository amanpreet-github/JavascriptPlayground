import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/index';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>, rootElement
);


serviceWorker.unregister();
