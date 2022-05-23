import React from "react";
import {Row,Col,Container} from 'react-bootstrap'
import Messageform from "../components/Messageform";
import Sidebar from "../components/Sidebar";
    
function Chat() {
    return (
        <Container>
            <Row>
                <Col md ={4}>
                <Sidebar/>
                </Col>
                <Col md = {8}>
                <Messageform/>
                </Col>
            </Row>
        </Container>
    )
}
export default Chat;