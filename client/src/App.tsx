import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Landing, Room } from './components';

const App: React.FC = (): JSX.Element => {
  console.log('rendered');
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/:roomID' component={Room} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
