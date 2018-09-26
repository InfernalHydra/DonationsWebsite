import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor';

export default class ViewDonations extends Component
{
    render()
    {
        return(
            <div style = {{width : '80%', margin:'auto'}}>
                <h1>View your Donations</h1>
                <div>{Meteor.userId()}</div>
                <div>The following are the donations you have made</div>
            </div>
        );
    }
}