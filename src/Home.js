import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Acts } from './api/Acts'
import ActLeaderboard from './ActLeaderboard'

class Home extends Component
{
    constructor(props)
    {
        super(props);
    }
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
                <h1>Bidding Leaderboard (by Act)</h1>
                <div style = {{marginTop : '30px'}}id = 'table-wrapper'>
                    <ActLeaderboard />
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    const subsription = Meteor.subscribe('acts');
    return {
        isReadyActs : subsription.ready(),
        currAct : Acts.findOne({status : {$nin : ["Scheduled", "Completed"]}}),
    }
})(Home)