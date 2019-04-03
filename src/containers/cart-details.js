import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Mycss.css';
import '../games.css';
import '../Respcss.css';
import Getlogin from '../components/navbar';
import {removeCartItem, updateCartInfo} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import {bindActionCreators} from 'redux';
import rightMark from '../Images/rightmark.png';
import xMark from '../Images/xmark.png';
import ReactRouter from 'flux-react-router';
import amumu from '../Images/amumusad.png';
import fortniteDab from '../Images/fortnitedab.png';
import Modal from 'react-responsive-modal';

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

class cartDetails extends Component {

    state = {
        ErrorModal: false,
        ErrorMsg: '',
        SuccessModal: false,
        SuccessMsg: ''
    }

    onOpenModal = (type) => {
      this.setState({[type]: true });
    };
   
    onCloseModal = (type) => {
      this.setState({[type]: false });
    };

    goToCheckout(){
        if(this.props.loginData.loggedState){
            ReactRouter.goTo("/checkout")
        }
        else{
            this.setState({ErrorModal: true, ErrorMsg: "Please login first to checkout"})
        }
    }

    notify = (id) => toast.error(`${id} removed from cart!`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        });
        
    updateInfo (data){
        let object = {
            price: data.price,
            items: 1
            }
        this.props.updateCartInfo(object, 'remove')
    }

    createListItems(){

        let CART = this.props.cart.map(item => {
            return (
                <div class="col-md-12 col-lg-12" key={item} style={{backgroundColor: "white", fontFamily: "arial", borderRadius: 3.9}}>
                    <div class="col-md-4 col-lg-4">
                        <img src={item.img} class="splash-card-product-view" style={{margin: 20}} alt={item.id}/>
                    </div>
                    <div class="col-md-4 col-lg-4" style={{color: "black"}}>
                        <h3 style={{fontWeight: "bold"}}>{item.Name}</h3>
                        <button class="btn btn-danger" style={{cursor: "pointer", minWidth: 100}} onClick={() => {this.props.removeCartItem(item), this.notify(item.Name), this.updateInfo(item)}}>
                            <span className="icon glyphicon glyphicon-remove-circle"></span>
                            <span className="text">Remove</span>
                        </button>
                        <br/>                        <br/>
                        <span style={{fontSize: 15}} class="label label-primary">{item.price} EGP</span>
                        <h4>Quantity: <span>x{item.quantity}</span></h4>
                        {item.size ? <h4>Size: {item.size}</h4> 
                        :
                        <h4>Type: <span class="label label-primary">{item.info}</span></h4>}
                        <h4>Color: {item.color}</h4>
                    </div>
                    <div class="bordersep-thick"/>
                </div>
            )
        })
        
        return(
        <div >
            {CART}
        </div>
        )
    }


    render() {
        if(this.props.cart.length < 1){
            return (
                <div >
                <ToastContainer
                    position="top-right"
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange={false}
                    draggable={false}
                    pauseOnHover={false}
                    />
                    <h1>&nbsp;Your cart is empty<span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;</h1>
                <div class="bordersep"/>
                    <Getlogin />
                </div>
            )          
        }
        return (
            <div>
                <Modal open={this.state.SuccessModal} onClose={this.onCloseModal.bind(this,'SuccessModal')} center
                    styles={SuccessStyle}>
                    <h3 class="col-xs-6">{this.state.SuccessMsg}</h3>
                    <img style ={{width: 150, height: 120}} class="col-xs-6" src={fortniteDab} alt=""></img>
                </Modal>
                <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
                    styles={ErrorStyle}>
                    <h3 class="col-xs-6">{this.state.ErrorMsg}</h3>
                    <img style ={{width: 150, height: 120}} class="col-xs-6" src={amumu} alt=""></img> 
                </Modal>
                <ToastContainer
                    position="top-right"
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange={false}
                    draggable={false}
                    pauseOnHover={false}
                    />
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <h1 style={{fontSize: 25}}>Shopping Cart: <span className="glyphicon glyphicon-shopping-cart"></span> <span class="circleRed" style={{color: "white", fontSize: 20}}> {this.props.cartInfo.totalItems}</span></h1>
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <h1 style={{fontSize: 25}}>Total:&nbsp;&nbsp;<span class="label label-primary">{this.props.cartInfo.totalPrice} EGP</span></h1>
                </div>
                {this.props.cartInfo.totalPrice > 400 ? 
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <h3 style={{fontFamily: "arial"}}>FREE SHIPPING&nbsp;&nbsp;<img src={rightMark}/></h3>
                    </div>
                     :
                     <div class="col-xs-12 col-md-6 col-lg-6">
                        <h3 style={{fontFamily: "arial"}}>FREE SHIPPING&nbsp;&nbsp;<img src={xMark}/></h3>
                        <p>(FREE shipping for orders +400 EGP)</p>
                     </div>
                    }
                <br/>
                <div class="bordersep col-xs-12 col-md-12 col-lg-12">  
                    <br/>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    {this.createListItems()}
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <h1 style={{fontSize: 25}}>Total:&nbsp;&nbsp;({this.props.cartInfo.totalItems} {this.props.cartInfo.totalItems > 1 ? "items" : "item"})&nbsp;&nbsp;<span class="label label-primary">{this.props.cartInfo.totalPrice} EGP</span></h1>
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                <button class="btn btn-success" style={{color : "white", width: 270, marginTop: 20}} onClick={()=>{this.goToCheckout()}}>
                    <span className="icon glyphicon glyphicon-shopping-cart"></span>
                    <span className="text">Proceed to checkout</span>
                </button>
                </div>
                <Getlogin />
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        cart: state.cartItems.cart,
        cartInfo: state.updateCartInfo,
        loginData: state.loginSession
    }
}

const matchDispatchToProps = dispatch => bindActionCreators(
    {
      removeCartItem,
      updateCartInfo
    },
    dispatch,
  )

export default connect(mapStateToProps, matchDispatchToProps)(cartDetails);