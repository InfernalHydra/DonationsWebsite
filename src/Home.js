import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Acts } from './api/Acts'
import {Bids} from './api/Bids'

class Home extends Component
{
    render()
    {
        if(!this.props.isReadyActs && !this.props.isReadyBids)
        {
            return <div>loading</div>;
        }
        return (
            <div id = "home-container" style={{width : '80%', margin: 'auto'}}>
                <h1>Welcome to Aid the Cause 2018</h1>
                {Meteor.userId() ? null : <div>Please log in to donate</div>}
                <div>{this.props.currAct ? "The current act is: " + this.props.currAct.name + " by " + this.props.currAct.author : ""}</div>
                <div>{this.props.isReadyBids ? "The current total of donations is: $" + this.props.bids.reduce((a,b) => {return a + b.amount}, 0) : ""}</div>
            </div>
        );
    }
}

export default withTracker(() => {
    const subsriptionActs = Meteor.subscribe('acts');
    const subsriptionBids = Meteor.subscribe('bids');
    return {
        isReadyActs : subsriptionActs.ready(),
        isReadyBids : subsriptionBids.ready(),
        currAct : Acts.findOne({status : {$ne : "Scheduled"}}),
        bids: Bids.find({status : "Fufilled"}).fetch(),
    }
})(Home)