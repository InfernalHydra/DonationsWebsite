import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import {Bids} from '../api/Bids'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'

class BiddingLeaderboard extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        if(!this.props.isReady)
        {
            return(<div>loading</div>);
        }
        //console.log(this.props.bids);
        return (
        <div style = {{width : '80%', margin : 'auto'}} id = 'leadboard-wrapper'>
            <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.isReady && this.props.bids.map((row, index) => {
                                return (
                                    <TableRow key = {index}>
                                        <TableCell component = "th" scope = "row">{index+1}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{"$"+row.amount}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                {this.props.bidsRecent ? <h2>{"Most Recent Bid: $" + this.props.bidsRecent.amount + " by " + this.props.bidsRecent.name}</h2> : null}
                <h2>{"Total: $" + this.props.bidSum}</h2>
        </div>
        );
    }
}

export default withTracker(() => {
    const subscription = Meteor.subscribe('bids.forCurrAct');
    return {
        isReady : subscription.ready(),
        bids : Bids.find({status : "Fufilled"}, {sort : {amount : -1, date : 1}}).fetch().slice(0,5),
        bidsRecent: Bids.find({status : "Fufilled"}).fetch().reverse()[0],  
        bidSum : Bids.find({status : "Fufilled"}).fetch().reduce((a, b) => {return a + b.amount}, 0),
    };
})(BiddingLeaderboard);