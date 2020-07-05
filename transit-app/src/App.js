import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import './App.css';
import Towns from './Components/FetchedTowns';
import TownForm from './Routes/AddTowns/NewTownForm'
import NewTownFormContextProvider from './Contexts/NewTownFormContext';
import RouteForm from './Routes/AddRoute/NewRouteForm'
import NewRouteFormContextProvider from './Contexts/NewRouteFormContext';

function App() {
  return (  
    <Router>
      <div>
        <aside>
          <Link to={`/Towns`}>Towns</Link>
          <Link to={`/Add-Town`}>Add Towns</Link>
          <Link to={`/Add-Route`}>Add Route</Link>
        </aside>

        <main>
          <Route path="/Towns" component = {Towns}/>
          <Route path="/Add-Town">
            <NewTownFormContextProvider>
              <TownForm/>
            </NewTownFormContextProvider>
          </Route>
          <Route path="/Add-Route">
            <NewRouteFormContextProvider>
              <RouteForm/>
            </NewRouteFormContextProvider>
          </Route>
        </main>
      </div>
    </Router>
  );
}

export default App;
