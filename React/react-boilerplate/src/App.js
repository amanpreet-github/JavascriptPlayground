import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/index';

class App extends Component {
    render() {
        return (
            <AppRouter/>
        );
    }
}

export default App;
