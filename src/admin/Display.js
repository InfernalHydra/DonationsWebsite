import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor';
class Display extends Component
{
    constructor(props)
    {
        super(props);
    }
    //TODO: Make 2 components, 1 for during act and 1 for during bidding
    render()
    {
        return(
            <div style = {{margin : 'auto', width : '80%'}} >
                    <h1 style = {{textAlign : 'center', fontSize : '80px'}}>Current Act</h1>
                    <h1></h1>
                    <h1></h1>
            </div>
        );
    }
}

export default withTracker(() => {
    const subscription = Meteor.subscribe('acts');
    return {
        isReady : subscription.ready(),

    };
})(Display)