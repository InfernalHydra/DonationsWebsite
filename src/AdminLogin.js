import React, { Component } from "react";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default class AdminLogin extends Component
{
    render()
    {
        return(
            <div style = {{width : '80%', margin: 'auto'}}>
                <h1>Log into Admin Panel</h1>
                <TextField
                        id = 'pass'
                        type = 'password'
                        label = "Admin Key"
                        step = 'any'
                        placeholder = ''
                        fullWidth
                    ></TextField>
                    <Button style = {{marginTop : '30px'}} variant="contained">Submit</Button>
            </div>
        );
    }

}