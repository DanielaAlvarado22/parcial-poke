//import axios from 'axios';
import React from 'react'
import './App.css';
import GetPoke from './pokePromiseJS';



function App() { 
  
  return (
    <div className="App">
      <code>
        <pre>
          {GetPoke()}
        </pre>
      </code>
    </div>
  );
}

export default App;
