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
    const [pokeImg, setPokeImg] = useState(pokeball)
<<<<<<< Updated upstream
    const [pokeMoves, setPokeMoves] = useState([])
=======
    const [pokeDesc, setPokeDesc] = useState('...')
    const [pokeTypes, setPokeTypes] = useState([])
    //const [noDamage, setNoDamage] = useState([])
    const [pokeTypeData, setPokeTypeData] = useState([])
    const [pokeType2Data, setPokeType2Data] = useState([])
    
>>>>>>> Stashed changes
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

            //Obteniendo sprite del poke
            const {data: {sprites: {front_default}}} = await reqPokeApi.get(`/pokemon/${poke}`)
            setPokeImg(front_default)

            //obteniendo descripcion en espeanol
            const {data: {flavor_text_entries}} = await reqPokeApi.get(`/pokemon-species/${poke}`)
            const {flavor_text} = flavor_text_entries.find(({language: {name}})=> name==='es')
            setPokeDesc(flavor_text)

<<<<<<< Updated upstream
            const {data:{evolution_chain: {url: evo_url}}} = await reqPokeApi.get(`/pokemon-species/${poke}`)
            const {data} = await reqPokeApi.get(evo_url)

            const {data: {moves}} = await reqPokeApi.get((`/pokemon/${poke}`))

            setPokeMoves(moves)

            setPokeData(data)
=======
            //Obteniendo su tipo o tipos
            const {data: {types}} = await reqPokeApi.get(`/pokemon/${poke}`)
            if(types.length<2){
                const {0: {type: {name}}} = types
                setPokeTypes(name)

                const {data: {damage_relations:{no_damage_to, double_damage_to, half_damage_to, double_damage_from}}} = await reqPokeApi.get(`/type/${name}`)
                const noDmg = no_damage_to.map(({name})=>name)
                const doubleDmgto = double_damage_to.map(({name})=>name)
                const halfDmgTo = half_damage_to.map(({name})=>name)
                const doubleDmgFrom = double_damage_from.map(({name})=>name)
                const pokeType = {
                    name: name,
                    no_damage_to: noDmg,
                    half_damage_to: halfDmgTo,
                    double_damage_to: doubleDmgto,
                    double_damage_from: doubleDmgFrom
                }
                setPokeTypeData(pokeType)
            }else{
                const {0: {type: {name}}, 1:{type:{name:name2}}} = types
                setPokeTypes( `${name}, ${name2}`)

                const {data: {damage_relations:{no_damage_to, double_damage_to, half_damage_to, double_damage_from}}} = await reqPokeApi.get(`/type/${name}`)
                const pokeType = {
                    name: name,
                    no_damage_to: no_damage_to.map(({name})=>name),
                    half_damage_to: double_damage_to.map(({name})=>name),
                    double_damage_to: half_damage_to.map(({name})=>name),
                    double_damage_from: double_damage_from.map(({name})=>name)
                }
                setPokeTypeData(pokeType)

                const {data: {damage_relations:{no_damage_to:ndt, double_damage_to:ddt, half_damage_to:hdt, double_damage_from:ddf}}} = await reqPokeApi.get(`/type/${name2}`)
                const pokeType2 = {
                    name: name2,
                    no_damage_to: ndt.map(({name})=>name),
                    half_damage_to: hdt.map(({name})=>name),
                    double_damage_to: ddt.map(({name})=>name),
                    double_damage_from: ddf.map(({name})=>name)
                }
                setPokeType2Data(pokeType2)
                
            }

            

            // const {data:{evolution_chain: {url: evo_url}}} = await reqPokeApi.get(`/pokemon-species/${poke}`)
            // const {data} = await reqPokeApi.get(evo_url)
            // setPokeData(data)
>>>>>>> Stashed changes
        }catch({message}){ 
            
            setPokeTypes()
            setPokeImg(pokeball)
        }
    }

     useEffect(()=>{
       // waitPlease(false)
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
                            onChange={e => setPoke(e.target.value)}
                        />
                    </label>
                    
                </fieldset>
            </form>
            <p> {wait} </p>
             <p> Pokemon's name: {pokeName} </p>
            <img src={pokeImg} alt='Pokemon sprite...'
            ></img>
<<<<<<< Updated upstream
            <p> Pokemon's name: {pokeName} </p>
            <p> Pokemon's type: {JSON.stringify(pokeTypes)} </p>
            <p> Pokemon's moves:</p>
            <ul>
                {pokeMoves.sort((a,b) => (a.move.name > b.move.name) ? 1 : ((b.move.name > a.move.name) ? -1 : 0)).map((move, i) => (
                    <li key={i}>{move.move.name}</li>
                ))}

                
            </ul>
            
            
            
=======
>>>>>>> Stashed changes
            <p> {JSON.stringify(pokeDesc)} </p>
            <p> Pokemon's type: {JSON.stringify(pokeTypes)} </p>
            <fieldset>
                <p>For {pokeTypeData.name}</p>
                <p>No damage to: {JSON.stringify(pokeTypeData.no_damage_to)}</p>
                <p>Half damage to: {JSON.stringify(pokeTypeData.half_damage_to)}</p>
                <p>Double damage to: {JSON.stringify(pokeTypeData.double_damage_to)}</p>
                <p>Double damage from: {JSON.stringify(pokeTypeData.double_damage_from)}</p>
            </fieldset>
            
            
        </div>
    )
    
}

export default GetPoke