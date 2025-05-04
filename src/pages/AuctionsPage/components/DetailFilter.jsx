import React from 'react'
import { useContext } from 'react';
import { Col, Row, useAccordionButton } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import Card from 'react-bootstrap/Card';


const DetailFilter = ({selectedTypes}) => {


    const YELLOW = ' #ffcc00'
    const BLUE =  'rgb(31, 105, 252)'

    function ContextAwareToggle({ children, eventKey, callback }) {
        const { activeEventKey } = useContext(AccordionContext);
            const decoratedOnClick = useAccordionButton(
                eventKey,
                () => callback && callback(eventKey),
              );
        const isCurrentEventKey = activeEventKey === eventKey;

        return (
          <button
            type="button"
            style={{ background: isCurrentEventKey ? YELLOW : BLUE,
                    display:'flex', height:"33px", overflow:'hidden',
                    justifyContent:'center', alignContent:'center', textAlign:'center',
                    textOverflow:"hidden" ,width:"100%", border:`0.5px solid black`,
                    color:isCurrentEventKey ? "black" : "white", borderRadius:"5%",
                    fontWeight:"700"
                        }}
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        );
      }

      console.log(selectedTypes);
      


  return (
    <Accordion defaultActiveKey="0">
        {selectedTypes?.type?.map((job, index)=> 
          <Card  className='list_plus'>
          <Card.Header className='list_plus'>
            <ContextAwareToggle eventKey={index}>{job?.label}</ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={index}>
            <Card.Body className='detailEnd'>
                {job?.detail?.map((a)=><Col>{a}</Col>)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        )}
  </Accordion>
  )
}

export default DetailFilter
