import React, { Component } from 'react';
import '../Mycss.css';
import axios from 'axios';
import ReactRouter from 'flux-react-router';
import Modal from 'react-responsive-modal';
import '../Respcss.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginFunction} from '../actions/index';

class Getlogin extends Component {

    state = {
      ErrorModal: false,
      ErrorMsg: '',
      Url: this.props.server.main,
      Phone: "",
      Password: "",
      page: this.props.page,
    }

    onOpenModal = (type) => {
      this.setState({[type]: true });
    };
   
    onCloseModal = (type) => {
      this.setState({[type]: false });
    };

componentWillMount(){
  var that = this
  var token = this.props.loginData.token
  if (this.props.loginData.loggedState){
  if(token){
    axios.get(this.state.Url+"checkToken", 
    {
      headers: { 'Authorization': token }
    }
  )
    .then(function (response) {
    })
    .catch(function (error) {
      // console.log(error)
      that.setState({
        ErrorModal:true,
        ErrorMsg: "Login session expired, Please re-login",
      })
      that.props.loginCall(null, 'logout')
    })
}
}
}

updateInput(key, value) {
  this.setState({ [key]: value });
}

logout =() =>{
  this.props.loginCall(null, 'logout')
  window.location.reload();
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
    if(this.state.Phone  || this.state.Password){
            let Data = {Phone: that.state.Phone, Password: that.state.Password}
            axios.post(that.state.Url+"login", Data, {headers: headers})
            .then(function (response) {
              console.log(response)
              that.props.loginCall(response.data.data, 'login')
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
          <li class={this.state.page ==="Offers" && "activeNav"}><a onClick={()=>{ReactRouter.goTo("/market")}} style={{cursor: 'pointer'}}><span className="glyphicon glyphicon-shopping-cart"></span> Market</a></li>
          <li class={this.state.page ==="FortniteShop" && "activeNav"}><a onClick={()=>{ReactRouter.goTo("/fortniteshop")}} style={{cursor: 'pointer'}}><span className="glyphicon glyphicon-star"></span> Fortnite Today's Shop</a></li>
          <li class={this.state.page ==="ContactUs" && "activeNav"}><a onClick={()=>{ReactRouter.goTo("/contactus")}} style={{cursor: 'pointer'}}><span className="	glyphicon glyphicon-earphone"></span> Contact Us / كلمنا</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        {/* Logged in noSignup*/}
      {   this.props.loginData.loggedState && <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#"><span className="glyphicon glyphicon-user"></span> {this.props.loginData.userName} <span className="caret"></span></a>
            <ul className="dropdown-menu">
        {/* Admin Dashboard */}
              {   this.props.loginData.session > 1 &&  <li><a style={{cursor: 'pointer'}} onClick={()=>{ReactRouter.goTo("/admindashboard")}}><span className="glyphicon glyphicon-briefcase"></span> Admin Dashboard</a></li> } 
              {   this.props.loginData.loggedState &&  <li><a style={{cursor: 'pointer'}}><span className="glyphicon glyphicon-euro"></span> Your orders</a></li> }   
              {   this.props.loginData.loggedState &&  <li><a style={{cursor: 'pointer'}} onClick={this.logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li> }  
            </ul>
          </li>}
          { ! this.props.loginData.loggedState &&    <li className="dropdown"> 
      { ! this.props.loginData.loggedState &&  <a   className="dropdown-toggle" style={{cursor: 'pointer'}} data-toggle="dropdown"><span className="glyphicon glyphicon-cog"></span> <b>Login</b> <span className="caret"></span></a> }
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
                        <div className="col col-xs-6">
                         <a onClick={()=>{ReactRouter.goTo("/signup")}} style={{cursor: 'pointer'}}><span className="glyphicon glyphicon-user"></span> Sign Up</a>
                        </div>
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
function mapStateToProps(state){
  return {
      loginData: state.loginSession,
      server: state.server
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({loginCall: loginFunction}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Getlogin);




