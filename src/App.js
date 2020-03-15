import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style.css';
import Home from './Home';
import Image from './Image';
import Settings from './Settings';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/image" component={Image} exact />
                    <Route path="/settings" component={Settings} exact />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
