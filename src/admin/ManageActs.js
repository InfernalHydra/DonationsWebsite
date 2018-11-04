import React, {Component} from 'react'
import ActList from './ActList'
import { TextField, Button } from '@material-ui/core';
import { Meteor } from 'meteor/meteor';

export default class ManageActs extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            title: "",
            author: "",
            errorTextTitle : "",
            errorTextAuthor : ""
        };
    }
    handleTitleChange(e)
    {
        this.setState({title : e.target.value});
    }
    handleAuthorChange(e)
    {
        this.setState({author: e.target.value});
    }
    handleSubmit()
    {
        Meteor.call('acts.addAct', this.state.title, this.state.author);
    }
    handleStop()
    {
        Meteor.call('acts.stopCurrentAct');
    }
    handleStart()
    {
        Meteor.call('acts.startNextAct');
    }
    handleStartBids()
    {
        Meteor.call('acts.startBids');
    }
    handleStopBids()
    {
        Meteor.call('acts.stopBids');
    }
    render()
    {
        return(
            <div style = {{width : '80%', margin : 'auto'}} id = 'content-wrapper'>
                <h1>Manage Acts</h1>
                <h2>Insert Act</h2>
                <div id = 'form-wrapper'>
                    <TextField
                        style = {{width : '250px'}}
                        id = 'title'
                        label = "Title"
                        type = 'text'
                        error = {this.state.errorTextTitle !== "" ? true : false}
                        helperText = {this.state.errorTextTitle}
                        onChange = {this.handleTitleChange.bind(this)}
                    ></TextField>
                    <TextField
                        style = {{width : '250px', marginLeft : '30px'}}
                        id = 'author'
                        label = "Performers"
                        error = {this.state.errorTextAuthor !== "" ? true : false}
                        helperText = {this.state.errorTextAuthor}
                        onChange = {this.handleAuthorChange.bind(this)}
                    ></TextField>
                    <Button style = {{marginLeft : '30px'}} variant = "contained" color = 'secondary' onClick = {this.handleSubmit.bind(this)}>Add</Button>
                    <Button style = {{float : 'right', marginLeft : '30px'}} variant = "contained" color = 'secondary' onClick = {this.handleStopBids.bind(this)}>Close Bidding</Button>
                    <Button style = {{float : 'right', marginLeft: '30px'}} variant = "contained" color = 'secondary' onClick = {this.handleStartBids.bind(this)}>Open Bidding</Button>
                    <Button style = {{float : 'right', marginLeft : '30px'}} variant = "contained" color = 'secondary' onClick = {this.handleStop.bind(this)}>Stop Current Act</Button>
                    <Button style = {{float : 'right'}} variant = "contained" color = 'secondary' onClick = {this.handleStart.bind(this)}>Start Next Act</Button>   
                    <ActList />
                </div>
            </div>
        );
    }
}