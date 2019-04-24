import React, { Component } from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import {connect} from 'react-redux';
import CountUp from 'react-countup';
import axios from 'axios';
import Orders from './userOrders';
import OrdersHistory from './userOrdersHistory';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import {
    BrowserView,
    MobileView,
  } from "react-device-detect";
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';
import Person from '@material-ui/icons/VerifiedUser';
import Mood from '@material-ui/icons/Favorite';
import Email from '@material-ui/icons/Email';
import StayPrimaryPortrait from '@material-ui/icons/StayPrimaryPortrait';
import Whatshot from '@material-ui/icons/Redeem';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Pp from '../Images/avatar.png';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#3F51B5' }, // custom color in hex
        secondary: { 'A400': '#ff9800' },
        textColor: { 500: '#fafafa' }  // custom color in hex
    },
    typography: {
        useNextVariants: true,
    },
});

const styles = theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    Avatar: {
        margin: 10,
        width: 150,
        height: 150,
      }
});

class Account extends Component {

    state = {
        value: 0,
        headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        status: '',
        email: '',
        phone: '',
        health: '',
        vouchPoints: '',
        nav: 'profile'
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    updateInput(key, value) {
        this.setState({ [key]: value });
    }
    
    healthBar(health){
        var i;
        var hearts = []
            for (i = 0; i < health; i++) {
                hearts.push(<span key={i} className="svg-icon svg-icon-hearts"/>)
            }
            for (i = 0; i < 3-health; i++) {
                hearts.push(<span key={i} className="svg-icon svg-icon-emptyHearts"/>)
            }
          return hearts
    }

    Current(){
        const { t } = this.props;
        const { classes } = this.props;
        const accountStatus = this.state.status
        if(this.state.value === 0){
            return(
            <div style={{textAlign: i18next.language === "EN" ? "left" : "right"}}>
                <Grid container justify="center" alignItems="center">
                    <Avatar alt="Profile Picture" src={Pp} className={classes.Avatar} />
                </Grid>
                <h1 style={{color: "black"}}>
                <span style={{color: "#3F51B5"}}>
                {t('welcome')}
                </span>, {this.props.loginData.userName}</h1>
                    <ListItem button>
                        <ListItemIcon>{<Person />}</ListItemIcon>
                        <ListItemText primary={<h3>{t('accStatus')}: <span style={{fontFamily: "arial", color: this.state.status === "active" ? "Lime" : "Red", fontWeight: "bold"}} >
                        {accountStatus === "pending" ? 
                        t('accountPendingStatus')
                        : accountStatus === "active" ?
                        t('accountActiveStatus')
                        : accountStatus === "banned" ?
                        t('accountBannedStatus')
                        : undefined}
                        </span></h3>} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>{<Mood />}</ListItemIcon>
                        <ListItemText primary={<h3>{t('health')}: {this.healthBar(this.state.health)}</h3>} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>{<Email />}</ListItemIcon>
                        <ListItemText primary={<h3>{t('email')}: {this.state.email}</h3>} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>{<StayPrimaryPortrait />}</ListItemIcon>
                        <ListItemText primary={<h3>{t('phone')}: {this.state.phone}</h3>} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>{<Whatshot />}</ListItemIcon>
                        <ListItemText primary={<h3>{t('ggPoints')}: <CountUp duration={5} end={this.state.vouchPoints}/></h3>} />
                    </ListItem>
            </div>

            )
        }
      else if (this.state.value === 1){
          return(
            <Orders/>
        )
      }
      else if (this.state.value === 2){
        return(
          <OrdersHistory/>
      )
    }
    }

render() {
    const { t } = this.props;
    const { classes } = this.props;
    const { value } = this.state;

    if (!this.props.loginData.loggedState || this.props.loginData.isAdmin){
        return (
            <div class ="GG-BG-INVERSE">
            <div class="container">
              <div class="WhiteBG" style={{color: "black"}}>
                  <h1>403 (Forbidden)</h1>
                  <p> {t('403')}.</p>
              </div>
            </div>
            <Navbar />
          </div>
        )
        }
    else{
        if(!this.state.status){
            let Data = {token: this.props.loginData.token}
            var that = this
            axios.post(this.state.Url+"getUserbyId", Data, {headers: this.state.headers})
            .then(function (response) {
                const info = response.data.doc
                that.setState({status: info.status, 
                    email: info.Email,
                    phone: info.Phone,
                    health: info.health,
                    vouchPoints: info.VouchPoints})
            })
            .catch(function (error) {
                // console.log(error.response.data.message, "FAIL")
            })
        }

        return (
                <div className="GG-BG-INVERSE">
                    <div className="container" style={{color: "white"}}>
                        {!this.state.status && 
                        <div>
                            <PacmanLoader
                                css={override}
                                sizeUnit={"px"}
                                size={100}
                                color={'#FFFF00'}
                                loading={true}/>
                            <h2 style={{color: "white"}}>{t('loading')}...</h2>
                        </div>}
    
                      {this.state.status && 
                        <div className={classes.root}>
                            <MuiThemeProvider theme={theme}>
                                <AppBar position="static" color="primary">
                                    <Tabs
                                    value={value}
                                    onChange={this.handleChange}
                                    variant="scrollable"
                                    scrollButtons="on"
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                    >
                                    <Tab label={<h4 style={{fontWeight: "bold", color: value !== 0 && "white"}}>{t('profile')}</h4>} />
                                    <Tab label={<h4 style={{fontWeight: "bold", color: value !== 1 && "white"}}>{t('orders')}</h4>} />
                                    <Tab label={<h4 style={{fontWeight: "bold", color: value !== 2 && "white"}}>{t('history')}</h4>} />
                                    </Tabs>
                                </AppBar>
                            </MuiThemeProvider>
                            <div className="ProfileBGW">
                                    {this.Current()}
                            </div>
                     </div>} 
                    </div>
                    <br/>
                    <Navbar page={"Account"}/>
                </div>
            )
    }
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        loginData: state.loginSession,
        server: state.server
    }
  }
  
  export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps),
  )(Account);