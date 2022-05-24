import { Form } from "formik";
import React, {useContext, useState}from "react";
import loginImg from "../assets/logo/40w/Icon40.png";
import {Context as AuthContext} from './../context/AuthContext';

export class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {email: '', password: ''}

      // this.handleChange = this.handleChange.bind(this)
      // this.handleSubmit = this.handleSubmit.bind(this)
    }

    // handleEmailChange(event) {
    //   this.setState({email: event.target.value});
    // }

    // handlePasswordChange(event) {
    //   this.setState({password: event.target.value})
    // }

    // handleSubmit() {
    //   console.log(this.state.email, this.state.password);
    // }
    render() {
      return (
        <div className="base-container" ref={this.props.containerRef}>
          {/* <Form onSubmit={this.handleSubmit}> */}
          <div className="header">Login</div>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
              <div className="headers">Inter Explore</div>
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Email</label>
                <input type="text" name="username" placeholder="username" onChange={this.handleEmailChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password" onChange={this.handlePasswordChange}/>
              </div>
            </div>
          </div>
          
          <div className="footer">
            <button type="submit" className="btn" onClick={this.handleSubmit}>
              Login
            </button>
          </div>
          {/* </Form> */}
        </div>
      );
    }
  }