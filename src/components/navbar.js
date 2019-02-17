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
      page: this.props.page,
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
        ErrorMsg: "You're logged out",
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
    if(that.state.Phone  || that.state.Password){
            let Data = {Phone: that.state.Phone, Password: that.state.Password}
            axios.post(that.state.Url+"login", Data, {headers: headers})
            .then(function (response) {
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

  console.log(this.state.page)
return (

    <div className="container">
        <Modal          
        open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
        styles={customStyles}>
            <h2>{this.state.ErrorMsg}</h2>
        </Modal>
    <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container-fluid">
        <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>                        
      </button>
      <a className="navbar-brand" onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: 'pointer'}}><b>E<span className="glyphicon glyphicon-usd"></span>h7nly</b></a>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav">
          <li class={this.state.page ==="Main" && "activeNav"}><a  onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: 'pointer'}}><span className="glyphicon glyphicon-home"></span> Home</a></li>
          <li class={this.state.page ==="HowTo" && "activeNav"}><a  style={{cursor: 'pointer'}} onClick={()=>{ReactRouter.goTo("/payment")}}><span className="glyphicon glyphicon-tag"></span> How To Buy / ازاى تشترى</a>
          </li>
          <li class={this.state.page ==="Offers" && "activeNav"}><a onClick={()=>{ReactRouter.goTo("/games")}} style={{cursor: 'pointer'}}><span className="glyphicon glyphicon glyphicon-king"></span> Games Offers</a></li>
          <li class={this.state.page ==="FortniteShop" && "activeNav"}><a onClick={()=>{ReactRouter.goTo("/fortniteshop")}} style={{cursor: 'pointer'}}><span className="glyphicon glyphicon-star"></span> Fortnite Today's Shop</a></li>
          <li class={this.state.page ==="ContactUs" && "activeNav"}><a onClick={()=>{ReactRouter.goTo("/contactus")}} style={{cursor: 'pointer'}}><span className="	glyphicon glyphicon-earphone"></span> Contact Us / كلمنا</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        {/* Logged in noSignup*/}
      { ! this.state.logged &&  <li class={this.state.page ==="SignUp" && "activeNav"}><a onClick={()=>{ReactRouter.goTo("/signup")}} style={{cursor: 'pointer'}}><span className="glyphicon glyphicon-user"></span> Sign Up</a></li> }

        {/* User */}
      {   this.state.logged && <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"><span className="glyphicon glyphicon-user"></span> {this.state.name} <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#"><span className="glyphicon glyphicon-euro"></span> Your Orders</a></li>
        {/* Admin Dashboard */}
              {   this.state.access > 1 &&  <li><a style={{cursor: 'pointer'}} onClick={()=>{ReactRouter.goTo("/admindashboard")}}><span className="glyphicon glyphicon-briefcase"></span> Admin Dashboard</a></li> }  
              {   this.state.logged &&  <li><a style={{cursor: 'pointer'}} onClick={this.logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li> }  
            </ul>
          </li>}
          { ! this.state.logged &&    <li className="dropdown"> 
      { ! this.state.logged &&  <a   className="dropdown-toggle" style={{cursor: 'pointer'}} data-toggle="dropdown"><span className="glyphicon glyphicon-cog"></span> <b>Login</b> <span className="caret"></span></a> }
              <ul id="login-dp"  className="dropdown-menu">
              <li>
              <div className="form-group col col-xs-6">
                 <label className="sr-only" for="exampleInputEmail2">Phone</label>
                 <input type="text" onKeyPress={this.keyClicked.bind(this)} className="form-control" value={this.state.Phone} onChange={e => this.updateInput("Phone", e.target.value)} id="exampleInputEmail2" placeholder="Phone Number" required></input>
              </div>	
              <div className="form-group col col-xs-6">
                           <label className="sr-only" for="exampleInputPassword2">Password</label>
                           <input type="password" onKeyPress={this.keyClicked.bind(this)} className="form-control" value={this.state.Password} onChange={e => this.updateInput("Password", e.target.value)} id="exampleInputPassword2" placeholder="Password" required></input>
                        </div>
                        <div className="form-group col col-xs-6">
                           <button onClick={this.login} disabled={!this.state.Phone.length || !this.state.Password.length} className="btn btn-primary btn-block">Log in</button> 
                        </div>	
                        <div className="col col-xs-6"><label style=
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




