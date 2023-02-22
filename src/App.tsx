//import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './App.css';
import { pokeType, damageData, evolutionChain, pokeball, toPretty, chainToPretty } from './pokePromise';
import { reqPokeApi, wait2SecondsAsync } from "./pokeapi";

function App() {
  const [wait, setWait] = useState<string | any>('waiting...')
  const [pokeName, setPokeName] = useState<string|any>()
  const [pokeSprite, setPokeSprite] = useState<string>(pokeball)
  const [pokeText, setPokeText] = useState<string | null>()
  const [pokeTypes, setPokeTypes] = useState<string[]>()
  const [pokeDamageData, setPokeDamageData] = useState<string[]>()
  const [pokeMoves, setPokeMoves] = useState<string>()
  const [evoCahin, setEvoChain] = useState<string[]>()

  const pokeTypesData: pokeType[] = []
  const evolutionChainData: evolutionChain[] = []

  const getPoke = async () => {
    setWait('waiting...')
    try {
      const inputPoke = prompt('Enter Pokemons name or id');
      if (inputPoke === null) {
        const waiting = await wait2SecondsAsync()
        setWait(waiting)
        setPokeName('Pls enter a name or id')
        setPokeSprite(pokeball)
        setPokeText('')
        setPokeTypes([''])
        setPokeDamageData([''])
        setPokeMoves('')
      }
      else {
        //Obteniendo datos de pokemon
        await wait2SecondsAsync()
        const { data } = await reqPokeApi.get(`/pokemon/${inputPoke}`)
        setWait('Search complete.')
        //Desconstruyendo datos
        const { name, sprites: { front_default }, types, moves } = data
        //obteniendo tipos
        const typesNames: string[] = types.map((poke: { type: { name: string } }) => poke.type.name)
        
        typesNames.forEach(async type => {
          const { data: { damage_relations: { no_damage_to, half_damage_to, double_damage_to, double_damage_from } } } = await reqPokeApi.get(`/type/${type}`)
          const damageData: damageData = {
            no_damage_to: no_damage_to.map((type: { name: string; }) => type.name),
            half_damage_to: half_damage_to.map((type: { name: string }) => type.name),
            double_damage_to: double_damage_to.map((type: { name: string }) => type.name),
            double_damage_from: double_damage_from.map((type: { name: string }) => type.name)
          }
          const typeData: pokeType = {
            name: type,
            damageData: damageData
          }
          pokeTypesData.push(typeData)

        })
        const orderedMoves = moves.sort((moveA: { move: { name: string } }, moveB: { move: { name: string } }) => {
          if (moveA.move.name > moveB.move.name) return 1
          if (moveA.move.name < moveB.move.name) return -1
          return 0
        })
        const orderedNamesMoves = orderedMoves.map((poke: { move: { name: string } }) => poke.move.name)

        const { data: dataSpecies } = await reqPokeApi.get(`/pokemon-species/${inputPoke}`)
        const { flavor_text_entries } = dataSpecies
        const { flavor_text } = flavor_text_entries.find((desc: { language: { name: string } }) => desc.language.name === 'es')

        const {evolution_chain:{url:evo_url}} = dataSpecies
        const {data:{chain}} = await reqPokeApi.get(evo_url)
        let first = chain.species.name
        
        if(first){
          const { data:{types} } = await reqPokeApi.get(`/pokemon/${first}`)
          const typesNames: string[] = types.map((poke: { type: { name: string } }) => poke.type.name)
          const slaveChain: evolutionChain ={
            name:first,
            type: typesNames
          }
          evolutionChainData.push(slaveChain)
        }
        let second = chain.evolves_to
        if(second[0]){
          let secondName = second[0].species.name
          const { data:{types} } = await reqPokeApi.get(`/pokemon/${secondName}`)
          const typesNames: string[] = types.map((poke: { type: { name: string } }) => poke.type.name)
          const slaveChain2: evolutionChain ={
            name:secondName,
            type: typesNames
          }
          evolutionChainData.push(slaveChain2)
          let third = second[0].evolves_to
          if(third.species){
            
            let thirdName = third[0].species.name
            if(thirdName){
              const { data:{types} } = await reqPokeApi.get(`/pokemon/${thirdName}`)
              const typesNames: string[] = types.map((poke: { type: { name: string } }) => poke.type.name)
              const slaveChain3: evolutionChain ={
                name:thirdName,
                type: typesNames
              }
              evolutionChainData.push(slaveChain3)
            }
            
          }
          
        }
        
        setPokeName(JSON.stringify(name))
        setPokeSprite(front_default)
        setPokeText(flavor_text)
        setPokeTypes(typesNames)
        typesNames.length < 2 ? setPokeDamageData([toPretty(pokeTypesData[0])]) : setPokeDamageData([toPretty(pokeTypesData[0]), toPretty(pokeTypesData[1])])
        if(evolutionChainData.length===1){
          setEvoChain([chainToPretty(evolutionChainData[0])])
        }
        if(evolutionChainData.length===2){
          setEvoChain([chainToPretty(evolutionChainData[0]),chainToPretty(evolutionChainData[1])])
        }
        if(evolutionChainData.length===3){
        setEvoChain([chainToPretty(evolutionChainData[0]),chainToPretty(evolutionChainData[1]),chainToPretty(evolutionChainData[2])])
        }

        setPokeMoves(JSON.stringify(orderedNamesMoves, null, 2))
      }
    } catch ({ message }) { 
      setWait(message)
      setPokeSprite(pokeball)
      setPokeName("")
      setPokeText("")
      setPokeTypes([""])
      setPokeDamageData([""])
      setEvoChain([""])
      setPokeMoves("")
      }

  }


  useEffect(() => {
    wait2SecondsAsync()

  }, [])

  return (
    <div className="App"
      style={{
        background: '#EEE',
        padding: '5%',
        fontFamily: '"Lucida Console", Monaco, monospace'
      }}>
      <h1
        style={{
          background: 'red',
          color: 'white',
          padding: '1rem',
          display: 'inline-block'
        }}>Pokemon Selector</h1>
      <h2>Analyze the type of your favorite Pokemon!</h2>
      <button onClick={getPoke}>Click to start</button>
      <code>
        <pre>
          <p>{wait}</p>
          <p>{pokeName}</p>
          <img src={pokeSprite}></img>
          <p>{pokeText}</p>
          <p>Pokemon's types {JSON.stringify(pokeTypes)}</p>
          <fieldset>{pokeDamageData}</fieldset>
          <p>Evolution chain: {evoCahin}</p>
          <p> Pokemon's possible moves: {pokeMoves}</p>

        </pre>
      </code>
    </div>
  );
}

export default App;
