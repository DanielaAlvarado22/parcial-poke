import React from "react";
import { useId, useState, useEffect } from "react";
import { reqPokeApi, wait2SecondsAsync } from "./pokeapi";
//#region url imgs
const pokeball = 'https://preview.redd.it/iaj86isx9b171.jpg?auto=webp&s=afb915308c3d60a5fec735e03cfdab9ca249ade0'

//#endregion
function GetPoke() {
    const [wait, setWait] = useState('waiting...')
    const [poke, setPoke] = useState('')
    const [pokeName, setPokeName] = useState('...')
    const [pokeTypes, setPokeTypes] = useState([])
    const [pokeDesc, setPokeDesc] = useState('...')
    const [pokeData, setPokeData] = useState([])
    const [pokeImg, setPokeImg] = useState(pokeball)
    const id = useId
    
    const waitPlease = async (showError) => {
        try{
            const res = await wait2SecondsAsync(showError)
            setWait(`${res}`)
        } catch(error){ setWait(`catching error... ${error}`)}
        try{
            //Obteniendo el nombre del pokemon
            const {data:{name}} = await reqPokeApi.get(`/pokemon/${poke}`)
            setPokeName(name)
            //Obteniendo su tipo o tipos
            const {data: {types}} = await reqPokeApi.get(`/pokemon/${poke}`)
            if(types.length<2){
                const {0: {type: {name}}} = types
                setPokeTypes(name)
            }else{
                const {0: {type: {name}}, 1:{type:{name:name2}}} = types
                setPokeTypes( `${name}, ${name2}`)
            }
            
            const {data: {sprites: {front_default}}} = await reqPokeApi.get(`/pokemon/${poke}`)
            setPokeImg(front_default)

            /* const {data: {flavor_text_entries: {6: {flavor_text}}}} = await reqPokeApi.get(`/pokemon-species/${poke}`)
            setPokeDesc(flavor_text) */
            const {data: {flavor_text_entries}} = await reqPokeApi.get(`/pokemon-species/${poke}`)
            const {flavor_text} = flavor_text_entries.find(({language: {name}})=> name==='es')
            setPokeDesc(flavor_text)

            const {data:{evolution_chain: {url: evo_url}}} = await reqPokeApi.get(`/pokemon-species/${poke}`)
            const {data} = await reqPokeApi.get(evo_url)
            setPokeData(data)
        }catch({message}){ 
            setPokeData(message)
            setPokeTypes()
            setPokeImg(pokeball)
        }
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
                    
                </fieldset>
            </form>
            <p> {wait} </p>
            <img src={pokeImg} alt='Pokemon sprite...'
            ></img>
            <p> Pokemon's name: {pokeName} </p>
            <p> Pokemon's type: {JSON.stringify(pokeTypes)} </p>
            <p> {JSON.stringify(pokeDesc)} </p>
            <p>{JSON.stringify(pokeData, null, 2)}</p>
            
        </div>
    )
}

export default GetPoke