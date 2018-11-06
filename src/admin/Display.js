import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor';
import { Acts } from '../api/Acts';

class Display extends Component
{
    constructor(props)
    {
        super(props);
    }
    //TODO: Make 2 components, 1 for during act and 1 for during bidding
    render()
    {
        if(!this.props.isReady)
        {
            return <div style = {{margin : 'auto', width : '80%'}}>loading</div>
        }
        if(this.props.actToDisplay.status === "In Progress" || this.props.actToDisplay.status === "Ended")
        {
            return(
                <div style = {{margin : 'auto', width : '80%', textAlign : 'center'}} >
                        <h1 style = {{fontSize : '80px'}}>Current Act</h1>
                        <h1 style = {{fontSize : '60px'}}>{this.props.actToDisplay.name}</h1>
                        <h1>by</h1>
                        <h1 style = {{fontSize : '60px'}}>{this.props.actToDisplay.author}</h1>
                </div>
            );
        }
        if(this.props.actToDisplay.status === "Bidding")
        {
            return(
                <div style = {{margin : 'auto', width : '80%', textAlign : 'center'}} >
                    <h1 style = {{fontSize : '80px'}}>Bidding</h1>
                        <h1 style = {{fontSize : '120px'}}>{"$" + this.props.actToDisplay.amount}</h1>
                        <h1>{this.props.actToDisplay.name + " by " + this.props.actToDisplay.author}</h1>
                </div>
            );
        }
        return <div>adsfadsf</div>;
    }
}

export default withTracker(() => {
    const subscription = Meteor.subscribe('acts');
    return {
        isReady : subscription.ready(),
        actToDisplay : subscription.ready() && Acts.findOne({status : {$ne : "Completed"}})
        
    };
})(Display)