//import axios from 'axios';
import React from 'react'
import './App.css';
import getPokeName from './pokePromise';



function App() { 
  return (
    <div className="App">
    
        <p>
          {getPokeName()}
        </p>
       
      
    </div>
  );
}

export default App;
