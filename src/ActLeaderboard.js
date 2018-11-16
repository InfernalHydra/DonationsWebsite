import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import { Meteor } from 'meteor/meteor';


//TODO: Sum donations per act, leaderboard
export default class ActLeaderboard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data : [],
        };
    }
    render()
    {
        if(this.state.data === [])
        {
            return <div>loading</div>;
        }
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
                        {this.state.data !== [] && this.state.data.map((row, index) => {
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
    componentDidMount()
    {
        this.tick();
        this.timer = setInterval(() => this.tick(), 5000);
    }
    tick()
    {
        var self = this;
        Meteor.call('bids.getAggregate', (err, res) => {
            if(err)
            {
                alert(err);
            }
            else
            {
                self.setState({data : res});
            }
        })
    }
    componentWillUnmount()
    { 
        clearInterval(this.timer);
    }
}
