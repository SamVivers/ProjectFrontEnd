import React, { Component } from 'react';
import ShowTask from './ShowTask.js'
import Title from './Title.js'
import Input from './Input.js'
export default class GetTasks extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks:[]
        }
    }
    componentWillMount() {
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
                <div class="grid-container" id="prevTasks">
                    <div id="grid-itemp1">Description:</div>
                    <div id="grid-itemp2">Priority:</div>
                    <div id="grid-itemp3">Status:</div>
                    <div id="grid-itemp4">Do by:</div>
                </div>
                {this.state.tasks.map((task)=><ShowTask getTasks={this.getTasks}
                                                        user={this.props.user}
                                                        id={task.id} 
                                                        desc={task.description} 
                                                        pri={task.priority} 
                                                        stat={task.status} 
                                                        date={task.do_by}
                                                            />)}
            </div>
        )
    }
}