import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import Modal from 'react-responsive-modal';
import amumu from '../Images/amumusad.png';
import fortniteDab from '../Images/fortnitedab.png';
import {connect} from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import isInt from 'validator/lib/isInt';
import Footer from './footer';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import LoginIcon from '@material-ui/icons/Forward';
import { withNamespaces } from 'react-i18next';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import i18next from 'i18next';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class SignUp extends Component {

  state = {
    Url: this.props.server.main,
    name: '',
    phone: '',
    email: '',
    password: '',
    SuccessMsg: '',
    SuccessModal: false,
    ErrorMsg: '',
    ErrorModal: false,
    load: false,
    expired: "false",
    confirmPassword: '',
    captcha: '',
    running: false
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

onChange = (value) => {
  var headers = {
    'Content-Type': 'application/json'
  } 
  this.setState({captcha: value} ,() =>{
    let Data = {secret: "6LdZBo0UAAAAAHmWc3Anr9foEnlQNrzuNu-q1QZ2", response: this.state.captcha}
    axios.post("https://www.google.com/recaptcha/api/siteverify", Data, {headers: headers})
    .then(function (response) {
        console.log("RESPONSE", response)
    })
    .catch(function (error) {
        console.log("ERROR", error)
  })
  })
}

onExpired = () => {
  this.setState({captcha: false})
}


createUser = () => {
  
  var headers = {
    'Content-Type': 'application/json'
  } 

  var that = this
 if (this.state.name.length >= 6) {
   if (this.state.password === this.state.confirmPassword){
    if (this.state.phone.length == 11 && isInt(this.state.phone)){
      if (isEmail(this.state.email)){
        if(this.state.password.length >= 7){
          if(this.state.captcha){
            this.setState({running: true})
            let Data = {Name: this.state.name, Phone: this.state.phone, Password: this.state.password, Email: this.state.email}
            axios.post(this.state.Url+"signup", Data, {headers: headers})
            .then(function (response) {
              that.setState({SuccessModal: true, 
                             SuccessMsg: "Your account has been created go to your email to verfiy it.",
                             captcha: false,
                             name: '',
                             password: '',
                             confirmPassword: '',
                             phone: '',
                             email: '',
                            running: false})

            })
            .catch(function (error) {
              that.setState({ErrorModal: true, ErrorMsg: error.response.data.message, running: false})  
          })
        }
        else {
          this.setState({ErrorModal: true, ErrorMsg: "Please check the captcha box."})  
        }
        }
        else {
          this.setState({ErrorModal: true, ErrorMsg: "Your password is weak."})    
        }
      }
      else {
      this.setState({ErrorModal: true, ErrorMsg: "Email is invalid."})    
      }
    }
    else {
      this.setState({ErrorModal: true, ErrorMsg: "Mobile number is invaild."})
    }
  }
  else {
    this.setState({ErrorModal: true, ErrorMsg: "Passwords does not match."})
  }
}
else {
  this.setState({ErrorModal: true, ErrorMsg: "Please put your first and second name."})
}
}

render() {
  const SuccessStyle = {
    overlay: {
      background: "transparent"
    },
    modal: {
      backgroundColor: 'rgba(124, 214, 105, 0.9)',
      color: "white",
      borderRadius: '10px',
    },
  }
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
  const { t } = this.props;
  const { classes } = this.props;
  return(
  
<div class="GG-BG-INVERSE">
      <Modal open={this.state.SuccessModal} onClose={this.onCloseModal.bind(this,'SuccessModal')} center
            styles={SuccessStyle}>
            <h3 class="col-xs-6">{this.state.SuccessMsg}</h3>
            <img style ={{width: 150, height: 120}} class="col-xs-6" src={fortniteDab} alt=""></img>
      </Modal>
      <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
              styles={ErrorStyle}>
            <h3 class="col-xs-6">{this.state.ErrorMsg}</h3>
            <img style ={{width: 150, height: 120}} class="col-xs-6" src={amumu} alt=""></img>
      </Modal>
        <div class="container">
              <div class="BlackBG">
                      {i18next.language === "EN" ? 
                            <div className="badge-logo"/>:
                            <div className="badge-logo-ar"/>}
                      <div class="form-group has-feedback">
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: this.state.name.length >= 6 ? "green" : "#3F51B5"}}>{this.state.name.length >= 6 ? "":'*'} Your name</label>
                                <input class="form-control" value={this.state.name} type="text" onChange={e => this.updateInput("name", e.target.value)} placeholder="Your name" required></input>
                                <br/>
                          </div>
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: this.state.phone.length == 11 && isInt(this.state.phone) ? "green" : "#3F51B5"}}>{this.state.phone.length == 11 && isInt(this.state.phone) ? "":'*'} Phone number</label>
                                <input class="form-control" value={this.state.phone} type="text" onChange={e => this.updateInput("phone", e.target.value)} placeholder="Phone number" required></input>
                                <br/>
                          </div>
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: isEmail(this.state.email) ? "green" : "#3F51B5"}}>{isEmail(this.state.email) ? "":'*'} Email address</label>
                                <input class="form-control" value={this.state.email} type="text" onChange={e => this.updateInput("email", e.target.value)} placeholder="Your email ex:example@gmail.com" required></input>
                                <br/>
                          </div>
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: this.state.password.length >= 7 ? "green" : "#3F51B5"}}>{this.state.password.length >= 7 ? "":'*'} Password</label>
                                <input class="form-control" value={this.state.password} type="password" onChange={e => this.updateInput("password", e.target.value)} placeholder="Password" required></input>
                                <br/>
                          </div>
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: this.state.password === this.state.confirmPassword && this.state.confirmPassword != '' ? "green" : "#3F51B5"}}>{this.state.password === this.state.confirmPassword && this.state.confirmPassword != '' ? "":'*'} Confirm password</label>
                                <input class="form-control" value={this.state.confirmPassword} type="password" onChange={e => this.updateInput("confirmPassword", e.target.value)} placeholder="Confirm password" required></input>
                                <br/>
                          </div>
                          <div class="recaptcha col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <ReCAPTCHA
                                onExpired={this.onExpired}
                                sitekey="6LdZBo0UAAAAAHmWc3Anr9foEnlQNrzuNu-q1QZ2"
                                onChange={this.onChange}
                                />
                            
                            <br/>
                        </div>
                        <div className="col-xs-12 col-md-12 col-lg-12">
                            {this.state.running && 
                            <Grid container justify="center" alignItems="center">
                              <CircularProgress className={classes.progress} />
                            </Grid>
                            }
                            <Grid container justify="center" alignItems="center">
                                <Fab disabled={this.state.running} color="primary" variant="extended" aria-label="Next" onClick={()=>{this.createUser()}} className={classes.fab}>
                                    <LoginIcon className={classes.extendedIcon} />
                                    {t('signUp')}
                                </Fab>
                            </Grid>
                        </div>
                    </div>
                </div>
              <br/><br/>
        </div>
        <Navbar />
        <Footer/>
</div>
  )
}
}


function mapStateToProps(state){
  return {
      server: state.server
  }
}

export default compose(
  withStyles(styles),
  withNamespaces(),
  connect(mapStateToProps),
)(SignUp); 