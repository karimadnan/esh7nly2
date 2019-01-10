import React, { Component } from 'react';
import '../Mycss.css';
import ReactRouter from 'flux-react-router';
// import X from '../components/test';
class Main extends Component {

componentDidMount(){

  this.setState({     
    logged:false,
    phone:"",
    pass:""
  })
}
  
login (){
console.log(this.state.phone,"phone")
console.log(this.state.pass,"password")
} 

inputhandle(type,event){
this.setState({
  [type]:event.target.value
})


}
  render() {

    return (

<div>
<div class="container">
<nav class="navbar navbar-inverse navbar-fixed-top">
<div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand"onClick={()=>{ReactRouter.goTo("/Main")}} style={{cursor: 'pointer'}}><b>E<span class="glyphicon glyphicon-usd"></span>h7nly</b></a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a onClick={()=>{ReactRouter.goTo("/Main")}} style={{cursor: 'pointer'}}><span class="glyphicon glyphicon-home"></span> Home</a></li>
      <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-tag"></span> El Daf3 <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="#">Vodafone Cash</a></li>
          <li><a href="#">Etisalat Cash</a></li>
        </ul>
      </li>
      <li><a onClick={()=>{ReactRouter.goTo("/Games")}} style={{cursor: 'pointer'}}><span class="	glyphicon glyphicon glyphicon-king"></span> Games Prices</a></li>
      <li><a href="#"><span class="	glyphicon glyphicon-earphone"></span> Contact Us</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a onClick={()=>{ReactRouter.goTo("/SignUp")}} style={{cursor: 'pointer'}}><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li class="dropdown">
          <a  class="dropdown-toggle" style={{cursor: 'pointer'}} data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span> <b>Login</b> <span class="caret"></span></a>
          <ul id="login-dp" class="dropdown-menu">
          <li>
          <div class="row">
          <div class="col-md-12">
        
          <div class="form-group">
						 <label class="sr-only" for="exampleInputEmail2">Phone</label>
             <input type="text"  class="form-control" onChange={this.inputhandle.bind(this,"phone")} id="exampleInputEmail2" placeholder="Phone Number" required></input>
					</div>	
          <div class="form-group">
											 <label class="sr-only" for="exampleInputPassword2">Password</label>
											 <input type="password" onChange={this.inputhandle.bind(this,"pass")} class="form-control" id="exampleInputPassword2" placeholder="Password" required></input>
                       <div class="help-block text-right"><a >Forgot your password ?</a></div>
										</div>
										<div class="form-group">
											 <button  onClick={this.login.bind(this)} class="btn btn-primary btn-block">Sign in</button>
										</div>	
				
							
							</div>
						
					 </div>
            </li>
          </ul> 
		</li>
    </ul>
  </div>
</nav>
</div>
<div className="bg-image">

</div>
</div>
    );
  }
}

export default Main;
