import React, { Component } from 'react';
import './main.css'
import Login from './Login.js'
import GetTasks from './GetTasks.js'
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      login: 0,
      user: ""
    }
  }
  render(){
    if (this.state.login === 0) {
     return( 
          <Login inLog={this.inLog} setUser={this.setUser}/>
      )
    }
    if (this.state.login === 1) {
      return(
        <div class="background">
          <div>{this.state.user}<button id="logout" onClick={this.outLog}>Logout</button></div>
          <GetTasks user={this.state.user}/>
        </div>
      )
    }
  }
  outLog=()=>{
    this.setState({
      login: 0
    })
  }

  setUser=(username)=>{
    this.setState({
      login:1,
      user: username
    })
  }
}