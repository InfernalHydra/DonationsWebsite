import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { Meteor } from 'meteor/meteor';
import {Redirect} from 'react-router';
import { Acts } from './api/Acts';

class Donate extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            donationAmount : 0,
            errorTextValue : '',
            TOSAccepted: false,
            success : true
        }
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
        else if(this.state.errorTextValue)
        {
            alert("Please fix any errors before submission");
        }
        else
        {
            Meteor.call('bids.bid', this.state.donationAmount, (err) => {
                if(err)
                {
                    alert(err);
                }
                else
                {
                    alert("Donation successfully received");
                    location.reload();
                }
            });
        }
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
                        type = 'number'
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

export default withTracker(() => {
    const subscription = Meteor.subscribe('acts');
    return {
        isReady : subscription.ready(),
        currAct : subscription.ready() && Acts.findOne({status : "Bidding"}),
    };
})(Donate);