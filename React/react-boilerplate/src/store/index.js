import {createStore, applyMiddleware} from 'redux';

import createSagaMiddleware from 'redux-saga'

import reducer from './allReducers'

import rootSaga from './sagas'



const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
);


sagaMiddleware.run(rootSaga);


export default store;