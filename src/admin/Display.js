import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Acts } from '../api/Acts'
import BiddingLeaderboard from './BiddingLeaderboard'

//TODO: Top 5, total, most recent
class Display extends Component
{
    constructor(props)
    {
        super(props);
    }
    //biding is more like aggreate system
    render()
    {
        if(!this.props.isReady)
        {
            return <div style = {{margin : 'auto', width : '80%'}}>loading</div>
        }
        if(!this.props.actToDisplay)
        {
            return(
                <div style = {{margin : 'auto', width : '80%', textAlign : 'center'}} >
                        <h1 style = {{fontSize : '80px'}}>Thank you for attending</h1>
                </div>
            );
        }
        if(this.props.actToDisplay.status === "Scheduled")
        {
            return(
                <div style = {{margin : 'auto', width : '80%', textAlign : 'center'}} >
                        <h1 style = {{fontSize : '80px'}}>Up Next</h1>
                        <h1 style = {{fontSize : '60px'}}>{this.props.actToDisplay.name}</h1>
                        <h1>by</h1>
                        <h1 style = {{fontSize : '60px'}}>{this.props.actToDisplay.author}</h1>
                </div>
            );
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
                        <h1>{this.props.actToDisplay.name + " by " + this.props.actToDisplay.author}</h1>
                        <BiddingLeaderboard />
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
        actToDisplay : Acts.findOne({status : {$ne : "Completed"}})
        
    };
})(Display)