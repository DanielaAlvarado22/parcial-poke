import React from "react";
import { useId,useState, useEffect } from "react";
import { reqPokeApi, wait2SecondsAsync } from "./pokeapi";

const pokeball = 'https://preview.redd.it/iaj86isx9b171.jpg?auto=webp&s=afb915308c3d60a5fec735e03cfdab9ca249ade0'

interface pokemon {
    name: string,
    sprite: string,
    description: string,
    types: Array<pokeType>,
   // evolutionChain: Array<evolutionChain>,
    moves: Array<string>
}

interface pokeType{
    name: string,
    damageData: damageData
}

interface damageData{
    no_damage_to:string, 
    half_damage_to:string, 
    double_damage_to:string, 
    double_damage_from:string
}

interface evolutionChain {
    name: string,
    type: Array<pokeType>
}

function GetPoke(input?:string | null) {
    const [wait, setWait] = useState<any>('waiting...')
    const [poke, setPoke] = useState()
    const [pokemon, setPokemon] = useState<pokemon | null>()
    const [pokeMoves, setPokeMoves] = useState<any>([]);
    const [img, setImg] = useState<string>(pokeball)
    const[pokeName, setPokeName] = useState('')
    
    const pokeTypesArray: Array<pokeType> = []
    const id = useId

    const waitPlease = async (showError: boolean) => {
        try{
            const res = await wait2SecondsAsync(showError)
            setWait(`${res}`)
        } catch(error){ setWait(`catching error... ${error}`)}
        try{
            const input = prompt("Escribe el nombre o id del pokemon")
            //Obteniendo todos los datos
            const {data:{name}} = await reqPokeApi.get(`/pokemon/${input}`)
            setPokeName(name)
            console.log(poke)
            //obteniendo el nombre, la imagen y sus movimientos
           const {data:{types}} = await reqPokeApi.get(`/pokemon/${poke}`)
           const {data:{moves}} = await reqPokeApi.get(`/pokemon/${poke}`)
            //Obteniendo su tipo o tipos
            // const typesNames: string[] = types.map((name:{type:{name: string}})=>name)
            // typesNames.forEach(async type=>{
            //     const {data: {damage_relations: { no_damage_to, half_damage_to, double_damage_to, double_damage_from }}} = await reqPokeApi.get(`/type/${type}`)
            //     const damageData: damageData = {
            //         no_damage_to: no_damage_to.map((name:{name:string;})=>name),
            //         half_damage_to: half_damage_to.map((name:{name:string})=>name),
            //         double_damage_to: double_damage_to.map((name:{name:string})=>name),
            //         double_damage_from: double_damage_from.map((name:{name:string})=>name)
            //     }

            //     const pokeType : pokeType ={
            //         name: type,
            //         damageData: damageData
            //     }
            //     pokeTypesArray.push(pokeType)
            // })
            
           //Obteniendo datos de especie
            const {data: dataSpecies} = await reqPokeApi.get(`/pokemon-species/${poke}`) 
            //Descripcion en ESP
            const {flavor_text_entries} = dataSpecies
            // const {flavor_text} = flavor_text_entries.find( ( desc:{ language: {name:string }})=> name==='es')

            //Cadena evolutiva
            // const {evolution_chain:{url: evo_url}} = dataSpecies
            // const {data: evolution_chain} = await reqPokeApi.get(evo_url)

            //Movimientos
            setPokeMoves(moves)

            // const pokemonSelected : pokemon = {
            //     name: name,
            //     sprite: front_default,
            //     description: flavor_text,
            //     types: pokeTypesArray,
            //     moves: moves
            // }

            // setPokemon(pokemonSelected)
            
            
        }catch({message}){ 
            setWait(message)
        }
    }

     useEffect(()=>{
        waitPlease(false)
        setPoke(poke)
        setPokeMoves(pokeMoves)
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
            <form>
                <fieldset>
                    <legend>Search your Poke</legend>
                    {/* <label htmlFor="poke">Enter Poke name or ID
                        <input
                            type='text'
                            id="id"
                            placeholder='name or id'
                            value={poke}
                            onChange={e => setPoke(e.target.value)}
                        />
                    </label> */}
                    
                </fieldset>
            </form>

            <p> {wait} </p> 
            <p> Pokemons name {JSON.stringify(pokeName)} </p> 
            <img src={img}></img>
           {/*  <p>Pokemon's name: {JSON.stringify(pokemon?.name)}</p> */}
            

            <p> Pokemon's moves:</p>
            <ul>
                {/* {pokeMoves.sort((a: { move: { name: number; }; },b: { move: { name: number; }; }) => (a.move.name > b.move.name) ? 1 : ((b.move.name > a.move.name) ? -1 : 0)).map((move: { move: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; }, i: React.Key | null | undefined) => (
                    <li key={i}>{move.move.name}</li>
                ))}
 */}
                
            </ul>
            
        </div>
    )
    
}

export default GetPoke