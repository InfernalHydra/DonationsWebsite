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
import Clear from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import Check from '@material-ui/icons/Check'
import {Session} from  'meteor/session';
import TextField from '@material-ui/core/TextField'
import { MenuItem } from '@material-ui/core';

class ManageDonations extends Component
{
    constructor(props)
    {
        super(props);
        Session.set('search', '');        
        this.state = {
            currName : "",
            errorTextTitle : "",            
            types: ["Received","Fufilled", "Rejected"],
            status: "Received"
        }
    }
    handleSearchChange(e) {
        Session.set('search', e.target.value);        
    }
    handleClick(donationID)
    {
        Meteor.call('bids.update', donationID);
    }
    handleReject(donationID) {
        Meteor.call('bids.reject', donationID);
    }
    handleChange(e) {
        let c = e.target.value
        this.setState({status:c})            
    }
    render()
    {        
        return(
            <div style = {{width : '80%', margin : 'auto'}} id = 'donations-title-wrapper'>
                    <h1>Manage Donations</h1>

                    <div id = 'form-wrapper'>
                        <div style = {{display : 'inline'}} id = 'form'>
                            <TextField
                                style = {{width : '250px'}}
                                id = 'search'
                                label = "Search"
                                type = 'text'
                                error = {this.state.errorTextTitle !== "" ? true : false}
                                helperText = {this.state.errorTextTitle}
                                onChange = {this.handleSearchChange.bind(this)}
                            ></TextField>

                            <TextField 
                            style = {{width : '200px', float:"right"}}
                            select
                            label="Status"
                            value = {this.state.status}
                            onChange = {this.handleChange.bind(this)}>

                            {this.state.types.map((elem) => {

                                return <MenuItem key = {elem} value = {elem}>
                                    {elem}
                                </MenuItem>
                            })}

                        </TextField>                                                            
                        </div>
                    </div>
                    
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
                                    if (row.status == this.state.status) {
                                        return (
                                            <TableRow key = {index}>
                                                <TableCell>
                                                    <IconButton onClick = {this.handleClick.bind(this, row._id)}>
                                                        <Check />
                                                    </IconButton>
                                                    <IconButton onClick = {this.handleReject.bind(this, row._id)}>
                                                        <Clear />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell component = "th" scope = "row">{row.actName}</TableCell>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.userID}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell>{row.status}</TableCell>
                                            </TableRow>
                                        );
                                    }                                    
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
    const search = Session.get('search');        
    const query = {};
    query.name = {$regex : '(' + search + '\\S+|' + search + ')'};        
    //sort user by rank?    
    return {
        isReady : subscription.ready(),
        bids : Bids.find(query).fetch()
    }
})(ManageDonations)