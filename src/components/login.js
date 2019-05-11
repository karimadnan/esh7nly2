import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import ReactRouter from 'flux-react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginFunction} from '../actions/index';
import isEmail from 'validator/lib/isEmail';
import axios from 'axios';
import amumu from '../Images/amumusad.png';
import Modal from 'react-responsive-modal';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import LoginIcon from '@material-ui/icons/Forward';
import SignUpIcon from '@material-ui/icons/AccountCircle';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import compose from 'recompose/compose';

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

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        fontSize: 10,
        minWidth: 310,
        maxWidth: 310,
        [theme.breakpoints.up('lg')]: {
          fontSize: 15,
          minWidth: 350,
          maxWidth: 350,
        }
    },
    extendedIcon: {
        marginRight: theme.spacing.unit * 5,
    },
});

const theme = createMuiTheme({
    palette: {
        secondary: { main: '#00C853', contrastText: "#fff" }
    },
});

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class Login extends Component {

    state ={
        ErrorModal: false,
        ErrorMsg: '',
        Url: this.props.server.main,
        Phone: '',
        Password: ''
    }

updateInput(key, value) {
this.setState({ [key]: value });
}

onOpenModal = (type) => {
this.setState({[type]: true });
};

onCloseModal = (type) => {
this.setState({[type]: false });
};

keyClicked (e) {
    if (e.key === "Enter"){
    this.login();
    }
}

login() {
    var that=this;
    const { t } = this.props;
    if(this.state.Phone  && this.state.Password){

    if(isEmail(this.state.Phone)){
            axios.get(`${this.state.Url}adminLogin?Email=${this.state.Phone}&Password=${this.state.Password}`)
            .then(function (response) {
                that.props.loginFunction(response.data.data, 'login')
                if(that.props.loginData.session === 1){  
                    ReactRouter.goTo("/agentdashboard") 
                } 
                else if(that.props.loginData.session === 2){ 
                    ReactRouter.goTo("/admindashboard") 
                }
            })
            .catch(function (error) {
                if (error.response.data.message){
                    that.setState({
                    ErrorModal:true,
                    ErrorMsg:error.response.data.message
                    })
                }
            });
        }
        else{
            axios.get(`${this.state.Url}login?Phone=${this.state.Phone}&Password=${this.state.Password}`)
            .then(function (response) {
                that.props.loginFunction(response.data.data, 'login')
                ReactRouter.goTo("/account")
            })
            .catch(function (error) {
            if (error.response.data.message){
                that.setState({
                ErrorModal:true,
                ErrorMsg:error.response.data.message
                })
            }

            }); 
        }

    }
    else{
    this.setState({ErrorModal: true, ErrorMsg: `${t('loginEmpty')}`})
    }
} 

render() {
    const { classes } = this.props;
    const { t } = this.props;
    if(this.props.loginData.loggedState){
        return(
            <div className ="GG-BG-INVERSE">
                <div className="container">
                        <div className="BlackBG" style={{color: "white", textAlign: "center"}}>
                            <div className="badge-logo"/>
                                <h1>{t('welcome')}, {this.props.loginData.userName}</h1>
                                <h4>{t('alreadyLogged')} <span style={{color: "#3F51B5", cursor: "pointer", textDecoration: "underline"}} onClick={()=>{!this.props.loginData.isAdmin ? 
                                    ReactRouter.goTo("/account") 
                                : this.props.loginData.isAdmin && this.props.loginData.session === 1 ?  
                                    ReactRouter.goTo("/agentdashboard") 
                                : this.props.loginData.isAdmin && this.props.loginData.session === 2 ? 
                                    ReactRouter.goTo("/admindashboard") 
                                : undefined}}>{t('account')}</span></h4>
                        </div>
                </div>
                <Navbar />
            </div>
        )
    }

    return (
        <div className ="GG-BG-INVERSE">
            <div className="container">
            <div className="BlackBG">
                        <div className="badge-logo"/>
                            <div className="form-group has-feedback" style={{textAlign: i18next.language === "EN" ? "left" : "right"}}>
                                <div className="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                        <label style={{color: this.state.Phone.length === 11 || isEmail(this.state.Phone) ? "green" : "#3F51B5"}}>{this.state.Phone.length === 11 || isEmail(this.state.Phone) ? "":'*'} {t('phone')}</label>
                                        <input className="form-control" type="text" onKeyPress={this.keyClicked.bind(this)} onChange={e => this.updateInput("Phone", e.target.value)} placeholder={t('phone')} required></input>
                                        <br/>
                                </div>

                                <div className="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                        <label style={{color: this.state.Password.length >= 8 ? "green" : "#3F51B5"}}>{this.state.Password.length >= 8 ? "":'*'} {t('password')}</label>
                                        <input className="form-control" type="text" onKeyPress={this.keyClicked.bind(this)} onChange={e => this.updateInput("Password", e.target.value)} placeholder={t('password')} required></input>
                                        <br/>
                                </div>

                                <div className="col-xs-12 col-md-12 col-lg-12">
                                    <Grid container justify="center" alignItems="center">
                                        <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.login()}} className={classes.fab}>
                                            <LoginIcon className={classes.extendedIcon} />
                                            {t('login')}
                                        </Fab>
                                    </Grid>
                                </div>

                                <div className="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                    <h4 style={{color: "grey"}}>{t('signUpText')}</h4>
                                </div>

                                <MuiThemeProvider theme={theme}>
                                    <div className="col-xs-12 col-md-12 col-lg-12">
                                        <Grid container justify="center" alignItems="center">
                                            <Fab color="secondary" variant="extended" aria-label="Next" onClick={()=>{ReactRouter.goTo("/signup")}} className={classes.fab}>
                                                <SignUpIcon className={classes.extendedIcon} />
                                                {t('signUp')}
                                            </Fab>
                                        </Grid>
                                    </div>
                                </MuiThemeProvider>

                            </div>
                        </div>
                    </div>
                <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
                    styles={ErrorStyle}>
                    <h3 className="col-xs-6">{this.state.ErrorMsg}</h3>
                    <img style ={{width: 150, height: 120}} className="col-xs-6" src={amumu} alt=""></img> 
                </Modal>
                <Navbar />
         </div>

    );
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
        loginFunction
      },
      dispatch,
    )
  
export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps, matchDispatchToProps),
)(Login); 
