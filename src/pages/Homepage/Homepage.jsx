import React from 'react'
import { Container } from 'react-bootstrap'
import "../Homepage/Homepage.style.css"
import CharacterSearch from './components/CharacterSearch'
import { useState } from 'react'
import Todaygrade from './components/Todaygrade'
import { useNavigate } from 'react-router-dom'

const Homepage = ({selectedName,selectedServer,selectedServerId,setSelectedName,setSelectedServer,setSelectedServerId}) => {

  const navigate = useNavigate();
  
  const gohome=()=>{
     navigate('/')
  }

  return (
    <div className='homepage'>
        <Container>
        <div className="nav-section" onClick={gohome} >
          <img src='./img/logoDNF.png' />
        </div>
            <CharacterSearch 
              selectedServer={selectedServer} setSelectedServer={setSelectedServer}
              selectedServerId={selectedServerId} setSelectedServerId={setSelectedServerId}
              selectedName={selectedName} setSelectedName={setSelectedName}
            />
          <hr/>
          <Todaygrade />
        </Container>
    </div>
    
  )
}

export default Homepage
