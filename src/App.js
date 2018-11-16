import React, {Component} from 'react'
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import {createMuiTheme} from '@material-ui/core/styles/'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {red} from '@material-ui/core/colors/red'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { Button, ExpansionPanelSummary } from '@material-ui/core';
import {withTracker} from 'meteor/react-meteor-data'

import Home from './Home'
import Donate from './Donate'
import ViewDonations from './ViewDonations'
import AdminLogin from './AdminLogin';
import ManageActs from'./admin/ManageActs'
import ManageDonations from './admin/ManageDonations'
import Display from './admin/Display'



const muiTheme = createMuiTheme({
    palette: {
      primary: {
          main: '#ef5350',
      },
      secondary: {
        main: '#ec407a',
      },
    },
  });

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            open : false,
            iOS : process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent),
        }
    }
    //Copy pasta from React Router Documentation
    PrivateRoute = (({ component: Component, ...rest }) => {
        if(!this.props.isReady)
        {
            return (<Route {...rest} render={props => (<Component {...props} />)}/>);
        }
        return (
            <Route
            {...rest}
            render={props =>
                 this.props.currUser && this.props.currUser.role === 1 ? (
                <Component {...props} />
                ) : (
                <Redirect
                    to={{
                    pathname: "/",
                    state: { from: props.location }
                    }}
                />
                )
            }
            />
        );
    });

    handleClick()
    {
        this.setState({open : true});
    }

    handleClose()
    {
        this.setState({open : false});
    }
    handleOpen()
    {
        this.setState({open : true});
    }
    
    //copy pasta from React Router Documentaiton

    
    rightDrawer()
    {
        //let role = Meteor.user().role;
        if(this.props.isReady)
        {
            let Objs = [];
            Objs.push(<ListItem key="home" button = {true} component = {NavLink} exact to = '/'>Home</ListItem>);

            if(this.props.currUser == null)
            {
                // return(
                //     <List>
                //         <div onClick = {this.handleClose.bind(this)}>
                //             <ListItem button = {true} component = {NavLink} exact to = '/'>Home</ListItem>
                //         </div>
                //     </List>
                // );
            }
            if(this.props.currUser && this.props.currUser.role === 1)
            {
                Objs.push(<ListItem key="macts" button = {true} component = {NavLink} to = '/admin/manage-acts'>Manage Acts</ListItem>)
                Objs.push(<ListItem key="mdon" button = {true} component = {NavLink} to = '/admin/manage-donations'>Manage Donations</ListItem>)
                Objs.push(<ListItem key="display" button = {true} component = {NavLink} to = '/admin/display'>Display Current Act</ListItem>)
                // return(
                //     <List>
                //         <div onClick = {this.handleClose.bind(this)}>
                //         <ListItem button = {true} component = {NavLink} exact to = '/'>Home</ListItem>
                //         <ListItem button = {true} component = {NavLink} to = '/admin/manage-acts'>Manage Acts</ListItem>
                //         <ListItem button = {true} component = {NavLink} to = '/admin/manage-donations'>Manage Donations</ListItem>
                //         <ListItem button = {true} component = {NavLink} to = '/admin/display'>Display Current Act</ListItem>
                //         <ListItem button = {true} component = {NavLink} to = '/donate'>Donate</ListItem>
                //         <ListItem button = {true} component = {NavLink} to = '/view-donations'>View Your Donations</ListItem>
                //         </div>
                //     </List>
                // );
            }
            if (this.props.currUser)
            {
                Objs.push(<ListItem key="don" button = {true} component = {NavLink} to = '/donate'>Donate</ListItem>)
                Objs.push(<ListItem key="viewDon" button = {true} component = {NavLink} to = '/view-donations'>View Your Donations</ListItem>)
                // return(
                //     <List>
                //         <div onClick = {this.handleClose.bind(this)}>
                //         <ListItem button = {true} component = {NavLink} exact to = '/'>Home</ListItem>
                //         <ListItem button = {true} component = {NavLink} to = '/donate'>Donate</ListItem>
                //         <ListItem button = {true} component = {NavLink} to = '/view-donations'>View Your Donations</ListItem>
                //         </div>
                //     </List>
                // );
            }
            return (
                <List>
                    <div onClick = {this.handleClose.bind(this)}>
                        {Objs.map((elem) => {
                            return elem;
                        })}
                    </div>
                
                </List>
                
            )
        }

    }

    logout()
    {
        Meteor.logout((err) => {if(err) alert(err);});
    }

    login()
    {
        Meteor.loginWithFacebook((err) => {
            if(err) alert(err);
        });
    }

    render()
    {
        return(
        <MuiThemeProvider theme = {muiTheme}>
            <BrowserRouter>
                <div id = "content">
                    <AppBar>
                        <Toolbar color = 'secondary' style = {{display : 'flex', flexFlow : 'row nowrap', justifyContent : "space-between"}}>
                            <IconButton onClick = {this.handleClick.bind(this)}>
                            <MenuIcon />
                            </IconButton>
                            <Typography style = {{position : 'absolute', left : '50%', top : '50%', transform : "translate(-50%, -50%)"}} variant = 'title' color = 'default'><div style={{color:'white'}}>Aid The Cause 2018</div></Typography>
                            {Meteor.userId() ? <Button onClick = {this.logout.bind(this)}>Logout</Button> : <Button onClick = {this.login.bind(this)}>Login</Button>}
                        </Toolbar>
                    </AppBar>

                    <SwipeableDrawer disableBackdropTransition={!this.state.iOS} disableDiscovery={this.state.iOS} open = {this.state.open} onOpen = {this.handleOpen.bind(this)} onClose = {this.handleClose.bind(this)}>
                        {this.rightDrawer()}
                    </SwipeableDrawer>

                    <div id = "main-content" style = {{paddingTop : '50px'}}>
                        <Switch>
                            <Route exact path = '/' component = {Home}/>
                            <Route path = '/donate' component = {Donate}/>
                            <Route path = '/view-donations' component = {ViewDonations} />
                            <Route path = '/admin/login' component = {AdminLogin}/>
                            <this.PrivateRoute path = '/admin/manage-acts' component = {ManageActs}/>
                            <this.PrivateRoute path = '/admin/manage-donations' component = {ManageDonations}/>
                            <this.PrivateRoute path = '/admin/display' component = {Display}/>
                            {/* <Route path = '/' component = {NotFound}/> */}
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
        );
    }
}

export default withTracker(() => {
    const subsription = Meteor.subscribe('users');
    let userId = Meteor.userId();
    return {
        isReady: subsription.ready(),
        currUser: Meteor.user(),
    };
})(App);