import React from 'react';
import AppNavbar from './components/AppNavbar';
import PlayerList from './components/PlayerList';
import FileUpload from './components/FileUpload';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <Provider store={store}>
      <div className="App marginBottom">
        <AppNavbar/>
        <FileUpload/>
        <PlayerList/>
      </div>
    </Provider>
  );


export default App;
