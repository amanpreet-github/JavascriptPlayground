import React from "react";

import {BrowserRouter as Router, Route, Link} from "react-router-dom";

const Index = () => <h1> Home </h1>;
const About = () => <h1> About</h1>;
const User = () => <h1> User</h1>;

const AppRouter = () => (
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
            <Route path="/" exact component={Index}/>
            <Route path="/about" component={About}/>
            <Route path="/users" component={User}/>
        </div>
    </Router>
);

export default AppRouter;