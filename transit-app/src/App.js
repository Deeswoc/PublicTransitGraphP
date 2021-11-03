import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import './App.css';
import Towns from './Components/FetchedTowns';
import TownForm from './Routes/AddTowns/NewTownForm'
import NewTownFormContextProvider from './Contexts/NewTownFormContext';
import RouteForm from './Routes/AddRoute/NewRouteForm'
import NewRouteFormContextProvider from './Contexts/NewRouteFormContext';
import GetTransit from './Routes/GetTransit/GetTransit';
import GetRoutes from './Routes/GetRoute/GetRoutes';
import GetRoute from './Routes/GetRoute/GetRouteDetailed'
function App() {
  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="https://www.google.com/">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link className="nav-link" to={`/Towns`}>Towns</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to={`/Add-Town`}>Add Towns</Link>
                </li>
                <li class="nav-item dropdown">
                  <Link className="nav-link" to={`/Add-Route`}>Add Route</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to={`/Find-Path`}>Find Path</Link>
                </li>
                <li class="nav-item" to={'/Get-Route'}>
                  <Link className="nav-link" to={`/Get-Routes/:id`}>Get Route</Link>
                </li>
                <li class="nav-item" to={'/Get-Routes'}>
                  <Link className="nav-link" to={`/Get-Routes`}>Get Routes</Link>
                </li>
              </ul>
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>

        <main className="container">
          <div className="row">
            <div className="col">
              <Switch>
                <Route path="/Towns" component={Towns} />
                <Route path="/Add-Town">
                  <NewTownFormContextProvider>
                    <TownForm />
                  </NewTownFormContextProvider>
                </Route>
                <Route path="/Add-Route">
                  <NewRouteFormContextProvider>
                    <RouteForm />
                  </NewRouteFormContextProvider>
                </Route>
                <Route path="/Find-Path" component={GetTransit} />
                <Route path="/Get-Routes/:id" component={GetRoute} />
                <Route path="/Get-Routes" component={GetRoutes} />
              </Switch>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
