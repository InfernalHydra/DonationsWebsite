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
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Check from '@material-ui/icons/Check'

class ManageDonations extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currName : ""
        }
    }

    handleClick(donationID)
    {
        Meteor.call('bids.update', donationID);
    }
    render()
    {
        return(
            <div style = {{width : '80%', margin : 'auto'}} id = 'donations-title-wrapper'>
                    <h1>Manage Donations</h1>
                    <div id = 'donations-manager-wrapper'>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Act Name</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>User ID</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.isReady && this.props.bids.map((row, index) => {
                                    return (
                                        <TableRow key = {index}>
                                            <TableCell>
                                                <IconButton onClick = {this.handleClick.bind(this, row._id)}>
                                                    <Check />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell component = "th" scope = "row">{row.actName}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.userID}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
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
    const subscription = Meteor.subscribe('bids');
    return {
        isReady : subscription.ready(),
        bids : Bids.find({}).fetch()
    }
})(ManageDonations)