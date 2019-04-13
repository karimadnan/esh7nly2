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
import 'react-toastify/dist/ReactToastify.min.css' 
import '../flag-icon.css'
import ReactTooltip from 'react-tooltip'
import {isMobile} from 'react-device-detect';
import Drawer from '@material-ui/core/Drawer';
import CurrencyFormat from 'react-currency-format';

class Navbar extends Component {

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
      page: this.props.page,
      sideBar: false
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

render() {
  const customStyles = {
    overlay: {
      background: "transparent"
    },
    modal: {
      backgroundColor: 'rgba(219, 105, 105, 0.7)',
      color: "white",
      borderRadius: '10px',
    }
  }

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
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown">
          <span className="svg-icon svg-icon-globe" style={{cursor: "pointer"}} ></span></a>
          <ul className="dropdown-menu">
            <li><a style={{cursor: 'pointer', color: "black"}} onClick={()=>{this.props.updateLang("AR")}}><span style={{cursor: 'pointer'}} className="flag-icon flag-icon-eg"></span> عربى</a></li>
            <li><a style={{cursor: 'pointer', color: "black"}} onClick={()=>{this.props.updateLang("EN")}}><span style={{cursor: 'pointer'}} className="flag-icon flag-icon-gb"></span> English</a></li>
          </ul>
        </li>


      {/* CART */}

       <li>
          <a onClick={()=>{this.setState({ sideBar: !this.state.sideBar })}} style={{cursor: "pointer"}}>
            <span className="glyphicon glyphicon-shopping-cart" style={{fontSize: 17}} ></span> <span className="circleRed" style={{color: "white", fontSize: 14, fontWeight: "bold"}}> {this.props.cartInfo.totalItems}</span>
          </a>
      </li>

        <Drawer
          anchor="right"
          open={this.state.sideBar}
          onClose={()=>{this.setState({ sideBar: false })}}
          onOpen={()=>{this.setState({ sideBar: true })}}
        >
        <div style={{padding: 20, textAlign: "center", width: isMobile ? 250 : 550}}>
          {this.props.cart.length > 0 ? 
              <p style={{textAlign: "center", fontWeight: "bold", backgroundColor: "white", color: "black"}}>Click on an item to remove x1</p>
              :
              <p style={{textAlign: "center", fontWeight: "bold", backgroundColor: "white", color: "black"}}>Your cart is empty.</p>
            }
            {this.props.cart.map(item => {

                var cartName = item.Name
                if(item.option){
                    cartName = `(${item.option}) ` + cartName
                }
                if(item.size){
                    cartName = `(${item.size.charAt(0).toUpperCase()}) `+ cartName
                }
                if(item.color){
                    cartName = `(${item.color.charAt(0).toUpperCase()}) `+ cartName
                }

              return(
                <li key={item.id}>
                    <div className="col-md-12 col-lg-12 navCart" style={{cursor: "pointer"}} onClick={() => {this.props.removeCartItem(item), this.notify(item.Name), this.updateInfo(item)}}>
                        <div className="col-md-4 col-lg-4">
                            <img src={item.defaultImage} className="splash-card-product-view" style={{margin: 5}} alt={item.id}/>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <h4 style={{fontWeight: "bold", color: "black"}}>{item.Name.length > 30 ? (((cartName).substring(0,40-3))  + '...' ) : cartName}</h4>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <h4 style={{color: "purple", fontWeight: "bold"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</h4>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <h5 style={{color: "black"}}>Qty: {item.quantity}</h5>
                        </div>
                        <div style={{borderBottom: "1px dashed grey"}}/>
                    </div>
                </li>

                )
            })}



          {this.props.cart.length > 0 && 
          <div style={{color: "black"}}>
            <div className="col-xs-6 col-md-6 col-lg-6">
              <span style={{textAlign: "left", textTransform: "uppercase", fontFamily: "arial", fontSize: !isMobile ? 18 : "3vw"}}>Subtotal: </span>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-6">
              <span style={{textAlign: "right", textTransform: "uppercase", fontFamily: "arial", fontSize: !isMobile ? 18 : "3vw"}}>EGP {<CurrencyFormat value={this.props.cartInfo.totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />} </span>
            </div>
          </div>}
          {!window.location.href.includes("checkout") && this.props.cart.length > 0 && 
          <div className="col-xs-12 col-md-12 col-lg-12">
                <button className="btn btn-primary btn-block" style={{color : "white", margin: 10}} onClick={()=>{this.goToCheckout()}}>
                    <span className="icon glyphicon glyphicon-shopping-cart"></span>
                    <span className="text">Checkout</span>
                </button>
            </div>}
          </div>
          </Drawer>



          {   this.props.loginData.loggedState ?  <li className={this.state.page ==="Account" ? "activeNav": undefined}><a style={{cursor: 'pointer'}} onClick={()=>{{
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
    </div>);

}
}
function mapStateToProps(state){
  return {
      loginData: state.loginSession,
      server: state.server,
      cart: state.cartItems.cart,
      cartInfo: state.updateCartInfo,
      lang: state.lang
  }
}

const matchDispatchToProps = dispatch => bindActionCreators(
    {
      removeCartItem,
      updateCartInfo,
      loginFunction,
      updateLang
    },
    dispatch,
  )

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);




