import React, {Component} from 'react'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { Meteor } from 'meteor/meteor';
import {Redirect} from 'react-router';

export default class Donate extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name : "",
            donationAmount : 0,
            errorTextName : '',
            errorTextValue : '',
            TOSAccepted: false,
        }
    }

    handleNameChange(e)
    {
        //console.log(e.target.value);
        this.setState({name : e.target.value});
    }
    handleValueChange(e)
    {
        let numberExp = new RegExp('\\d+');
        let moneyExp = new RegExp('\\d+.\\d{2}')
        //console.log(e.target.value);
        //console.log(moneyExp.test(e.target.value));
        //console.log(numberExp.test(e.target.value));
        if(moneyExp.test(e.target.value) || numberExp.test(e.target.value))
        {
            this.setState({errorTextValue : ""});
            this.setState({donationAmount : parseFloat(e.target.value)});
        }
        else if(e.target.value === "")
        {
            this.setState({errorTextValue : ""});
        }
        else
        {
            this.setState({errorTextValue : "Please input a number"});
        }
    }
    handleTOS()
    {
        this.setState({TOSAccepted : !this.state.TOSAccepted})
    }
    handleSubmit()
    {
        //console.log("whoa")
        if(!this.state.TOSAccepted)
        {
            alert("Please accept the terms and services");
        }
        else if(this.state.errorTextName || this.state.errorTextValue)
        {
            alert("Please fix any errors before submission")
        }
        Meteor.call('acts.bid', Meteor.userId(), this.state.name, this.state.donationAmount)
    }
    render()
    {
        if(!Meteor.userId())
        {
            return <Redirect to = '/'/>
        }

        return (
            <div style = {{width : '80%', margin : 'auto'}} id = 'form-container'>
                <h1>Make a Donation</h1>
                    <TextField
                        id = 'name'
                        label = "Name"
                        placeholder = "Leeroy Jenkins"
                        type = 'text'
                        fullWidth
                        error = {this.state.errorTextName !== "" ? true : false}
                        helperText = {this.state.errorTextName}
                        onChange = {this.handleNameChange.bind(this)}
                    ></TextField>
                    <TextField
                        style = {{marginTop : '30px'}}
                        id = 'donation'
                        label = "Donation Amount"
                        step = 'any'
                        placeholder = '0'
                        error = {this.state.errorTextValue !== "" ? true : false}
                        helperText = {this.state.errorTextValue}
                        InputProps = {{startAdornment : <InputAdornment position='start'>$</InputAdornment>}}
                        onChange = {this.handleValueChange.bind(this)}
                    ></TextField>
                    <div id = 'tos-container' style={{display : 'flex'}}>
                        <Checkbox onChange = {this.handleTOS.bind(this)} />
                        <p>By clicking this box, I agree to pay the donation amount as listed</p>
                    </div>
                    <Button variant="contained" onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </div>
        );
    }
}