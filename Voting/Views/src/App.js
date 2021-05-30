import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Common/Auth';
import FullName from './components/Common/FullName';
import Main from './components/Common/Main';
import Navbar from './components/Common/Navbar';
import Results from './components/Common/Results';
import Vote from './components/Common/Vote';
import Participants from './components/Starosta/Participants';
import Users from './components/Starosta/Users';
import Votings from './components/Starosta/Votings';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Auth} />
          <Route path="/main">
            <FullName />
            <Navbar />
            <Switch>
              <Route exact path="/main" component={Main}/>
              <Route exact path="/main/:id/participants" component={Participants}/>
              <Route exact path="/main/:id/vote" component={Vote}/>
              <Route exact path="/main/:id/results" component={Results}/>
              <Route exact path="/main/starosta/votings" component={Votings}/>
              <Route exact path="/main/starosta/users" component={Users}/>
            </Switch>
          </Route>
        </Switch>
      </div>
    );
  }
}
