import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import NavBar from './navbar';
import CartDetails from '../containers/cart-details';
import '../Mycss.css';
import '../Respcss.css';

class Checkout extends Component {

    state={
        current: 'Shipping',
        currentN: 3,
        firstName: '',
        lastName: '',
        city: '',
        Area: '',
        StName: '',
        locationType: '',
        note: ''
    }

    updateInput(key, value) {
        this.setState({ [key]: value });
    }

    createCart(){
        let CART = this.props.cart.map(item => {
            return (
                <div>
                    <div class="col-md-12 col-lg-12" style={{backgroundColor: "white"}}>
                        <div class="col-md-3 col-lg-3">
                            <img src={item.img} style={{width: 50, height: 45}} alt={item.id}/>
                        </div>
                        <div class="col-md-7 col-lg-7">
                            <h4 style={{fontWeight: "bold", color: "black"}}>{item.Name.length > 15 ? (((item.Name).substring(0,15-3)) + '...') : item.Name}</h4>
                        </div>

                            <h4 style={{color: "green", fontWeight: "bold"}}>{item.price} EGP</h4>
                            <h5 style={{color: "black"}}>Qty: {item.quantity}</h5>

                    </div>
                </div>
            )
        })
        
        return(
        <div >
            {CART}
        </div>
        )
    }

render(){
    const percent = 100 / this.state.currentN

    return(
    <div class="bg-image">
        <br/><br/><br/><br/>
        <div class="container">
        <div class="col-xs-12 col-md-8 col-lg-8">
            <div class="CheckoutBG">
                <h2 style={{color: "black", textAlign: "center"}}>{this.state.current}</h2>
               {this.state.current != "Cart" && <div class="progress">
                    <div class="progress-bar progress-bar-striped active" role="progressbar"
                    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: `${percent}%`}}>
                    </div>
                </div> }
             {this.state.current === "Cart" &&
                <div style={{color: "black"}}>
                    <CartDetails/>
                </div>
             }
             {this.state.current === "Shipping" &&  
                <div class="form-group has-feedback">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="col-xs-6 col-md-6 col-lg-6">
                            <label style={{color: this.state.firstName.length > 2 ? "green" : "red"}}>{this.state.firstName.length > 2 ? "":'*'} First Name</label>
                            <input class="form-control" type="text" onChange={e => this.updateInput("firstName", e.target.value)} placeholder="First Name" required></input>
                            <br/>
                        </div>
                        <div class="col-xs-6 col-md-6 col-lg-6">
                            <label style={{color: this.state.lastName.length > 2 ? "green" : "red"}}>{this.state.lastName.length > 2 ? "":'*'} Last Name</label>
                            <input class="form-control" type="text" onChange={e => this.updateInput("lastName", e.target.value)} placeholder="Last Name" required></input>
                            <br/>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="col-xs-6 col-md-6 col-lg-6">
                            <label style={{color: this.state.city != '' ? "green" : "red"}}>{this.state.city != '' ? "":'*'} City</label>
                            <select class="form-control" id="sel1" onChange={e => this.updateInput("city", e.target.value)}>
                                <option>Select</option>
                                <option>Cairo</option>
                                <option>Giza</option>
                                <option>Helwan</option>
                                <option>6 of october</option>
                            </select>
                        </div>
                        <div class="col-xs-6 col-md-6 col-lg-6">
                            <label style={{color: this.state.Area.length > 4 ? "green" : "red"}}>{this.state.Area.length > 4 ? "":'*'} Area</label>
                            <input class="form-control" type="text" onChange={e => this.updateInput("Area", e.target.value)} placeholder="Your Area" required></input>
                            <br/>
                        </div>
                    </div>

                        <div class="col-xs-12 col-md-12 col-lg-12">
                            <label style={{color: this.state.StName.length > 6 ? "green" : "red"}}>{this.state.StName.length > 6 ? "":'*'} Street Name/No</label>
                            <input class="form-control" type="text" onChange={e => this.updateInput("StName", e.target.value)} placeholder="Street Name/No" required></input>
                            <br/>
                        </div>

                        <div class="col-xs-12 col-md-12 col-lg-12">
                            <label style={{color: this.state.locationType != '' ? "green" : "red"}}>{this.state.locationType != '' ? "":'*'} Location Type</label>
                            <select class="form-control" id="sel1" onChange={e => this.updateInput("locationType", e.target.value)}>
                                <option>Select</option>
                                <option>Home</option>
                                <option>Business</option>
                            </select>
                        </div>

                        <div class="col-xs-12 col-md-12 col-lg-12">
                        <br/>
                            <label style={{color: "black"}}> Shipping Note</label>
                            <textarea onChange={e => this.updateInput("note", e.target.value)} class="form-control" rows="2" id="comment"></textarea>
                        </div>

                    </div> }
                </div>
            </div>

            {/* CART */}
            <div class="col-xs-12 col-md-4 col-lg-4">
                <div class="CheckoutBG">
                   {this.state.current != "Cart" && <span style={{color: "#6F52FF", fontSize: 17, cursor: "pointer"}} onClick={()=>{this.updateInput("current", "Cart")}} class="glyphicon glyphicon-arrow-left"> <span style={{fontFamily: "arial"}}>Edit Cart</span></span>}
                    <h2 style={{color: "black"}}>Shopping Cart <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;<span class="label label-warning">{this.props.cartInfo.totalItems}</span></h2>


                        {this.createCart()}

               {this.props.cartInfo.totalItems > 0 ?   
                <div>  
                    <h5 style={{color: "black"}}>{this.props.cartInfo.totalItems > 1 ? "Items" : "Item"}: <span style={{color: "black"}}>{this.props.cartInfo.totalPrice} EGP</span></h5>
                    <h5 style={{color: "black"}}>+ Shipping: <span style={{color: "black"}}> {this.props.cartInfo.totalPrice < 400 ? "30 EGP" : "0 FREE"}  </span></h5>
                <div class="bordersep-thick"/>
                    <h4 style={{color: "black", fontWeight: "bold"}}>Grand Total: {this.props.cartInfo.totalPrice < 400 ? this.props.cartInfo.totalPrice + 30 : this.props.cartInfo.totalPrice} EGP</h4>
                       {this.state.current === "Cart" ?
                        <button class="btn btn-success" style={{color : "white", width: 270, marginTop: 20, lineHeight: 3}} onClick={()=>{this.updateInput("current", "Shipping")}}>
                            <span className="icon glyphicon glyphicon-ok"></span>
                            <span className="text" style={{fontWeight: "bold"}}>Proceed To Checkout</span>
                        </button> 
                        :
                        <button class="btn btn-success" style={{color : "white", width: 270, marginTop: 20, lineHeight: 3}}>
                            <span className="icon glyphicon glyphicon-ok"></span>
                            <span className="text" style={{fontWeight: "bold"}}>Place Order</span>
                        </button> }
                 </div>
                 :
                 <div>
                     <h3 style={{color: "black"}}>You have no items in your cart</h3>
                 </div> }
                </div>
            </div>
        </div>
        <NavBar/>
    </div>
    )

}
}

function mapStateToProps(state){
    return {
        loginData: state.loginSession,
        server: state.server,
        cart: state.cartItems.cart,
        cartInfo: state.updateCartInfo,
        lang: state.lang.lang
    }
  }
  
  export default connect(mapStateToProps)(Checkout);