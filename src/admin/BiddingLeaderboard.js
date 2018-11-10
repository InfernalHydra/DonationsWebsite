import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'

class BiddingLeaderboard extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {

    }
}

export default withTracker(() => {
    const subscription = Bids.subscribe();
    return {
        isReady : subscription.ready(),

    };
})(BiddingLeaderboard);