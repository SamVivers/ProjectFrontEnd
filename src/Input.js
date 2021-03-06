import React, { Component } from 'react';
import Columns from './Columns.js'
import {IPADDR} from './Constants.js'
export default class Input extends Component {
    constructor(props){
        super(props);
        this.state={
            desc: "",
            pri: "",
            stat: "",
            date: ""
        }
    }

    render() {
        return (
                <div>
                    <Columns/>
                    <div className="grid-container">
                        <div id="grid-itemn5"><textarea type="text" id="task" className="user-input" 
                            onChange={this.inputDesc} rows="1" maxLength="24" required="required"></textarea></div>
                        <div id="grid-itemn6"><select id="priority" onChange={this.inputPri}>
                            <option value=""></option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                            <option value="top">TOP</option>
                        </select></div>
                        <div id="grid-itemn7"><select id="status" onChange={this.inputStat}>
                            <option value=""></option>
                            <option value="not-started">not-started</option>
                            <option value="started">started</option>
                            <option value="progressing">progressing</option>
                            <option value="finishing-up">finishing-up</option>
                            <option value="completed">completed</option>
                        </select></div> 
                        <div id="grid-itemn8"><input type="date" id="date" onChange={this.inputDate} 
                            className="user-input" required="required"/></div>                        
                        <div id="grid-itemn9"><button onClick={this.create} type="submit" id="create" 
                            form="newTask" value="Submit">create</button></div>
                    </div>
                </div>
        )
    }

    inputDesc=(a)=>{
        this.setState({
            desc:a.target.value
        });
    }

    inputPri=(b)=>{
        this.setState({
            pri:b.target.value
        });
    }

    inputStat=(c)=>{
        this.setState({
            stat:c.target.value
        });
    }

    inputDate=(d)=>{
        this.setState({
            date:d.target.value
        });
    }

    create=()=>{
        let URL=`http://${IPADDR}:8081/api/tasklist/tasks`;
        let request = new XMLHttpRequest();
        request.open('POST', URL);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.responseType = 'json';
        request.onload=()=> {
            this.props.getTasks();
        }
        let body = {
                    username: this.props.user,
                    description: this.state.desc,
                    priority: this.state.pri,
                    status: this.state.stat,
                    do_by: this.state.date 
                    };
        body = JSON.stringify(body);
        request.send(body);
    }
}