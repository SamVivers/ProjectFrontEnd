import React, { Component } from 'react';
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            type:"password",
            register: 0
        }
    }
    render(){
        if (this.state.register === 0) {
            return (
                <div class="container">   
                    <div class="background">
                        <h4>Welcome to Sam's List</h4>
                        <div>Please login to your account</div>        
                        <input type="email" id="userName" onChange={this.inputUsername} class="user-input" placeholder="email address" required="required"></input>
                        <br/>
                        <input type={this.state.type} id="userPassword" onChange={this.inputPassword} class="user-input" placeholder="password" required="required"></input>
                        <br/>
                        <button onClick={this.showPassword}>Show Password</button>
                        <button id="login" type="submit" onClick={this.login}>login</button>
                        <p>or <button onClick={this.yesReg}>register</button> as a new users</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div class="container">   
                {console.log(this.state.username)}
                {console.log(this.state.password)}
                    <div class="background">
                        <div>Please register an account</div>        
                        <input type="email" id="userName" onChange={this.inputUsername} class="user-input" placeholder="email address" required="required"></input>
                        <br/>
                        <input type={this.state.type} id="newUserPassword" onChange={this.inputPassword} class="user-input" placeholder="password" required="required"></input>
                        <br/>
                        <button onClick={this.showPassword}>Show Password</button>
                        <button id="login" type="submit" onClick={this.register}>register</button>
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
            username:a.target.value
        });
    }
    inputPassword=(b)=>{
        this.setState({
            password:b.target.value
        });
    }
    login=()=>{
        let URL='http://localhost:8081/api/user/user/' + this.state.username;
        let request = new XMLHttpRequest();
        request.open('GET', URL);
        request.responseType = 'json';
        request.onload=()=>{
            let user = request.response;
            if (user !== null) {
                if (this.state.password === user.password) {
                    this.props.setUser(this.state.username)
                } 
            }
        }
        request.send();
    }
    yesReg=()=>{
        this.setState({
            register: 1
        })
    }
    register=()=>{
        let URL='http://localhost:8081/api/user/user';
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