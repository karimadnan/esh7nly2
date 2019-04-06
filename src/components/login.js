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
    this.setState({ErrorModal: true, ErrorMsg: "Please fill your info."})
    }
} 

render() {

    if(this.props.loginData.loggedState){
        return(
            <div class ="GG-BG">
                <div class="container">
                        <div class="loginBox">
                            <div class="badge-logo"/>
                                <h1>Hey, {this.props.loginData.userName}</h1>
                                <h4>You're already logged in wana go to your <span style={{color: "purple", cursor: "pointer"}} onClick={()=>{!this.props.loginData.isAdmin ? 
                                    ReactRouter.goTo("/account") 
                                : this.props.loginData.isAdmin && this.props.loginData.session === 1 ?  
                                    ReactRouter.goTo("/agentdashboard") 
                                : this.props.loginData.isAdmin && this.props.loginData.session === 2 ? 
                                    ReactRouter.goTo("/admindashboard") 
                                : null}}>account</span>?</h4>
                        </div>
                </div>
                <Navbar />
            </div>
        )
    }

    return (
        <div class ="GG-BG">
            <div class="container">
                    <div class="loginBox">
                        <div class="badge-logo"/>
                            <div class="form-group has-feedback">
                                <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                        <label style={{color: this.state.Phone.length == 11 || isEmail(this.state.Phone) ? "green" : "purple"}}>{this.state.Phone.length == 11 || isEmail(this.state.Phone) ? "":'*'} Phone Number</label>
                                        <input class="form-control" type="text" onKeyPress={this.keyClicked.bind(this)} onChange={e => this.updateInput("Phone", e.target.value)} placeholder="Your Phone Number" required></input>
                                        <br/>
                                </div>

                                <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                        <label style={{color: this.state.Password.length >= 8 ? "green" : "purple"}}>{this.state.Password.length >= 8 ? "":'*'} Password</label>
                                        <input class="form-control" type="text" onKeyPress={this.keyClicked.bind(this)} onChange={e => this.updateInput("Password", e.target.value)} placeholder="Your Password" required></input>
                                        <br/>
                                </div>

                                <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                    <button class="btn btn-primary btn-block" style={{color : "white"}} onClick={()=>{this.login()}}>
                                        <span className="icon glyphicon glyphicon-ok"></span>
                                        <span className="text">Login</span>
                                    </button>
                                    <br/>
                                </div>

                                <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                    <button class="btn btn-success btn-block" style={{color : "white"}} onClick={()=>{ReactRouter.goTo("/signup")}}>
                                        <span className="svg-icon svg-icon-sphinx"></span> {this.props.lang.lang === "EN" ? "Sign Up" : " التسجيل" }
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
                    styles={ErrorStyle}>
                    <h3 class="col-xs-6">{this.state.ErrorMsg}</h3>
                    <img style ={{width: 150, height: 120}} class="col-xs-6" src={amumu} alt=""></img> 
                </Modal>
                <Navbar page={"Login"}/>
         </div>

    );
    }
}
function mapStateToProps(state){
    return {
        loginData: state.loginSession,
        server: state.server,
        lang: state.lang
    }
  }
  
  const matchDispatchToProps = dispatch => bindActionCreators(
      {
        loginFunction
      },
      dispatch,
    )
  
  export default connect(mapStateToProps, matchDispatchToProps)(Login);
  