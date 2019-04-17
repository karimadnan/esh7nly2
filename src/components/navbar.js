import React, { Component } from 'react';
import '../Mycss.css';
import '../svg.css';
import axios from 'axios';
import ReactRouter from 'flux-react-router';
import Modal from 'react-responsive-modal';
import '../Respcss.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginFunction} from '../actions/index';
import 'react-toastify/dist/ReactToastify.min.css';
import '../flag-icon.css';
import GlobalCart from '../containers/global-cart';
import LangIcon from '../containers/langIcon';

const customStyles = {
  overlay: {
    background: "transparent"
  },
  modal: {
    backgroundColor: 'rgba(219, 105, 105, 0.9)',
    color: "white",
    borderRadius: '10px',
  }
}

class Navbar extends Component {


    state = {
      ErrorModal: false,
      ErrorMsg: '',
      Url: this.props.server.main,
      page: this.props.page
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
      that.props.loginFunction(null, 'logout')
    })
}
}
}

updateInput(key, value) {
  this.setState({ [key]: value });
}

logout =() =>{
  this.props.loginFunction(null, 'logout')
  ReactRouter.goTo("/main")
}

render() {

return (

    <div className="container">
    <nav className="navbar navbar-inverse navbar-fixed-top">
    
    <div className="container-fluid">
        <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>                        
      </button>
      <a className="navbar-brand" onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: 'pointer'}}><span className="svg-icon-logo svg-icon-logo"></span></a>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav">
          <li className={this.state.page ==="Main" ? "activeNav": undefined}><a  onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: 'pointer'}}><span className="svg-icon svg-icon-home"></span> {this.props.lang.lang === "EN" ? "Home" : "الرئيسية"}</a></li>
          <li className={this.state.page ==="Offers" ? "activeNav": undefined}><a onClick={()=>{ReactRouter.goTo("/market")}} style={{cursor: 'pointer'}}><span className="svg-icon svg-icon-shoppingCart"></span> {this.props.lang.lang === "EN" ? "Market" : "المتجر"}</a></li>
          <li className={this.state.page ==="ContactUs" ? "activeNav": undefined}><a onClick={()=>{ReactRouter.goTo("/contactus")}} style={{cursor: 'pointer'}}><span className="svg-icon svg-icon-phone"></span> {this.props.lang.lang === "EN" ? "Contact Us" : "كلمنا"}</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">

        {/* LANG SELECTOR */}
        <li >
            <LangIcon />
        </li>

        {/* CART */}

        <li>
            <GlobalCart />
        </li>

          {this.props.loginData.loggedState ?  <li className={this.state.page ==="Account" ? "activeNav": undefined}><a style={{cursor: 'pointer'}} onClick={()=>{{
            !this.props.loginData.isAdmin ? 
                ReactRouter.goTo("/account") 
            : this.props.loginData.isAdmin && this.props.loginData.session === 1 ?  
                ReactRouter.goTo("/agentdashboard") 
            : this.props.loginData.isAdmin && this.props.loginData.session === 2 ? 
                ReactRouter.goTo("/admindashboard") 
            : undefined}}}>
            <span className="svg-icon svg-icon-anubis"></span> {this.props.loginData.userName}
            </a>
          </li>: undefined}  

          {this.props.loginData.loggedState ?  
                <li><a style={{cursor: 'pointer'}} onClick={this.logout}><span className="glyphicon glyphicon-off"></span> {this.props.lang.lang === "EN" ? "Logout" : "تسجيل الخروج" }</a></li> 
                : undefined}  

          {   !this.props.loginData.loggedState ?
            <li className={this.state.page ==="Login" ? "activeNav": undefined}><a style={{cursor: 'pointer'}} onClick={()=>{ReactRouter.goTo("/login")}}><span className="svg-icon svg-icon-pharoah"></span> {this.props.lang.lang === "EN" ? "Login" : "تسجيل الدخول" }</a></li> 
            : undefined}  

        </ul>
      </div>
      </div>
    </nav>
    <Modal          
    open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
    styles={customStyles}>
        <h2>{this.state.ErrorMsg}</h2>
    </Modal>
    </div>);

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

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);




