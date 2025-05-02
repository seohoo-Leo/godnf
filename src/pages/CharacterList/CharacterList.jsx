import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CharacterSearch from '../Homepage/components/CharacterSearch'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCharacter } from '../../hooks/useCharacter'
import "../CharacterList/CharacterList.style.css"
import CharacterCard from './components/CharacterCard'

const CharacterList = ({selectedName,selectedServer,selectedServerId,setSelectedName,setSelectedServer,setSelectedServerId}) => {

    const [query,setQuery] =useSearchParams();
    const server = query.get("serverId");
    const Name = query.get("characterName");
    const navigate = useNavigate();
    const {data, isLoding } = useCharacter(server,Name);

    
    if(isLoding){
        <h1>Loding....</h1>
    }
    
    const gohome=()=>{
       navigate('/')
    }

    

        
  return (
    <Container >
        <div className="nav-section" onClick={gohome} >
          <img src='../img/logoDNF.png'/>
        </div>
       <CharacterSearch 
              selectedServer={selectedServer} setSelectedServer={setSelectedServer}
              selectedServerId={selectedServerId} setSelectedServerId={setSelectedServerId}
              selectedName={selectedName} setSelectedName={setSelectedName}
            /> 
        <CharacterCard data={data}/>
        
        </Container>     
  )
}

export default CharacterList
