import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import { FacebookProvider, Page, MessageUs, CustomChat } from 'react-facebook';
import Footer from './footer';
import isInt from 'validator/lib/isInt';
import isEmail from 'validator/lib/isEmail';
import ReCAPTCHA from "react-google-recaptcha";

class Contact extends Component {

    state = {
        name: "",
        email: "",
        subject: "",
        body: "",
        payload: ""
    }

updateInput(key, value) {
this.setState({ [key]: value });
}

onChange = (value) => {
this.setState({captcha: value})
}

verifier(){
    let payload;
    if (this.state.name.length < 3){
        payload = "Name is required"
    }
    else if (!isEmail(this.state.email)){
        payload = "Email is invaild"
    }
    else if (this.state.subject.length < 3){
        payload = "Email subject is required"
    }
    else if (this.state.body.length < 10){
        payload = "You need to write something to email"
    }
    else {
        payload = "Sent"
    }
return this.setState({payload: payload})
}

render() {

    return (
  <div>
    <div className="PrivacyBG"> 
    <Getlogin page={"ContactUs"}/>
        <br/><br/><br/>
        <div class="container">
            <div class="ProfileBGW">
                <h1 style={{color: "black"}}>Message us on facebook</h1>
                    <FacebookProvider appId="1984023341904164">
                        <MessageUs messengerAppId="297486070967464" pageId="297486070967464"/>
                    </FacebookProvider>    
                    <br/><br/>
                <div class="bordersep"/>
                <h1 style={{color: "black"}}>Email us directly</h1>
                    <br/><br/>
                    <div class="form-group has-feedback">
                        <div class="col-xs-12 col-md-12 col-lg-12">
                            <label style={{color: this.state.name.length > 2 ? "green" : "purple"}}>{this.state.name.length > 2 ? "":'*'} Your name</label>
                            <input class="form-control" type="text" onChange={e => this.updateInput("name", e.target.value)} placeholder="Your name" required></input>
                            <br/>
                        </div>

                        <div class="col-xs-12 col-md-12 col-lg-12">
                            <label style={{color: isEmail(this.state.email) ? "green" : "purple"}}>{isEmail(this.state.email) ? "":'*'} Email</label>
                            <input class="form-control" type="text" onChange={e => this.updateInput("email", e.target.value)} placeholder="Your email address" required></input>
                            <br/>
                        </div>

                        <div class="col-xs-12 col-md-12 col-lg-12">
                            <label style={{color: this.state.subject.length >= 3 ? "green" : "purple"}}>{this.state.subject.length >= 3 ? "":'*'} Subject</label>
                            <input class="form-control" type="text" onChange={e => this.updateInput("subject", e.target.value)} placeholder="Subject" required></input>
                            <br/>
                        </div>

                        <div class="col-xs-12 col-md-12 col-lg-12">
                            <label style={{color: this.state.body.length >= 10 ? "green" : "purple"}}>{this.state.body.length >= 10 ? "":'*'} Your question</label>
                            <textarea class="form-control" rows="5" onChange={e => this.updateInput("body", e.target.value)} id="comment"></textarea>
                            <br/>
                        </div>
                        <div class="g-recaptcha col-xs-12 col-md-6 col-lg-6">
                            <ReCAPTCHA
                            onExpired	={this.onExpired}
                            sitekey="6LdZBo0UAAAAAHmWc3Anr9foEnlQNrzuNu-q1QZ2"
                            onChange={this.onChange}
                            />
                        </div>
                        <div class="col-xs-12 col-md-6 col-lg-6">
                            <button class="btn btn-success btn-block" style={{color : "white"}} onClick={()=>{this.verifier()}}>
                                <span className="icon glyphicon glyphicon-envelope"></span>
                                <span className="text">Send Email</span>
                            </button>
                        </div>
                            <strong style={{color: this.state.payload === "Sent" ? "green" : "red", float: "right"}}>{this.state.payload}</strong> 
                    </div>
            </div>
        </div>
        <br/><br/>
        <Footer />
    </div>
  </div>
    );
  }
}

export default Contact;