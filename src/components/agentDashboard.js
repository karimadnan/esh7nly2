import React, { Component } from 'react';
import Navbar from './navbar';
import {connect} from 'react-redux';
import axios from 'axios';
import Leads from '../containers/leads';
import Loader from '../containers/loader';
import {updateProfilePhoto} from '../actions/index';
import {bindActionCreators} from 'redux';
import { withNamespaces } from 'react-i18next';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import compose from 'recompose/compose';
import Pp from '../Images/avatar.png';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import MyOrders from '../containers/adminOrders';

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#3e2723' }, // custom color in hex
        secondary: { 'A400': '#ffab00' }
    }
});

const styles = theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        marginTop: theme.spacing.unit * 2
    },
    Avatar: {
        margin: 10,
        width: 150,
        height: 150,
      },
    chip: {
        margin: theme.spacing.unit,
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20,
        }
    },
});

class AgentDashboard extends Component {

    state = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        status: '',
        email: '',
        phone: '',
        ordersData: {},
        totalOrders: 0,
        failed: 0,
        passed: 0,
        value: 0,
        nav: 'profile',
        agentOrders: []
    }
    
    componentDidMount(){
        var that = this
        axios.get(`${this.state.Url}getAdminHistory`, {headers: this.state.headers})
        .then(function (response) {
        })
        .catch(function (error) {
        //   that.setState({loaded: true})
        })
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    updateInput(key, value) {
        this.setState({ [key]: value });
    }
    
Current(){
    const { value } = this.state;

        if(value === 0){
            return(
                <Leads/>
            )
        }
      else if (value === 1){
          return(
                <MyOrders/>
        )
      }
}

render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { t } = this.props;
    if (!this.props.loginData.loggedState || !this.props.loginData.isAdmin){
        return (
            <div className="GG-BG-INVERSE">
            <div className="container">
              <div className="WhiteBG" style={{color: "black"}}>
                  <h1>403 (Forbidden)</h1>
                  <p> {t('403')}</p>
              </div>
            </div>
            <Navbar />
          </div>
        )
        }
        return (
                <div className="GG-BG-INVERSE">
                      <div className="container" style={{color: "white"}}>
                        <div className={classes.root}>
                            <MuiThemeProvider theme={theme}>
                                <AppBar position="static" color="primary" className={classes.appBar}>
                                    <Tabs
                                        value={value}
                                        onChange={this.handleChange}
                                        variant="scrollable"
                                        scrollButtons="on"
                                        indicatorColor="secondary"
                                        textColor="secondary"
                                    >
                                    <Tab label={<h4 style={{fontWeight: "bold", color: value !== 0 && "white"}}>Leads</h4>} />
                                    <Tab label={<h4 style={{fontWeight: "bold", color: value !== 1 && "white"}}>My orders</h4>} />
                                    </Tabs>
                                </AppBar>
                                <Grid container justify="center" alignItems="center">
                                    <Avatar alt="Profile Picture" src={this.props.loginData.photo ? this.props.loginData.photo : Pp} className={classes.Avatar} />
                                </Grid>
                                <Grid container justify="center" alignItems="center">
                                    <Chip
                                        color="primary"
                                        label="Passed Orders (10)"
                                        className={classes.chip}
                                    />
                                </Grid>
                            </MuiThemeProvider>
                        <div className="ProfileBGW">
                                {this.Current()}
                        </div>
                     </div>
                    </div>
                    <Navbar />
            </div>
            )
    }
}

function mapStateToProps(state){
    return {
        loginData: state.loginSession,
        server: state.server
    }
  }
  
const matchDispatchToProps = dispatch => bindActionCreators(
    {
        updateProfilePhoto
    },
    dispatch,
)

export default compose(
withStyles(styles),
withNamespaces(),
connect(mapStateToProps, matchDispatchToProps),
)(AgentDashboard);