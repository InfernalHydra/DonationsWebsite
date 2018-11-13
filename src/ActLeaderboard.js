import React, {Component} from 'react'
import {withTracker} from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import {BidsAggregate} from './api/Bids'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'


//TODO: Sum donations per act, leaderboard
class ActLeaderboard extends Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        console.log(this.props.bids);
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>Act Name</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.isReady && this.props.bids.map((row, index) => {
                            return (
                                <TableRow key = {index}>
                                    <TableCell component = "th" scope = "row">{index+1}</TableCell>
                                    <TableCell>{row._id}</TableCell>
                                    <TableCell>{row.totalAmount}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );

    }
}

export default withTracker(() => {
    const subscription = Meteor.subscribe('bids.byAct');
    return {
        isReady : subscription.ready(),
        bids : BidsAggregate.find({}).fetch(),
    }
})(ActLeaderboard);
