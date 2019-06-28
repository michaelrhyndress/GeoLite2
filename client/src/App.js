import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form method="get" action={`http://${window.location.host}:8081`}>
          <input 
            styles={{
              padding: "0 15px",
              width: "250px",
              height: "36px",
              fontSize: "20px",
              border: "2px solid white"
            }} type="text" placeholder="172.0.0.1" name="ip"/>
          <input type="submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
