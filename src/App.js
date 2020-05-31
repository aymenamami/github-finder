import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Home from './components/pages/home';
import User from './components/users/User';
import './App.css';
class App extends Component {
    render() {
        return (
            <Router>
                <div className='App'>
                    <Navbar />
                    <div className='container'>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' component={User} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
