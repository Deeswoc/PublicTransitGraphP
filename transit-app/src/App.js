import React from 'react';
import logo from './logo.svg';
import './App.css';
import './TownTable'
import TownTable from './TownTable';
let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
 DEV_URL = 'http://localhost:3000';
}

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>

    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <TownTable />
    // </div>
    <TownTable />
  );
}

export default App;
