import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import Modal from 'react-responsive-modal';
import amumu from '../Images/amumusad.png';
import fortniteDab from '../Images/fortnitedab.png';

class SignUp extends Component {

  state = {
    Url: localStorage.getItem('Server'),
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
    // this.googleVerify()
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
  this.setState({captcha: value})
}

onExpired = () => {
  this.setState({captcha: false})
}

// googleVerify = () =>{
//   var headers = {
//     'Content-Type': 'application/json'
//   }
//   axios.post(
//     'https://www.google.com/recaptcha/api/siteverify',
//     {
//         secret: '6LdZBo0UAAAAAM4oSlDVO7GKo18i8ChWD7LF9hge',
//         response: this.state.captcha
//     }
//   )
//   .then(function (response) {
//     console.log("Rres",response)
//   })
//   .catch(function (error) {
//     console.log("ERROR",error)
// })
// }

createUser = () => {
  
  var headers = {
    'Content-Type': 'application/json'
  }

  var that = this
 if (this.state.name != '' && this.state.name.length >= 6) {
   if (this.state.password === this.state.confirmPassword){
    if (this.state.phone.length == 11){
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.state.email)){
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

renderPage () {

if (!this.state.SuccessModal){
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
  
  return (


  <div >
  <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
          styles={ErrorStyle}>
        <h3 class="col-xs-6">{this.state.ErrorMsg}</h3>
        <img style ={{width: 150, height: 120}} class="col-xs-6" src={amumu} alt=""></img>
  </Modal>
  <div className="bg-image"> 

<div class="container">
<div class="col-xs-12">
      <div className="signUpLogo col-xs-12"> 
      <h1> Create Account</h1>
      </div>
      </div>
        
  </div>
<div class="Signup col-xs-12">
<div class="col-xs-12">
              <p></p>
          </div>

<div class="row col-xs-12">

<div class="col-xs-6">
  <p >Your Name:</p>
</div>


<div class="col-xs-6">
<input type="text" onChange={e => this.updateInput("name", e.target.value)} placeholder="First and second name" class="Login"  required></input>
</div>

</div>

<div class="col-xs-12">
<p></p>
</div>

<div class="row col-xs-12">
<div class="col-xs-6">
<p >Mobile Number:</p>
</div>
<div class="col-xs-6">
<input type="text" class="col-xs-6" onChange={e => this.updateInput("phone", e.target.value)} placeholder="Mobile Number" class="Login"  required></input>
</div>
</div>

<div class="col-xs-12">
<p></p>
</div>

<div class="row col-xs-12">
<div class="col-xs-6">
<p >Email:</p>
</div>
<div class="col-xs-6">
<input type="email" class="col-xs-6" onChange={e => this.updateInput("email", e.target.value)} placeholder="example@gmail.com" class="Login"  required></input>
</div>
</div>

<div class="col-xs-12">
<p></p>
</div>

<div class="row col-xs-12">
<div class="col-xs-6">
<p >Password:</p>
</div>
<div class="col-xs-6">
<input type="password" class="col-xs-6" onChange={e => this.updateInput("password", e.target.value)} id="user_password" placeholder="Password" class="Login"  required></input>
</div>
</div>

<div class="col-xs-12">
<p></p>
</div>

<div class="row col-xs-12">
<div class="col-xs-6">
<p>Confirm Password:</p>
</div>
<div class="col-xs-6">
<input type="password" class="col-xs-6" onChange={e => this.updateInput("confirmPassword", e.target.value)} id="user_Cpassword" placeholder="Confirm Password" class="Login"  required></input>
</div>
</div>

<div style={{marginTop: 10}}class="row col-xs-12">
<div class="col-xs-6">
<p>Check Captcha:</p>
</div>
<div class="col-xs-6">
<ReCAPTCHA
  onExpired	={this.onExpired}
  sitekey="6LdZBo0UAAAAAHmWc3Anr9foEnlQNrzuNu-q1QZ2"
  onChange={this.onChange}
/>
</div>
</div>
<div class="col-xs-12">
<button type="button" style={{marginLeft: 13}} onClick={()=>{this.createUser()}} class="col-xs-12 btn btn-primary">Signup</button> 
</div>

<div class="row col-xs-12" >
<div class="col-xs-6">
</div>
</div>

</div>
</div>
</div>
  

  
    )
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
  return(
    <div>
        <Modal open={this.state.SuccessModal} onClose={this.onCloseModal.bind(this,'SuccessModal')} center
          styles={SuccessStyle}>
          <h3 class="col-xs-6">{this.state.SuccessMsg}</h3>
          <img style ={{width: 150, height: 120}} class="col-xs-6" src={fortniteDab} alt=""></img>
        </Modal>
      <Getlogin />
      <div className="bg-image">
      {this.renderPage()}
      </div>
    </div>
  )
}
}



export default SignUp;
