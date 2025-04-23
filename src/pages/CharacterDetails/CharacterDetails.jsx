import React from 'react'

import "../CharacterDetails/CharacterDetails.style.css"
import { useSearchParams } from 'react-router-dom'
import { useCharacter } from '../../hooks/useCharacter'
import { useCharacterDetail } from '../../hooks/useCharacterDetail'
import { Container } from 'react-bootstrap'
import CharacterDetailTopCard from './components/CharacterDetailTopCard'
import CharacterDetailBotCard from './components/CharacterDetailBotCard'
import { useEItem } from '../../hooks/useEItem'

const CharacterDetails = () => {

    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name')
    const{data} = useCharacterDetail(server,Name);
    const{data:EItem} =useEItem(server,Name);

    
  return (
    <Container>
        <CharacterDetailTopCard data={data} server={server}/>
        <CharacterDetailBotCard EItem={EItem}/>
    </Container>
  )
}

export default CharacterDetails
