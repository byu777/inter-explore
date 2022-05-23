import React from "react";
import { ListGroup,Button } from "react-bootstrap";
import "./Sidebar.scss";

function Sidebar(){
    const rooms = ['basketBall','Baseball']
    return (
     <>
     <h2>
         interest Room
     </h2>
      <ListGroup>
          {rooms.map((room,idx) => (
              <ListGroup.Item key={idx}>{room}</ListGroup.Item>
          ))}
      </ListGroup>
        <h2>
            Members
        </h2>
        <ListGroup>
          {rooms.map((room,idx) => (
              <ListGroup.Item key={idx}>{room}</ListGroup.Item>
          ))}
      </ListGroup>
        <h2>
          Events
        </h2>
        <ListGroup>
          {rooms.map((room,idx) => (
              <ListGroup.Item key={idx}>{room}</ListGroup.Item>
          ))}
      </ListGroup>
     <Button variant = "primary" type = "submit" style = {{width:'100%', backgroundColor:'lightblue' }}>
         create Events
     <i className="fas fa-calendar-check create-event"></i>
    </Button>
     </>
    );
}

export default Sidebar;