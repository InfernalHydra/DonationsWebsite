import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'
import {Redirect} from 'react-router'
import {withTracker} from 'meteor/react-meteor-data'
import {Bids} from './api/Bids'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'

class ViewDonations extends Component
{
    render()
    {
        if(!Meteor.userId())
        {
            return <Redirect to = '/'/>
        }
        return(
            <div style = {{width : '80%', margin:'auto'}}>
                <h1>View your Donations</h1>
                <div>To pay your donation, please go to the table (insert location here)</div>
                <div>Your ID is {Meteor.userId()}</div>
                <div>The following are the donations you have made</div>
                <div style = {{marginTop : '30px'}}id = 'table-wrapper'>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Act Name</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.isReady && this.props.bids.map((row, index) => {
                                    return (
                                        <TableRow key = {index}>
                                            <TableCell component = "th" scope = "row">{"$"+row.amount}</TableCell>
                                            <TableCell>{row.actName}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}
export default withTracker(() => {
    const subscription = Meteor.subscribe('bids.byUser');
    return{
        isReady : subscription.ready(),
        bids : Bids.find({}).fetch()
    }
})(ViewDonations);