import React, { Component } from 'react';
export default class Columns extends Component {
    render(){
        return (
            <div id="headings" className="grid-container">
                <div id="grid-itemp1">Description:</div>
                <div id="grid-itemp2">Priority:</div>
                <div id="grid-itemp3">Status:</div>
                <div id="grid-itemp4">Do by:</div>
            </div>
        )
    }
}