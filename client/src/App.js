import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import PlayerList from './components/PlayerList';
import FileUpload from './components/FileUpload';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar/>
          <Switch>
            <Route path="/" exact component={PlayerList}/>
            <Route path='/upload' component={FileUpload}/>   
          </Switch>
          <footer class="page-footer footer-container">
            <div class="footer-copyright text-center py-3 footer-content">
              Created by: <a href="https://valada.cz/" target="_blank">valada.cz</a> | <a href="https://github.com/val0065/dkp" target="_blank">Github</a>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
    );
  }
}


export default App;
