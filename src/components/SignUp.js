import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import Modal from 'react-responsive-modal';
import amumu from '../Images/amumusad.png';
import fortniteDab from '../Images/fortnitedab.png';
import {connect} from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import isInt from 'validator/lib/isInt';
import Footer from './footer';
import LOGO from '../Images/signuplogo.png';


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
    gender: '',
    captcha: false,
    confirmPassword: ''
  }
  
  componentWillMount(){
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
  this.googleVerify();
}

onExpired = () => {
  this.setState({captcha: false})
}

googleVerify = () =>{
  var headers = {
    'Content-Type': 'application/json'
  }
  axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    {
        secret: '6LdZBo0UAAAAAM4oSlDVO7GKo18i8ChWD7LF9hge',
        response: this.state.captcha
    }
  )
  .then(function (response) {
    console.log("Rres",response)
    this.setState({captcha: true})
  })
  .catch(function (error) {
    console.log("ERROR",error)
    this.setState({captcha: false})
})
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
            let Data = {Name: this.state.name, Phone: this.state.phone, Password: this.state.password, Gender: this.state.gender, Email: this.state.email}
            axios.post(this.state.Url+"signup", Data, {headers: headers})
            .then(function (response) {
              that.setState({SuccessModal: true, 
                             SuccessMsg: "Your account has been created go to your email to verfiy it.",
                             captcha: false,
                             name: '',
                             password: '',
                             confirmPassword: '',
                             phone: '',
                             email: ''})
            })
            .catch(function (error) {
              that.setState({ErrorModal: true, ErrorMsg: error.response.data.message})  
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
  return(
    
<div class="PrivacyBG">
      <br/><br/><br/>
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
              <div class="ProfileBG">

                <img src={LOGO} alt="Sign UP" class="SignUpLogo" width="500" height="200"/>

                  <div class="bordersep"/>
                      <br/>
                      <div class="form-group has-feedback">
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: this.state.name.length >= 6 ? "green" : "red"}}>{this.state.name.length >= 6 ? "":'*'} Your name</label>
                                <input class="form-control" type="text" onChange={e => this.updateInput("name", e.target.value)} placeholder="Your name" required></input>
                                <br/>
                          </div>
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: this.state.phone.length == 11 && isInt(this.state.phone) ? "green" : "red"}}>{this.state.phone.length == 11 && isInt(this.state.phone) ? "":'*'} Phone number</label>
                                <input class="form-control" type="text" onChange={e => this.updateInput("phone", e.target.value)} placeholder="Phone number" required></input>
                                <br/>
                          </div>
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: isEmail(this.state.email) ? "green" : "red"}}>{isEmail(this.state.email) ? "":'*'} Email address</label>
                                <input class="form-control" type="text" onChange={e => this.updateInput("email", e.target.value)} placeholder="Your email ex:example@gmail.com" required></input>
                                <br/>
                          </div>
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: this.state.password.length >= 7 ? "green" : "red"}}>{this.state.password.length >= 7 ? "":'*'} Password</label>
                                <input class="form-control" type="password" onChange={e => this.updateInput("password", e.target.value)} placeholder="Password" required></input>
                                <br/>
                          </div>
                          <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <label style={{color: this.state.password === this.state.confirmPassword && this.state.confirmPassword != '' ? "green" : "red"}}>{this.state.password === this.state.confirmPassword && this.state.confirmPassword != '' ? "":'*'} Confirm password</label>
                                <input class="form-control" type="password" onChange={e => this.updateInput("confirmPassword", e.target.value)} placeholder="Confirm password" required></input>
                                <br/>
                          </div>
                          <div class="g-recaptcha col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                            <ReCAPTCHA
                            onExpired	={this.onExpired}
                            sitekey="6LdZBo0UAAAAAHmWc3Anr9foEnlQNrzuNu-q1QZ2"
                            onChange={this.onChange}
                            />
                            <br/>
                        </div>
                        <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                            <button class="btn btn-success btn-block" style={{color : "white"}} onClick={()=>{this.createUser()}}>
                                <span className="icon glyphicon glyphicon-ok"></span>
                                <span className="text">Sign up</span>
                            </button>
                        </div>
                    </div>
                </div>
              <br/><br/>
        </div>
        <Getlogin page={"SignUp"}/>
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

export default connect(mapStateToProps)(SignUp);