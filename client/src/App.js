import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
    return (
        <Router>
            <Route path="/" exact render = {(props) => (
                <Join {...props}/>
            )} />
            <Route path="/chat" render = {(props) => (
                <Chat {...props} />
            )} />
        </Router>
    );
};

export default App;