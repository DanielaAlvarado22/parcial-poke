//import axios from 'axios';
import React from 'react'
import './App.css';
import GetPoke from './pokePromise';



function App() { 
  return (
    <div className="App">
    
        <p>
          {GetPoke()}
        </p>
       
      
    </div>
  );
}

export default App;
