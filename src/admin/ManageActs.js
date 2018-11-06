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
        Meteor.call('acts.addAct', Meteor.userId(), this.state.title, this.state.author);
    }
    handleStop()
    {
        Meteor.call('acts.stopCurrentAct', Meteor.userId());
    }
    handleStart()
    {
        Meteor.call('acts.startNextAct', Meteor.userId());
    }
    handleStartBids()
    {
        Meteor.call('acts.startBids', Meteor.userId());
    }
    handleStopBids()
    {
        Meteor.call('acts.stopBids', Meteor.userId());
    }
    render()
    {
        return(
            <div style = {{width : '80%', margin : 'auto'}} id = 'content-wrapper'>
                <h1>Manage Acts</h1>
                <h2>Insert Act</h2>
                <div id = 'form-wrapper'>
                    <div style = {{display : 'inline-block'}} id = 'form'>
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
                    </div>
                    <div style = {{display: 'inline-block'}} id = 'button-container'>
                        <Button style = {{marginLeft : '30px'}} variant = "contained" color = 'secondary' onClick = {this.handleStart.bind(this)}>Start Next Act</Button>
                        <Button style = {{marginLeft : '30px'}} variant = "contained" color = 'secondary' onClick = {this.handleStop.bind(this)}>Stop Current Act</Button>
                        <Button style = {{marginLeft: '30px'}} variant = "contained" color = 'secondary' onClick = {this.handleStartBids.bind(this)}>Open Bidding</Button>
                        <Button style = {{marginLeft : '30px'}} variant = "contained" color = 'secondary' onClick = {this.handleStopBids.bind(this)}>Close Bidding</Button>
                    </div>
                       
                    <ActList />
                </div>
            </div>
        );
    }
}