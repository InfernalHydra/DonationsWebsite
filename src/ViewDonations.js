import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor';
import {Redirect} from 'react-router';

export default class ViewDonations extends Component
{
    render()
    {
        if(!Meteor.userId())
        {
            return <Redirect to = '/'/>
        }
        return(
            <div style = {{width : '80%', margin:'auto'}}>
                <h1>View your Donations</h1>
                <div>{Meteor.userId()}</div>
                <div>The following are the donations you have made</div>
            </div>
        );
    }
}