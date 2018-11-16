import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { Meteor } from 'meteor/meteor'
import {Redirect} from 'react-router'
import { Acts } from './api/Acts'
import { MenuItem } from '@material-ui/core';


class Donate extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            donationAmount : 0,
            errorTextValue : '',
            TOSAccepted: false,
            success : true,
            act: 0,
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
            Meteor.call('bids.bid', this.props.listOfActs[this.state.act]._id, this.state.donationAmount, (err) => {
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
    handleChange(e)
    {
        //console.log(e.target.value);
        this.setState({act : e.target.value});
    }
    render()
    {
        if(!Meteor.userId())
        {
            return <Redirect to = '/'/>
        }
        if(!this.props.isReady)
        {
            return <div>loading</div>
        }
        return (
            <div style = {{width : '80%', margin : 'auto'}} id = 'form-container'>
                <h1>Make a Donation</h1>
                <div>Note: If you have already donated towards the current act, bidding again will <b>override your previous donate if the amount is greater</b></div>
                <div>If you have already donated towards the current act, bidding again will <b>put in a new donation of that amount</b></div>
                {this.props.currAct ? <div>{"The act you will be donating towards is: " + this.props.currAct.name + " by " + this.props.currAct.author}</div> : null}
                    <div style = {{width : '100%'}}>
                        <TextField 
                        style = {{marginTop : '10px'}}
                        select
                        label="Select Act"
                        value = {this.state.act}
                        onChange = {this.handleChange.bind(this)}
                        >{this.props.listOfActs.map((act, index) => {
                            return <MenuItem key = {act._id} value = {index}>
                                {act.name + " by " + act.author}
                            </MenuItem>
                        })
                        }</TextField>
                    </div>    
                    <TextField
                        style = {{marginTop : '10px'}}
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
        currAct : Acts.findOne({status : "Bidding"}),
        listOfActs : Acts.find({status : {$in : ["Completed", "Bidding"]}}).fetch().reverse()
    };
})(Donate);