import React from 'react';
import AppNavbar from './components/AppNavbar';
import PlayerList from './components/PlayerList';
import FileUpload from './components/FileUpload';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <Provider store={store}>
      <Router>
        <div className="App marginBottom">
          <AppNavbar/>
          <Switch>
            <Route path="/" exact component={PlayerList}/>
            <Route path='/upload' component={FileUpload}/>   
          </Switch>   
        </div>
      </Router>
    </Provider>
  );


export default App;
