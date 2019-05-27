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
import Orders from '../containers/userOrders';
import Profile from '../containers/userProfile';
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import amumu from '../Images/amumusad.png';
import Modal from 'react-responsive-modal';
import {updateProfilePhoto} from '../actions/index';
import {bindActionCreators} from 'redux';
import {Helmet} from "react-helmet";

const ErrorStyle = {
    overlay: {
      background: "transparent"
    },
    modal: {
      backgroundColor: 'rgba(219, 105, 105, 0.9)',
      color: "white",
      borderRadius: '10px',
    },
}

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#3F51B5' }, // custom color in hex
        secondary: { 'A400': '#ff9800' },
        textColor: { 500: '#fafafa' }  // custom color in hex
    }
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
      },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon1: {
        marginRight: theme.spacing.unit,
    },
    extendedIcon2: {
        marginRight: theme.spacing.unit * 3,
    },
    appBar: {
        marginTop: theme.spacing.unit * 2
    }
});

class Account extends Component {

    state = {
        value: 0,
        ErrorModal: false,
        ErrorMsg: '',
        headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        status: '',
        email: '',
        phone: '',
        health: '',
        photo: '',
        fbStatus: '',
        vouchPoints: '',
        actKey: '',
        nav: 'profile'
    }

    onOpenModal = (type) => {
        this.setState({[type]: true });
        };
        
    onCloseModal = (type) => {
        this.setState({[type]: false });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    Current(){
        const userName = this.props.loginData.userName
        const { t } = this.props;
        if(this.state.value === 0){
            return(
            <div>
                <Helmet>
                    <title>{t('profileTitle', {userName})}</title>
                    <meta name="description" content={t('profileTitle', {userName})} />
                </Helmet>
                <Profile/>
            </div>
            )
        }
      else if (this.state.value === 1){
          return(
          <div>
            <Helmet>
                <title>{t('ordersTitle', {userName})}</title>
                <meta name="description" content={t('ordersTitle', {userName})} />
            </Helmet>
            <Orders/>
          </div>
        )
      }
      else if (this.state.value === 2){
        return(
          <div >
            <Helmet>
                <title>{t('historyTitle', {userName})}</title>
                <meta name="description" content={t('historyTitle', {userName})} />
            </Helmet>
          </div>
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
            <Helmet>
                <title>403 (Forbidden)</title>
                <meta name="description" content="403 (Forbidden)" />
            </Helmet>
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
                                            <Tab label={<h4 style={{fontWeight: "bold", color: value !== 0 && "white"}}>{t('profile')}</h4>} />
                                            <Tab label={<h4 style={{fontWeight: "bold", color: value !== 1 && "white"}}>{t('orders')}</h4>} />
                                            <Tab label={<h4 style={{fontWeight: "bold", color: value !== 2 && "white"}}>{t('ordersHistory')}</h4>} />
                                        </Tabs>
                                    </AppBar>
                                </MuiThemeProvider>
                                <div className="ProfileBGW">
                                        {this.Current()}
                                </div>
                            </div>
                        </div>

                    <Navbar />
                    <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
                        styles={ErrorStyle}>
                        <h3 className="col-xs-6">{this.state.ErrorMsg}</h3>
                        <img style ={{width: 150, height: 120}} className="col-xs-6" src={amumu} alt=""></img> 
                    </Modal>
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
  )(Account);