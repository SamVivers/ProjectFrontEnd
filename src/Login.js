import React, { Component } from 'react';
import {IPADDR} from './Constants.js'
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            type:"password",
            register: 0,
            errorMsg: ""
        }
    }
    render(){
        if (this.state.register === 0) {
            return (
                <div className="container">   
                    <div className="background">
                        <h5>Welcome to Sam's List</h5>
                        <div>Please login to your account</div>       
                        <br/> 
                        <input type="email" id="userName" onChange={this.inputUsername} className="user-input" 
                        placeholder="email address" required="required"></input>
                        <br/>
                        <br/>
                        <input type={this.state.type} id="userPassword" onChange={this.inputPassword} 
                        className="user-input" placeholder="password" required="required"></input>
                        <br/>
                        <input type="checkbox" onClick={this.showPassword}></input>show password<br/>
                        <br/>
                        <button id="login" type="submit" onClick={this.login}>login</button>
                        <br/>
                        <br/>
                        <div className="msg">{this.state.errorMsg}</div>
                        <p>or <button onClick={this.yesReg}>register</button>as a new users</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="background">
                        <h5>Welcome to Sam's List</h5>
                        <div>Please register an account</div>    
                        <br/>    
                        <input type="email" id="userName" onChange={this.inputUsername} className="user-input" 
                        placeholder="email address" required="required"></input>
                        <br/>
                        <br/>
                        <input type={this.state.type} id="newUserPassword" onChange={this.inputPassword} 
                        className="user-input" placeholder="password" required="required"></input>
                        <br/>
                        <input type="checkbox" onClick={this.showPassword}></input>show password<br/>
                        <br/>
                        <button id="login" type="submit" onClick={this.check}>register</button>
                        <br/>
                        <br/>
                        <div className="msg">{this.state.errorMsg}</div>
                        <p>or return to <button onClick={this.noReg}>login</button>screen</p>
                    </div>
                </div>
            )
        }
    }
    showPassword=()=>{
        if (this.state.type === "password") {
            this.setState({
                type:"text"
            })
        } else {
            this.setState({
                type:"password"
            })
        }
    }
    inputUsername=(a)=>{
        this.setState({
            username:a.target.value,
            errorMsg:""
        });
    }
    inputPassword=(b)=>{
        this.setState({
            password:b.target.value,
            errorMsg:""
        });
    }
    login=()=>{
        let URL=`${IPADDR}/api/user/user/` + this.state.username;
        let request = new XMLHttpRequest();
        request.open('POST', URL);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.responseType = 'json';
        request.onload=()=>{
            let user = request.response;
            if (user === 1) {
                    this.props.setUser(this.state.username)
            } else {
                this.setState({
                    errorMsg: "Incorrect username or password"
                })
            }        
        }
        let body = {
            username: this.state.username,
            password: this.state.password
            };
        body = JSON.stringify(body);
        request.send(body);
    }
    yesReg=()=>{
        this.setState({
            register: 1
        })
    }
    noReg=()=>{
        this.setState({
            register: 0
        })
    }
    check=()=>{
        let URL=`${IPADDR}/api/user/user/` + this.state.username;
        let request = new XMLHttpRequest();
        request.open('GET', URL);
        request.responseType = 'json';
        request.onload=()=>{
            let user = request.response;
            if (user === 0) {
                    this.register();
            } else {
                this.setState({
                    errorMsg: "There is already a user with that name"
                })
            }
        }
        request.send();
    }
    register=()=>{
        let URL=`${IPADDR}/api/user/user`;
        let request = new XMLHttpRequest();
        request.open('POST', URL);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.responseType = 'json';
        request.onload=()=>{
            this.setState({
                register: 0
            })
            this.props.setUser(this.state.username);
        }
        let body = {
            username: this.state.username,
            password: this.state.password
            };
        body = JSON.stringify(body);
        request.send(body);
    }
}