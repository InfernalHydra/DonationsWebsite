import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Acts } from './api/Acts'

class Home extends Component
{
    render()
    {
        if(!this.props.isReady)
        {
            return <div>loading</div>;
        }
        let text = this.props.actInProgress ? "The current act is: " + this.props.currAct.name + " by " + this.props.currAct.author : "";
        return (
            <div id = "home-container" style={{width : '80%', margin: 'auto'}}>
                <h1>Welcome to Aid the Cause 2018</h1>
                {Meteor.userId() ? null : <div>Please log in to donate</div>}
            </div>
        );
    }
}

export default withTracker(() => {
    const subsription = Meteor.subscribe('acts');
    return {
        isReady : subsription.ready(),
        actInProgress : subsription.ready() && Acts.find({status : "In Progress"}).fetch().length,
        currAct : subsription.ready() && Acts.findOne({status : "In Progress"}),
    }
})(Home)