import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import './App.css';
import './TownTable'
import TownTable from './TownTable';
import TownForm from './NewTownForm'
import NewTownFormContextProvider from './Contexts/NewTownFormContext';


const Towns = () => (
  <TownTable/>
)


function App() {
  return (  
    <Router>
      <div>
        <aside>
          <Link to={`/Towns`}>Towns</Link>
          <Link to={`/Add-Town`}>Add Towns</Link>
        </aside>

        <main>
          <Route path="/Towns" component = {Towns}/>
          <Route path="/Add-Town">
            <NewTownFormContextProvider>
              <TownForm/>
            </NewTownFormContextProvider>
          </Route>
        </main>
      </div>
    </Router>
  );
}

export default App;
