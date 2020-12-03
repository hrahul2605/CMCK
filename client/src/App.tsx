import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Landing, Room } from './components';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/:roomID' component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
