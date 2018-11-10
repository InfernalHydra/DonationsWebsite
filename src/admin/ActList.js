import React, { Component } from "react"
import {withTracker} from 'meteor/react-meteor-data'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import { Acts } from "../api/Acts"

class ActList extends Component
{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        return (
            <div style = {{marginTop : '30px'}}id = 'table-wrapper'>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.isReady && this.props.donations.map((row, index) => {
                                return (
                                    <TableRow key = {index}>
                                        <TableCell component = "th" scope = "row">{row.name}</TableCell>
                                        <TableCell>{row.author}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default withTracker(() => {
    const subsription = Meteor.subscribe('acts');
    return {
        isReady : subsription.ready(),
        donations : Acts.find({}).fetch()
    };
})(ActList)