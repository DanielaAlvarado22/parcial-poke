import React from "react";
import { useEffect, useState } from "react";
import { reqPokeApi, wait2SecondsAsync } from "./pokeapi";

function getPoke() {
    const [wait, setWait] = useState('waiting...')
    const [poke, setPoke] = useState('')
    const [pokeData, setPokeData] = useState([])

    const waitPlease = async (showError) => {
        try{
            const res = await wait2SecondsAsync(showError)
            setWait(`${res}`)
        } catch(error){ setWait(`catching error... ${error}`)}
        try{
            const {data} = await reqPokeApi.get(`/pokemon-species/${poke}`)
            setPokeData(data)
        }catch({message}){ setPoke(message)}
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
            <form onSubmit={getPoke}>
                <fieldset>
                    <legend>Search your Poke</legend>
                    <label htmlFor="poke">Enter Poke name or ID
                        <input
                            required
                            name="poke"
                            id="poke"
                            type='text'
                            placeholder='name or id'
                            value={poke}
                            onChange={(e) => setPoke(e.target.value)}
                        />
                    </label>
                    <button type='submit'>Submit</button>
                </fieldset>
            </form>
            <p> {wait} </p>
            <p>{JSON.stringify(pokeData)}</p>
            
        </div>
    )
}

export default getPoke