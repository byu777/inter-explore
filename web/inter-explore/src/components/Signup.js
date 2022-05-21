import React from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import loginImg from "../assets/logo/40w/Icon40.png";

export class Register extends React.Component {
const 
  constructor(props) {
    super(props);
    this.sportsData = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Golf', 'Hockey', 'Rugby', 'Snooker', 'Tennis'];
  }


  render() {
  
    return (
      <div className="bases-container" ref={this.props.containerRef}>
        <div className="header">SignUp</div>

        <div className="content">
          <div className="image">
            <img src={loginImg} />
            <div className="headers">Inter Explore</div>
          </div>
          <div className="form">
          <div className="form-group">
              <label htmlFor="password">firstName</label>
              <input type="text" name="firstName" placeholder="firstName" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" />
            </div>
            <div className = "form-group">
            <label htmlFor="Primary-Interest">Primary Interest</label>
            <DropDownListComponent dataSource={this.sportsData} popupHeight="200px" popupWidth="250px" placeholder="select Primary Interest"> </DropDownListComponent>
            </div>

            <div className = "form-group">
            <label htmlFor="Primary-Interest">Secondary Interest</label>
            <DropDownListComponent dataSource={this.sportsData} popupHeight="200px" popupWidth="250px" placeholder="select a secondary Interest"> </DropDownListComponent>
            </div>


          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
          SignUp
          </button>
        </div>
      </div>
    );
  }
}