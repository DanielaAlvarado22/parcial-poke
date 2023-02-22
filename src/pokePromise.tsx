import React from "react";

export const pokeball = 'https://preview.redd.it/iaj86isx9b171.jpg?auto=webp&s=afb915308c3d60a5fec735e03cfdab9ca249ade0'

export interface pokemon {
    name: string,
    sprite: string,
    //description: string,
    //types: Array<pokeType>,
   // evolutionChain: Array<evolutionChain>,
    //moves: Array<string>
}

export interface pokeType{
    name: string,
    damageData: damageData
}

export interface damageData{
    no_damage_to:string, 
    half_damage_to:string, 
    double_damage_to:string, 
    double_damage_from:string
}

export interface evolutionChain {
    name: string,
    type: Array<string>
}



export const toPretty = (pokeType: pokeType)=>{
    return(
      `
        For type: ${pokeType.name}
        No damage to: ${pokeType.damageData.no_damage_to}
        1/2 damage to: ${pokeType.damageData.half_damage_to}
        2x damage to: ${pokeType.damageData.double_damage_to}
        2x damage from: ${pokeType.damageData.double_damage_from}
        
        `
    )
  }

export const chainToPretty = (chain: evolutionChain)=>{
    if(chain.type.length<2){
        return(
        `
            ${chain.name} - ${chain.type[0]}
        `
    )
    }else{
        return(
        `
            ${chain.name} - ${chain.type[0]}, ${chain.type[1]}
        `)
    }
    
}
