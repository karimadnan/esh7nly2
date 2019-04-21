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

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#4a148c' }, // custom color in hex
        secondary: { 'A400': '#ff9800' },
        textColor: { 500: '#fafafa' }  // custom color in hex
    },
});

const styles = theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    }
});

class Account extends Component {

    state = {
        value: 0,
        headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        msgs: {
            EN: ["Hey", "Yo", "Howdy", "Sup"],
            AR: ["باشااا", "عامل ايه ياسطاااا", "انتا تانى"]
        },
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
        switch(health){
        case 3: {
            return (
                <span>
                    <span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-hearts"/>
                </span>
            )
        }
        case 2: {
            return (
                <span>
                    <span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-emptyHearts"/>
                </span>
            )
        }
        case 1: {
            return (
                <span>
                    <span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-emptyHearts"/><span class="svg-icon svg-icon-emptyHearts"/>
                </span>
            )
        }
        case 0: {
            return (
                <span>
                    <span class="svg-icon svg-icon-emptyHearts"/><span class="svg-icon svg-icon-emptyHearts"/><span class="svg-icon svg-icon-emptyHearts"/>
                </span>
            )
        }
        } 
    }

    Current(){
        if(this.state.value === 0){
            return(
            <div>
                <h1 style={{color: "black"}}>
                <span style={{color: "purple"}}>{this.props.lang === "EN" ? 
                this.state.msgs.EN[Math.floor(Math.random() * this.state.msgs.EN.length)]
                :
                this.state.msgs.AR[Math.floor(Math.random() * this.state.msgs.AR.length)]}
                </span>, {this.props.loginData.userName}</h1>
                    <h3 style={{fontFamily: "impact", color: "black", textTransform: 'uppercase'}}>Account Status:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: this.state.status === "active" ? "Lime" : "Red", fontWeight: "bold"}} >{this.state.status}</span></h3>
                    <h3 style={{fontFamily: "impact", color: "black"}}>Health:{this.healthBar(this.state.health)}</h3><p style={{color: "black"}}>({this.props.lang === "EN" ? "You lose health if you provide a fake transaction id at 0 health your account will be banned" : "هتخسر هيلث لو بعت رقم عملية تحويل وهمى لو الهيلث خلص الاكونت هيتقفل"})</p>
                    <h3 style={{fontFamily: "impact", color: "black"}}>Email:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: "white"}} class="menuLabel-small menuLabel-purple">{this.state.email}</span></h3>
                    <h3 style={{fontFamily: "impact", color: "black"}}>Phone:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: "white"}} class="menuLabel-small menuLabel-purple">{this.state.phone}</span></h3>
                    <h3 style={{fontFamily: "impact", color: "black"}}>Points: <span style={{fontFamily: "arial", color:"white"}} class="menuLabel-small menuLabel-purple"> <CountUp duration={5} end={this.state.vouchPoints}/>-GG Points</span></h3>
                    <p style={{color: "black"}}>({this.props.lang === "EN" ? "You gain GG points on every successful purchase you make, you can use them to redeem prizes" : "هتاخد اشحنلى بوينتس على كل شحنة, تقدر تبدلهم بجوايز"})</p>

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
    const { classes } = this.props;
    const { value } = this.state;
    if (!this.props.loginData.loggedState || this.props.loginData.isAdmin){
        return (
            <div class ="GG-BG-INVERSE">
            <div class="container">
              <div class="errorBG" style={{color: "white"}}>
                  <h1>403 (Forbidden)</h1>
                  <p> Ooops Something Went Wrong.</p>
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
                <div class ="GG-BG-INVERSE">
                    <div class="container" style={{color: "white"}}>
                        {!this.state.status && 
                        <div>
                            <PacmanLoader
                                css={override}
                                sizeUnit={"px"}
                                size={100}
                                color={'#FFFF00'}
                                loading={true}/>
                            <h2 style={{color: "white"}}>Loading...</h2>
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
                                    <Tab label={<h4 style={{fontWeight: "bold", color: value !== 0 && "white"}}>Profile</h4>} />
                                    <Tab label={<h4 style={{fontWeight: "bold", color: value !== 1 && "white"}}>Orders</h4>} />
                                    <Tab label={<h4 style={{fontWeight: "bold", color: value !== 2 && "white"}}>History</h4>} />
                                    <Tab label={<h4 style={{fontWeight: "bold", color: value !== 3 && "white"}}>Settings</h4>} />
                                    </Tabs>
                                </AppBar>
                            </MuiThemeProvider>
                            <div class="ProfileBGW">
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
        server: state.server,
        lang: state.extras.lang
    }
  }
  
  export default withStyles(styles)(connect(mapStateToProps)(Account));