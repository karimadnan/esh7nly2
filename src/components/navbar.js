import React, { Component } from 'react';
import '../Mycss.css';
import '../svg.css';
import axios from 'axios';
import ReactRouter from 'flux-react-router';
import Modal from 'react-responsive-modal';
import '../Respcss.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginFunction, updateLang, removeCartItem, updateCartInfo} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import '../flag-icon.css'
import ReactTooltip from 'react-tooltip'
import isEmail from 'validator/lib/isEmail';

class Getlogin extends Component {

    notifyLogin = (msg) => toast.info(` welcome back ${msg}!`, {
      position: "top-center",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });

    notify = (id) => toast.error(`${id} removed from cart!`, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      });

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

    updateInfo (data){
      let object = {
          price: data.price,
          items: 1
          }
      this.props.updateCartInfo(object, 'remove')
    }

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

goToCheckout(){
  if(this.props.loginData.loggedState){
      ReactRouter.goTo("/checkout")
  }
  else{
      this.setState({ErrorModal: true, ErrorMsg: "Please login first to checkout"})
  }
}

updateInput(key, value) {
  this.setState({ [key]: value });
}

logout =() =>{
  this.props.loginFunction(null, 'logout')
  ReactRouter.goTo("/main")
}

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
                that.notifyLogin(response.data.data.Name)
                that.props.loginFunction(response.data.data, 'login')
            })
            .catch(function (error) {
              console.log(error, "EROEROEORO")
              // if (error.response.data.message){
              //   that.setState({
              //     ErrorModal:true,
              //     ErrorMsg:error.response.data.message
              //   })
              // }
            });
        }
        else{
            axios.get(`${this.state.Url}login?Phone=${this.state.Phone}&Password=${this.state.Password}`)
            .then(function (response) {
              that.notifyLogin(response.data.data.Name)
              that.props.loginFunction(response.data.data, 'login')
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
        <ReactTooltip place="bottom" type="dark" effect="solid"/>
        <ToastContainer
          position="top-center"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
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
      <a className="navbar-brand" onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: 'pointer'}}><span className="svg-icon-logo svg-icon-logo"></span></a>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
        <ul className="nav navbar-nav">
          <li class={this.state.page ==="Main" && "activeNav"}><a  onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: 'pointer'}}><span className="svg-icon svg-icon-home"></span> {this.props.lang.lang === "EN" ? "Home" : "الرئيسية"}</a></li>
          <li class={this.state.page ==="HowTo" && "activeNav"}><a  style={{cursor: 'pointer'}} onClick={()=>{ReactRouter.goTo("/payment")}}><span className="svg-icon svg-icon-priceTag"></span> {this.props.lang.lang === "EN" ? "How To Buy" : "ازاى تشترى"}</a>
          </li>
          <li class={this.state.page ==="Offers" && "activeNav"}><a onClick={()=>{ReactRouter.goTo("/market")}} style={{cursor: 'pointer'}}><span className="svg-icon svg-icon-shoppingCart"></span> {this.props.lang.lang === "EN" ? "Market" : "المتجر"}</a></li>
          <li class={this.state.page ==="ContactUs" && "activeNav"}><a onClick={()=>{ReactRouter.goTo("/contactus")}} style={{cursor: 'pointer'}}><span className="svg-icon svg-icon-phone"></span> {this.props.lang.lang === "EN" ? "Contact Us" : "كلمنا"}</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">

        {/* LANG SELECTOR */}
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown">
          <span className="svg-icon svg-icon-globe" style={{cursor: "pointer"}} ></span></a>
          <ul class="dropdown-menu">
            <li><a style={{cursor: 'pointer', color: "black"}} onClick={()=>{this.props.updateLang("AR")}}><span style={{cursor: 'pointer'}} class="flag-icon flag-icon-eg"></span> عربى</a></li>
            <li><a style={{cursor: 'pointer', color: "black"}} onClick={()=>{this.props.updateLang("EN")}}><span style={{cursor: 'pointer'}} class="flag-icon flag-icon-gb"></span> English</a></li>
          </ul>
        </li>


      {/* CART */}
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">
        <span className="glyphicon glyphicon-shopping-cart" style={{cursor: "pointer", fontSize: 17}} ></span> <span class="circleRed" style={{color: "white", fontSize: 14, fontWeight: "bold"}}> {this.props.cart.length}</span></a>
        <ul class="dropdown-menu">
            {this.props.cart.length > 0 ? 
              <p style={{textAlign: "center", fontWeight: "bold", backgroundColor: "white"}}>Click on an item to remove x1</p>
              :
              <p style={{textAlign: "center", fontWeight: "bold", backgroundColor: "white"}}>Your cart is empty.</p>
            }
            {this.props.cart.map(item => {
              return(
                <li  key={item.id}>
                    <div class="col-md-12 col-lg-12 navCart" style={{width: 300, cursor: "pointer"}} onClick={() => {this.props.removeCartItem(item), this.notify(item.Name), this.updateInfo(item)}}>
                        <div class="col-md-4 col-lg-4">
                            <img src={item.img} style={{width: 50, height: 45, marginTop: 5}} alt={item.id}/>
                        </div>
                        <div class="col-md-4 col-lg-4">
                            <h4 style={{fontWeight: "bold", color: "black"}}>{item.Name.length > 8 ? ( (item.size ? `(${item.size.charAt(0).toUpperCase()}) ` : '') + ((item.Name).substring(0,9-3))  + '...') : item.size ? `(${item.size.charAt(0).toUpperCase()}) ${item.Name}` : item.Name}</h4>
                        </div>
                        <div class="col-md-2 col-lg-2">
                            <h4 style={{color: "green", fontWeight: "bold"}}>{item.price} EGP</h4>
                        </div>
                        <div class="col-md-2 col-lg-2">
                            <h5 style={{color: "black"}}>Qty: {item.quantity}</h5>
                        </div>
                    </div>
                </li>
                )
            })}

          {!window.location.href.includes("checkout") && this.props.cart.length > 0 && 
          <div class="col-xs-12 col-md-12 col-lg-12">
                <button class="btn btn-success" style={{color : "white", width: 270, marginTop: 20}} onClick={()=>{this.goToCheckout()}}>
                    <span className="icon glyphicon glyphicon-shopping-cart"></span>
                    <span className="text">Proceed to checkout</span>
                </button>
            </div>}
            
        </ul>

      </li>

          {   this.props.loginData.loggedState &&  <li class={this.state.page ==="Account" && "activeNav"}><a style={{cursor: 'pointer'}} onClick={()=>{{
            !this.props.loginData.isAdmin ? 
                ReactRouter.goTo("/account") 
            : this.props.loginData.isAdmin && this.props.loginData.session === 1 ?  
                ReactRouter.goTo("/agentdashboard") 
            : this.props.loginData.isAdmin && this.props.loginData.session === 2 ? 
                ReactRouter.goTo("/admindashboard") 
            : null}}}>
            <span className="svg-icon svg-icon-anubis"></span> {this.props.loginData.userName}
            </a>
          </li>  }  

          {   this.props.loginData.loggedState &&  <li><a style={{cursor: 'pointer'}} onClick={this.logout}><span className="glyphicon glyphicon-off"></span> {this.props.lang.lang === "EN" ? "Logout" : "تسجيل الخروج" }</a></li> }  

          { ! this.props.loginData.loggedState &&    <li className="dropdown"> 
      { ! this.props.loginData.loggedState &&  <a   className="dropdown-toggle" style={{cursor: 'pointer'}} data-toggle="dropdown"><span className="svg-icon svg-icon-pharoah"></span> <b>{this.props.lang.lang === "EN" ? "Login" : "تسجيل الدخول" }</b> <span className="caret"></span></a> }
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
                           <button onClick={()=>{this.login()}} disabled={!this.state.Phone.length || !this.state.Password.length} className="btn btn-primary btn-block">{this.props.lang.lang === "EN" ? "Login" : "تسجيل الدخول" }</button> 
                        </div>	
                        <div className="col col-xs-6">
                         <button onClick={()=>{ReactRouter.goTo("/signup")}} style={{cursor: 'pointer'}} className="btn btn-success btn-block"><span className="svg-icon svg-icon-sphinx"></span> {this.props.lang.lang === "EN" ? "Sign Up" : " التسجيل" }</button>
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
      server: state.server,
      cart: state.cartItems.cart,
      lang: state.lang
  }
}

const matchDispatchToProps = dispatch => bindActionCreators(
    {
      loginFunction,
      removeCartItem,
      updateCartInfo,
      updateLang
    },
    dispatch,
  )

export default connect(mapStateToProps, matchDispatchToProps)(Getlogin);




