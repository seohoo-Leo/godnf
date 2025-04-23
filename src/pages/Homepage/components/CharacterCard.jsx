import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useCharacter } from '../../../hooks/useCharacter';

const CharacterCard = ({selectedName, selectedServerId}) => {
  const [characterList,setCharacter] = useState([]);
  const {data} = useCharacter(selectedServerId, selectedName);
  
    console.log("data" ,data);
    

  return (
    <Container>
      <Row>
        <Col>
        </Col>
      </Row>
    </Container>
  )
}

export default CharacterCard
