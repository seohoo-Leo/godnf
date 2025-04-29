import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useServers } from '../../../hooks/useServers';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../components/CharacterSearch.style.css'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CharacterSearch = ({selectedName,selectedServer,selectedServerId,setSelectedName,setSelectedServer,setSelectedServerId}) => {
  
  const {data,isLoding,isError,error} = useServers();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);

  const inputName=(event) => {
    let key_word= event.target.value;
    setSelectedName(key_word);
    }

    const searchEnter=(event)=>{
      if(event.key === "Enter"){
       event.preventDefault(); 
        if(selectedServerId==="서버" || selectedName ===""){ 
          setSmShow(true);
        }else{
        navigate(`/servers/characters?serverId=${selectedServerId}&characterName=${selectedName}`)
        }
    }
  }

  const searchButton = () => {
    setLoading(true);
    if(selectedServerId==="서버" || selectedName ===""){ 
      setSmShow(true);
    }else{
      navigate(`/servers/characters?serverId=${selectedServerId}&characterName=${selectedName}`)
    }

   
  } 

 

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
      
    }
  }, [isLoading]);


    

  const userServer = (server) =>{
    setSelectedServer( server.serverName)
    setSelectedServerId( server.serverId)
    
  }

  if(isLoding){
    <p>Loding.....</p>
  }

  return (
    <div  className="CSHTOP" style={{display:'flex', justifyContent:"center"}}>
     <Form>
      <Form.Group as={Row}  controlId="formPlaintextPassword" style={{alignItems: "center", justifyContent:"center"}}>
        <Form.Label column >
              <Dropdown style={{display:"flex",justifyContent:"flex-end"}}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{width : '200px'}}>
            {selectedServer}
          </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: '200px', maxHeight: '200px', overflowY: 'auto', textAlign:"center"}}>
            {
              data?.map((server,index)=>
                <Dropdown.Item key={index} onClick={() => userServer(server)} >
                  {server.serverName}
                </Dropdown.Item>)
            }
          </Dropdown.Menu>
          </Dropdown> 
        </Form.Label>
        <Col >
          <Form.Control 
            type="text" 
            placeholder="캐릭터명"  
            style={{ alignItems: "center", width:"300px"}} 
            onChange={(event)=>inputName(event)}
            onKeyPress={(event) => searchEnter(event)}
            />
        </Col>
        <Col>
        <Button 
            variant="outline-primary"
            disabled={isLoading}
            onClick={!isLoading ? ()=> searchButton() : null}
          >
            {isLoading ? 'Loading…' : '검색'}
          </Button>
          </Col>
      </Form.Group>
    </Form>

    {/* 모달창 */}
    <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
              Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>서버와 캐릭터명을 확인해주세요</Modal.Body>
      </Modal>
    </div>

  );
}

export default CharacterSearch
