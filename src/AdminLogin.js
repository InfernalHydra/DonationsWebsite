import React, { Component } from "react";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Meteor } from "meteor/meteor";

export default class AdminLogin extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data : ""
        };
    }
    handleChange(e)
    {
        // console.log(e.target.value);
        this.setState({data : e.target.value});
    }
    handleSubmit()
    {
        //console.log(this.state.data);
        Meteor.call('users.validateUser', this.state.data); 
    }
    render()
    {
        return(
            <div style = {{width : '80%', margin: 'auto'}}>
                <h1>Log in</h1>
                <Button>
                    Log in with Facebook
                </Button>
                <TextField
                        id = 'pass'
                        type = 'password'
                        label = "Admin Key"
                        step = 'any'
                        placeholder = ''
                        onChange = {this.handleChange.bind(this)}
                        fullWidth
                    ></TextField>
                    <Button style = {{marginTop : '30px'}} variant="contained" onClick = {this.handleSubmit.bind(this)}>Submit</Button>
            </div>
        );
    }

}