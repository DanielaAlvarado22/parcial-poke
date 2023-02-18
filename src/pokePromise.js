import React from "react";
import { useId, useState, useEffect } from "react";
import { reqPokeApi, wait2SecondsAsync } from "./pokeapi";

function GetPoke() {
    const [wait, setWait] = useState('waiting...')
    const [poke, setPoke] = useState('')
    const [pokeName, setPokeName] = useState('...')
    const [pokeTypes, setPokeTypes] = useState([])
    const [pokeData, setPokeData] = useState([])
    const id = useId

    const waitPlease = async (showError) => {
        try{
            const res = await wait2SecondsAsync(showError)
            setWait(`${res}`)
        } catch(error){ setWait(`catching error... ${error}`)}
        try{
            const {data:{name: name}} = await reqPokeApi.get(`/pokemon/${poke}`)
            setPokeName(name)
            /* const {data: {types:types}} = await reqPokeApi.get(`/pokemon/${poke}`)
            setPokeTypes(types) */
            //const {data} = await reqPokeApi.get(`/pokemon-species/${poke}`)
            const {data:{evolution_chain: {url: evo_url}}} = await reqPokeApi.get(`/pokemon-species/${poke}`)
            const {data} = await reqPokeApi.get(evo_url)
            setPokeData(data)
        }catch({message}){ setPokeData(message)}
    }

     useEffect(()=>{
        waitPlease(false)
        setPoke(poke)
    },[]) 

    return (
        <div className='App'
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
            <form onSubmit={waitPlease(false)}>
                <fieldset>
                    <legend>Search your Poke</legend>
                    <label htmlFor="poke">Enter Poke name or ID
                        <input
                    

                            id={id}
                            type='text'
                            placeholder='name or id'
                            value={poke}
                            onInput={e => setPoke(e.target.value)}
                        />
                    </label>
                    <button type='submit'>Reset</button>
                </fieldset>
            </form>
            <p> {wait} </p>
            <p> Pokemon's name: {pokeName} </p>
            {/* <p> Pokemon's type: {pokeTypes} </p> */}
            <p>{JSON.stringify(pokeData)}</p>
            
        </div>
    )
}

export default GetPoke