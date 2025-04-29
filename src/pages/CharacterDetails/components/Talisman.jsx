import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useTalisman } from '../../../hooks/useTalisman';
import { Row, Col } from 'react-bootstrap';
import { useSkill } from '../../../hooks/useSkill';

const Talisman = () => {

    const [query,setQuery] =useSearchParams();
    const server = query.get('server');
    const Name = query.get('name');
    

    const{data} = useTalisman(server,Name);
    const jobId = data?.jobId
    const{data:skillInfo } =useSkill(server,Name,jobId);
    
    const talisman = data?.talismans|| [];
    console.log(jobId );
    console.log("스킬정보", skillInfo);
    
  return (
    <Row style={{margin:"2%"}}> 
     {talisman?.map(items =>
        <Col className='talisman-card'>
           <Col className="talisman-name">탈리스만 이름</Col>
            <Col className="talisman-img"> 
               <img src={`https://bbscdan.df.nexon.com`}/> </Col>
            <Col>
            <ul className='talisman-ul'>
                <li>룬1</li>
                <li>룬2</li>
                <li>룬3</li>
            </ul>
            </Col>
        </Col>)
        }
    </Row>
  )
}

export default Talisman
