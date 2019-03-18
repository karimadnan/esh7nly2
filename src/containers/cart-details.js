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

class cartDetails extends Component {
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
                    <div class="col-md-3 col-lg-3">
                        <img src={item.img} style={{width: 150, height: 100, marginTop: 20}} alt={item.id}/>
                    </div>
                    <div class="col-md-4 col-lg-4" style={{color: "black"}}>
                        <h3 style={{fontWeight: "bold"}}>{item.Name}</h3>
                        <button class="btn btn-danger" style={{cursor: "pointer", minWidth: 100}} onClick={() => {this.props.removeCartItem(item), this.notify(item.Name), this.updateInfo(item)}}>
                            <span className="icon glyphicon glyphicon-remove-circle"></span>
                            <span className="text">Remove</span>
                        </button>
                        <br/>                        <br/>
                        <span style={{fontSize: 15}} class="label label-primary">{item.price} EGP</span>
                        <h4>Quantity: <span class="label label-warning">x{item.quantity}</span></h4>
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
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <h1 style={{fontSize: 25}}>Shopping Cart: <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;<span class="label label-warning">{this.props.cartInfo.totalItems}</span></h1>
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <h1 style={{fontSize: 25}}>Total:&nbsp;&nbsp;<span class="label label-primary">{this.props.cartInfo.totalPrice} EGP</span></h1>
                </div>
                {this.props.cartInfo.totalPrice > 300 ? 
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <h3 style={{color: "white", fontFamily: "arial"}}>FREE SHIPPING&nbsp;&nbsp;<img src={rightMark}/></h3>
                    </div>
                     :
                     <div class="col-xs-12 col-md-6 col-lg-6">
                        <h3 style={{color: "white", fontFamily: "arial"}}>FREE SHIPPING&nbsp;&nbsp;<img src={xMark}/></h3>
                        <p>(FREE shipping for orders +300 EGP)</p>
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
                    <h1 style={{fontSize: 25, color: "white"}}>Total:&nbsp;&nbsp;({this.props.cartInfo.totalItems} {this.props.cartInfo.totalItems > 1 ? "items" : "item"})&nbsp;&nbsp;<span class="label label-primary">{this.props.cartInfo.totalPrice} EGP</span></h1>
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                <button class="btn btn-success" style={{color : "white", width: 270, marginTop: 20}} onClick={()=>{this.updateInput("Type", "Merch")}}>
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
        cartInfo: state.updateCartInfo
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