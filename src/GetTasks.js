import React, { Component } from 'react';
import ShowTask from './ShowTask.js'
import Title from './Title.js'
import Input from './Input.js'
import Columns from './Columns.js'
export default class GetTasks extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks:[]
        }
    }
    componentDidMount() {
        this.getTasks();
    }
    getTasks=()=>{
        let URL='http://localhost:8081/api/tasklist/alltasks/' + this.props.user;
        let request = new XMLHttpRequest();
        request.open('GET', URL);
        request.responseType = 'json';
        request.onload=()=>{
            this.setState({
                tasks:request.response
            });
        }
        request.send();
    }
    render() {
        return (
            <div>
                <Title name="New Task"/>
                <Input getTasks={this.getTasks} user={this.props.user}/>
                <Title name="Current Tasks"/>
                <Columns/>
                <br/>
                {this.state.tasks.map((task)=><ShowTask state1="completed"
                                                        getTasks={this.getTasks}
                                                        user={this.props.user}
                                                        id={task.id} 
                                                        desc={task.description} 
                                                        pri={task.priority} 
                                                        stat={task.status} 
                                                        date={this.displayDate(task.do_by)}
                                                            />)}
                <Title name="Completed Tasks"/>
                <Columns/>
                <br/>
                {this.state.tasks.map((task)=><ShowTask state1=""
                                                        state2="not-started"
                                                        state3="started"
                                                        state4="progressing"
                                                        state5="finishing-up"
                                                        getTasks={this.getTasks}
                                                        user={this.props.user}
                                                        id={task.id} 
                                                        desc={task.description} 
                                                        pri={task.priority} 
                                                        stat={task.status} 
                                                        date={this.displayDate(task.do_by)}
                                                            />)}                                          
            </div>
        )
    }
    displayDate(input){
        let output = "";
        let cutHere = input.length;
        for (let i = input.length; i > 0; i--) {
            if (input.substring(i - 1, i) === "-") {
                output += input.substring(i, cutHere) + "/";
                cutHere = i - 1;
            }
            if (i === 1) {
                output += input.substring(i - 1, cutHere)
            }
        }
        return output;
    }
}