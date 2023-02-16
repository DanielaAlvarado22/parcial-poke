import axios from 'axios';
import { useEffect,useState } from 'react';
import './App.css';



function App() {
  
  const [ poke, setPoke ] = useState([]);  
  const getPoke = async(pokeName) => {
    try{
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      let data = res.data;
      setPoke(data)
    }catch(error) {console.error(error)}
  }

  useEffect(  () => {
    const value = prompt('Escribe el id o nombre del pokemon');
    
   getPoke(value)
  },[]);

  return (
    <div className="App">
    
        <p>
        {JSON.stringify(poke, null, 2)} 
        </p>
       
      
    </div>
  );
}

export default App;
