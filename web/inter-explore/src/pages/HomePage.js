import React from "react";
import {Row,Col,Button} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import "./HomePage.scss";
    
    function HomePage() {
        return (
         <Row>
             <Col md = {6} className="d-flex flex-direction-column align-items-center justify-content-center">
                 <div>
                     <h1>
                         Share world with your Friends
                     </h1>
                     <p>
                         ChatApp lets you connect with the world
                     </p>
                     <LinkContainer to = "/chat">
                         <Button variant="success">
                             Get Started 

                             <i className="fas fa-comments home-message-icon"></i>
                         </Button>

                     </LinkContainer>
                 </div>
             </Col>
             <Col md = {6} className = "home__bg">
             </Col>
         </Row>
        )
    }
    export default HomePage;