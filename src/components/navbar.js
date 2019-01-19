import React, { Component } from 'react';
import '../Mycss.css';
import axios from 'axios';
import ReactRouter from 'flux-react-router';
import Modal from 'react-responsive-modal';
// axios.defaults.baseURL=localStorage.getItem("server")



class Getlogin extends Component {

    state = {
      ErrorModal: false,
      ErrorMsg: '',
      Url: localStorage.getItem('Server'),
      Phone: "",
      Password: "",
      logged: "false",
      name: "",
      access: 0
    }

    onOpenModal = (type) => {
      this.setState({[type]: true });
    };
   
    onCloseModal = (type) => {
      this.setState({[type]: false });
    };

componentWillMount(){
  if(localStorage.getItem("LoggedIn") != "false"){
    this.setState({logged: true}); 
    this.setState({access: localStorage.getItem("Access")});
    this.setState({name: localStorage.getItem("Name")});
}
else{
    this.setState({logged: false}); 
    this.setState({name: ""});
    this.setState({access: 0});
} 
}

updateInput(key, value) {
  
  this.setState({ [key]: value });
}

logout =() =>{
  localStorage.setItem("LoggedIn", "false");
  localStorage.setItem("Name", "");
  localStorage.setItem("Access", 0);
  window.location.reload()
}

render() {



const login =()=>{

var headers = {
    'Content-Type': 'application/json'
}
var that=this;
  if(this.state.Phone  && this.state.Password ){
          let Data = {Phone: that.state.Phone, Password: that.state.Password}
          axios.post(that.state.Url+"login", Data, {headers: headers})
          .then(function (response) {

            let X = response.data.data[0]
            var UserName = X.Name
            var UserAccess = X.Access
  
            localStorage.setItem("LoggedIn", "true");
            localStorage.setItem("Name", UserName);
            localStorage.setItem("Access", UserAccess);
            that.setState({logged: true, name: UserName, access: UserAccess});
          })
          .catch(function (error) {
            console.log(error.response,"----------------------");
            that.setState({
              ErrorModal:true,
              ErrorMsg:error.response.data.message
            })
          }); 
      }

    else{

    }

  } 

return (
  
    <div class="container">
            <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center>
          <h2>{this.state.ErrorMsg}</h2>
        </Modal>
    <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand"onClick={()=>{ReactRouter.goTo("/Main")}} style={{cursor: 'pointer'}}><b>E<span class="glyphicon glyphicon-usd"></span>h7nly</b></a>
        </div>
        <ul class="nav navbar-nav">
          <li ><a onClick={()=>{ReactRouter.goTo("/Main")}} style={{cursor: 'pointer'}}><span class="glyphicon glyphicon-home"></span> Home</a></li>
          <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-tag"></span> Payment / الدفع<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a onClick={()=>{ReactRouter.goTo("/VodaCash")}} style={{cursor: 'pointer'}} >Vodafone Cash</a></li>
              <li><a onClick={()=>{ReactRouter.goTo("/EtisCash")}} style={{cursor: 'pointer'}} >Etisalat Cash</a></li>
            </ul>
          </li>
          <li><a onClick={()=>{ReactRouter.goTo("/Games")}} style={{cursor: 'pointer'}}><span class="	glyphicon glyphicon glyphicon-king"></span> Games Prices</a></li>
          <li><a href="#"><span class="	glyphicon glyphicon-earphone"></span> Contact Us</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
        {/* Logged in noSignup*/}
      { ! this.state.logged &&  <li><a onClick={()=>{ReactRouter.goTo("/SignUp")}} style={{cursor: 'pointer'}}><span class="glyphicon glyphicon-user"></span> Sign Up</a></li> }
        {/* Logout */}
      {   this.state.logged &&  <li><a onClick={this.logout} style={{cursor: 'pointer'}}><span class="	glyphicon glyphicon-log-out"></span> Logout</a></li> }
        {/* User */}
      {   this.state.logged && <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-user"></span> {this.state.name} <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Purchase History</a></li>
        {/* Admin Dashboard */}
              {   this.state.access > 1 &&  <li><a href="#">Admin Dashboard</a></li> }  
            </ul>
          </li>}
          <li class="dropdown"> 
      { ! this.state.logged &&  <a  class="dropdown-toggle" style={{cursor: 'pointer'}} data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span> <b>Login</b> <span class="caret"></span></a> }
              <ul id="login-dp" class="dropdown-menu">
              <li>
              <div class="row">
              <div class="col-md-12">
            
              <div class="form-group">
                 <label class="sr-only" for="exampleInputEmail2">Phone</label>
                 <input type="text"  class="form-control" value={this.state.Phone} onChange={e => this.updateInput("Phone", e.target.value)} id="exampleInputEmail2" placeholder="Phone Number" required></input>
              </div>	
              <div class="form-group">
                           <label class="sr-only" for="exampleInputPassword2">Password</label>
                           <input type="password"  class="form-control" value={this.state.Password} onChange={e => this.updateInput("Password", e.target.value)} id="exampleInputPassword2" placeholder="Password" required></input>
                           <div class="help-block text-right"><a >Forgot your password ?</a></div>
                        </div>
                        <div class="form-group">
                           <button onClick={login} disabled={!this.state.Phone.length || !this.state.Password.length} class="btn btn-primary btn-block">Log in</button> 
                        </div>	
            
                
                  </div>
                
               </div>
                </li>
              </ul> 
        </li>

        </ul>

      </div>
    </nav>
    </div>);

}
}
export default Getlogin;




