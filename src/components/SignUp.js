import React, { Component } from 'react';
import '../App.css';
import '../Mycss.css';

// var ReactRouter = require('flux-react-router');
 // ReactRouter.goTo("/DriverTrips")

class SignUp extends Component {
  render() {

    return (


    <div >

    <div className="bg-image"> 
    <div class="container">
    <div class="bg-text">

    <p>Your Name:</p>

  <input id="user_nice_name" name="user_nice_name" type="text" placeholder="Full Name" class="Login"  required></input>


  <p>Mobile Number:</p>
  <input id="user_number" name="user_number" type="text" placeholder="Mobile Number" class="Login"  required></input>


  <p>Email:</p>
  <input id="user_email" name="user_email" type="text" placeholder="example@gmail.com" class="Login"  required></input>


  <p>Password:</p>
  <input type="password" id="user_password" name="user_password" type="text" placeholder="Password" class="Login"  required></input>


  <p>Confirm Password:</p>
  <input type="password" id="user_Cpassword" name="user_Cpassword" type="text" placeholder="Confirm Password" class="Login"  required></input>

<div class="radio">
  <label>
    <input type="radio" style={{cursor: 'pointer'}} name="optionsRadios" id="optionsRadios1" value="Male" checked></input>
    Male
    </label>
    <span>   </span>
    <label>
    <input type="radio" style={{cursor: 'pointer'}} name="optionsRadios" id="optionsRadios2" value="Female" checked></input>
    Female
    </label>
</div>

  <div class="form-group">
  <label class="col-md-4 control-label" for="signup_recruiter"></label>
  <div class="col-md-4">
       <button type="button" class="btn btn-primary signup_recruiter">Signup</button>
  </div>
</div>
    </div>
    </div>
    </div>
    </div>
    );
  }
}

export default SignUp;
