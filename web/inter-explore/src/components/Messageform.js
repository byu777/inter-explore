
import React from 'react'
import { Col, Row,Button,Form } from 'react-bootstrap';
import "./Messageform.scss";


function Messageform() {
    function handleSubmit(e){
        e.preventDefault();
    }
  return (
    <>
   <div className="messages-output"> </div>
       <Form onSubmit={handleSubmit}> 
       <Row>
           <Col md={11}>
               <Form.Group>
                   <Form.Control type= "text" placeholder='your message'></Form.Control>
                   </Form.Group>
                   </Col>
                        <Col md = {1}>
                            <Button variant = "primary" type = "submit" style = {{width:'100%', backgroundColor:'orange'}}>
                            <i className="fas fa-paper-plane"></i>
                            </Button>

           </Col>
       </Row>
       </Form>
   </>
  )
}

export default Messageform