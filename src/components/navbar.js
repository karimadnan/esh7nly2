import React, { Component } from 'react';
import '../Mycss.css';
import axios from 'axios';
import ReactRouter from 'flux-react-router';
import Modal from 'react-responsive-modal';
import '../Respcss.css';



class Getlogin extends Component {

    state = {
      ErrorModal: false,
      ErrorMsg: '',
      Url: localStorage.getItem('Server'),
      Phone: "",
      Password: "",
      token: "",
      name: "",
      logged: false,
      access: 0
    }

    onOpenModal = (type) => {
      this.setState({[type]: true });
    };
   
    onCloseModal = (type) => {
      this.setState({[type]: false });
    };

componentWillMount(){
  var that = this
  var token = localStorage.getItem("Token")
  if(token){
    axios.get(this.state.Url+"checkToken", 
    {
      headers: { 'Authorization': token }
    }
  )
    .then(function (response) {
    // console.log(response)
    that.setState({logged: true}); 
    that.setState({access: localStorage.getItem("Access")});
    that.setState({name: localStorage.getItem("Name")});
    })
    .catch(function (error) {
      // console.log(error)
      localStorage.clear()
      that.setState({
        ErrorModal:true,
        ErrorMsg: "You're not logged in",
        logged: false
      })
    })
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
  localStorage.clear()
  window.location.reload()
}

keyClicked (e) {
if (e.key === "Enter"){
this.login();
}
}

login() {

  var headers = {
      'Content-Type': 'application/json'
  }
  var that=this;
    if(this.state.Phone  && this.state.Password ){
            let Data = {Phone: that.state.Phone, Password: that.state.Password}
            axios.post(that.state.Url+"login", Data, {headers: headers})
            .then(function (response) {
                  console.log(response)
              
              
              let X = response.data.data
              var UserName = X.Name
              var UserAccess = X.Access
              var Token = X._token
              localStorage.setItem("Name", UserName);
              localStorage.setItem("Access", UserAccess);
              localStorage.setItem("Token", X._token);
  
              that.setState({token: Token, name: UserName, access: UserAccess, logged: true});
            })
            .catch(function (error) {
              console.log(error.response)
              if (error.response.data.message){
                that.setState({
                  ErrorModal:true,
                  ErrorMsg:error.response.data.message
                })
              }
  
            }); 
        }
  
      else{
          this.setState({ErrorModal: true, ErrorMsg: "Please fill your info."})
      }
  
    } 
  
render() {

  const customStyles = {
    overlay: {
    },
    modal: {
      top: '-10%',
      marginLeft: '80%',
      left: "0px",
      right: "0px",
      bottom: 'auto',
      width: '25%',
      borderRadius: '10px',
      padding: "10px"
    },
  }


return (
  
    <div class="container">
        <Modal          
        open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
        styles={customStyles}>
            <h2>{this.state.ErrorMsg}</h2>
        </Modal>
    <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand"onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: 'pointer'}}><b>E<span class="glyphicon glyphicon-usd"></span>h7nly</b></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <li ><a onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: 'pointer'}}><span class="glyphicon glyphicon-home"></span> Home</a></li>
          <li ><a style={{cursor: 'pointer'}} onClick={()=>{ReactRouter.goTo("/payment")}}><span class="glyphicon glyphicon-tag"></span> How To Buy / ازاى تشترى</a>
          </li>
          <li><a onClick={()=>{ReactRouter.goTo("/games")}} style={{cursor: 'pointer'}}><span class="glyphicon glyphicon glyphicon-king"></span> Games Offers</a></li>
          <li><a onClick={()=>{ReactRouter.goTo("/fortniteshop")}} style={{cursor: 'pointer'}}><span class="glyphicon glyphicon-star"></span> Fortnite Today's Shop</a></li>
          <li><a href="#"><span class="	glyphicon glyphicon-earphone"></span> Contact Us</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
        {/* Logged in noSignup*/}
      { ! this.state.logged &&  <li><a onClick={()=>{ReactRouter.goTo("/signup")}} style={{cursor: 'pointer'}}><span class="glyphicon glyphicon-user"></span> Sign Up</a></li> }
        {/* Logout */}
      {   this.state.logged &&  <li><a onClick={this.logout} style={{cursor: 'pointer'}}><span class="	glyphicon glyphicon-log-out"></span> Logout</a></li> }
        {/* User */}
      {   this.state.logged && <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-user"></span> {this.state.name} <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Purchase History</a></li>
        {/* Admin Dashboard */}
              {   this.state.access > 1 &&  <li><a style={{cursor: 'pointer'}} onClick={()=>{ReactRouter.goTo("/admindashboard")}}>Admin Dashboard</a></li> }  
            </ul>
          </li>}
          { ! this.state.logged &&    <li class="dropdown"> 
      { ! this.state.logged &&  <a   class="dropdown-toggle" style={{cursor: 'pointer'}} data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span> <b>Login</b> <span class="caret"></span></a> }
              <ul id="login-dp"  class="dropdown-menu">
              <li>
              <div class="form-group col col-xs-6">
                 <label class="sr-only" for="exampleInputEmail2">Phone</label>
                 <input type="text" onKeyPress={this.keyClicked.bind(this)} class="form-control" value={this.state.Phone} onChange={e => this.updateInput("Phone", e.target.value)} id="exampleInputEmail2" placeholder="Phone Number" required></input>
              </div>	
              <div class="form-group col col-xs-6">
                           <label class="sr-only" for="exampleInputPassword2">Password</label>
                           <input type="password" onKeyPress={this.keyClicked.bind(this)} class="form-control" value={this.state.Password} onChange={e => this.updateInput("Password", e.target.value)} id="exampleInputPassword2" placeholder="Password" required></input>
                        </div>
                        <div class="form-group col col-xs-6">
                           <button onClick={this.login} disabled={!this.state.Phone.length || !this.state.Password.length} class="btn btn-primary btn-block">Log in</button> 
                        </div>	
                        <div class="col col-xs-6"><label style=
                                                  {{
                                                    color : "white"
                                                  }}>Forgot password ?</label></div>
                </li>
              </ul> 
        </li>}

        </ul>

      </div>
      </div>
    </nav>
    </div>);

}
}
export default Getlogin;




