import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import NavBar from './navbar';
import CartDetails from '../containers/cart-details';
import ReactRouter from 'flux-react-router';
import '../Mycss.css';
import '../Respcss.css';
import amumu from '../Images/amumusad.png';
import fortniteDab from '../Images/fortnitedab.png';
import Modal from 'react-responsive-modal';
import VodafoneCashLogo from '../Images/Vodacash.png';
import EtisalatCashLogo from '../Images/Etiscash.png';
import FawryLogo from '../Images/fawrypaymenttest.png';
import isInt from 'validator/lib/isInt';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import {bindActionCreators} from 'redux';
import {cleanCart, cleanCartInfo} from '../actions/index';

const override = css`
    display: block;
    border-color: red;
`;

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

class Checkout extends Component {

    state={
        headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        current: ['Shipping', 'Payment', 'Review', 'Done'],
        currentN: [0, 33, 66, 100],
        currentIndex: 0,
        cart: false,
        firstName: '',
        lastName: '',
        Phone: '',
        city: '',
        Area: '',
        StName: '',
        locationType: '',
        paymentMethod: 'Select',
        transId: '',
        gotData: false,
        loaded: false,
        note: '',
        ErrorModal: false,
        ErrorMsg: '',
        SuccessModal: false,
        SuccessMsg: ''
    }

    componentDidMount(){
        this.getShippingData()
    }

    createOrder(){
        var that = this
        var Data = {paymentMethod: this.state.paymentMethod,
                    orderType: "Products",
                    cart: this.props.cart};
        (this.state.transId) ? Data['transId']=this.state.transId : null;
        axios.post(this.state.Url+"createOrder", Data, {headers: this.state.headers})
        .then(function (response) {
            that.props.cleanCart()
            that.props.cleanCartInfo()
            that.setState({SuccessModal: true, SuccessMsg: response.data.message, currentIndex: that.state.currentIndex+1})
        })
        .catch(function (error) {
            console.log(error)
            that.setState({ErrorModal: true, ErrorMsg: error.response.data.message})
        })
    }

    Clean(){
        if(this.state.currentIndex === 3){
                return(
                    <div>
                        <h1 style={{color: "green"}}>Your order is placed successfully!</h1>
                        <p style={{color: "black"}}>Go to <span style={{color: "purple", cursor: "pointer"}} onClick={()=>{ReactRouter.goTo("/account")}}>your account to track it!<span className="glyphicon glyphicon-user"></span></span></p>
                    </div>    
                )
        }
    }

    PaymentNext(){
        if(this.state.paymentMethod == 'Cash On Delivery'){
            this.setState({currentIndex: this.state.currentIndex + 1})
        }
        else if(this.state.paymentMethod == 'Select'){
            this.setState({ErrorModal: true, ErrorMsg: "Select payment method"})
        }
        else{
            if(this.state.transId.length === 12 && isInt(this.state.transId)){
                this.setState({currentIndex: this.state.currentIndex + 1})
            }
            else {
                this.setState({ErrorModal: true, ErrorMsg: "Transaction ID must be 12 numbers"})
            }
        }
    }

    Cart(){
        if(this.state.cart){
            return(
            <div style={{color: "black"}}>
                <CartDetails/>
            </div>
            )
        }
    }

    Bar(){
    if (!this.state.cart && this.state.loaded){
        return (
        <div>
            {this.state.currentIndex > 0 && this.state.currentIndex < 3 && <span style={{color: "red", fontSize: 17, cursor: "pointer"}} onClick={()=>{this.setState({currentIndex: this.state.currentIndex-1})}} class="glyphicon glyphicon-arrow-left"> <span style={{fontFamily: "arial"}}>Back</span></span> }
            <h2 style={{color: "black", textAlign: "center"}}>{this.state.current[this.state.currentIndex]}</h2>
            <div class="progress">
                <div class={this.state.currentN[this.state.currentIndex] > 66 ? "progress-bar progress-bar-success progress-bar-striped active" : this.state.currentN[this.state.currentIndex] > 33 ? "progress-bar progress-bar-striped active" : "progress-bar progress-bar-warning progress-bar-striped active"} role="progressbar"
                    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: `${this.state.currentN[this.state.currentIndex]}%`}}>
                </div>
            </div>
        </div>
        )
    }
    }

    Shipping(){
    if(!this.state.cart){
        if(this.state.currentIndex === 0 && !this.state.gotData && this.state.loaded){
            return (
                <div class="form-group has-feedback">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.firstName.length > 2 ? "green" : "red"}}>{this.state.firstName.length > 2 ? "":'*'} First Name</label>
                        <input class="form-control" type="text" value={this.state.firstName} onChange={e => this.updateInput("firstName", e.target.value)} placeholder="First Name" required></input>
                        <br/>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.lastName.length > 2 ? "green" : "red"}}>{this.state.lastName.length > 2 ? "":'*'} Last Name</label>
                        <input class="form-control" type="text" value={this.state.lastName} onChange={e => this.updateInput("lastName", e.target.value)} placeholder="Last Name" required></input>
                        <br/>
                    </div>
                </div>

                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.Phone.length === 11 ? "green" : "red"}}>{this.state.Phone.length === 11 ? "":'*'} Phone Number</label>
                        <input class="form-control" type="text" value={this.state.Phone} onChange={e => this.updateInput("Phone", e.target.value)} placeholder="Phone Number" required></input>
                        <br/>
                    </div>
                </div>

                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.city != '' ? "green" : "red"}}>{this.state.city != '' ? "":'*'} City</label>
                        <select class="form-control" id="sel1" value={this.state.city} onChange={e => this.updateInput("city", e.target.value)}>
                            <option>Select</option>
                            <option>Cairo</option>
                            <option>Giza</option>
                            <option>Helwan</option>
                            <option>6 of october</option>
                        </select>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.Area.length > 4 ? "green" : "red"}}>{this.state.Area.length > 4 ? "":'*'} Area</label>
                        <input class="form-control" type="text" value={this.state.Area} onChange={e => this.updateInput("Area", e.target.value)} placeholder="Your Area" required></input>
                        <br/>
                    </div>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <label style={{color: this.state.StName.length > 6 ? "green" : "red"}}>{this.state.StName.length > 6 ? "":'*'} Street Name/No</label>
                        <input class="form-control" type="text" value={this.state.StName} onChange={e => this.updateInput("StName", e.target.value)} placeholder="Street Name/No" required></input>
                        <br/>
                    </div>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <label style={{color: this.state.locationType != '' ? "green" : "red"}}>{this.state.locationType != '' ? "":'*'} Location Type</label>
                        <select class="form-control" id="sel1" value={this.state.locationType} onChange={e => this.updateInput("locationType", e.target.value)}>
                            <option>Select</option>
                            <option>Home</option>
                            <option>Business</option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                    <br/>
                        <label style={{color: "black"}}> Shipping Note</label>
                        <textarea onChange={e => this.updateInput("note", e.target.value)} value={this.state.note} class="form-control" rows="2" id="comment"></textarea>
                    </div>
                </div>
                    <div class="col-xs-12 col-md-offset-6 col-lg-offset-6">
                        <button class="btn btn-success" style={{color : "white", width: 270, marginTop: 20, lineHeight: 2}} onClick={()=>{this.updateShipping()}}>
                            <span className="icon glyphicon glyphicon-ok"></span>
                            <span className="text" style={{fontWeight: "bold"}}>Save</span>
                        </button>
                    </div>
                </div>
            )
        }
    else if (this.state.currentIndex === 0 && this.state.gotData && this.state.loaded){
        return (
            <div>
            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Shipped To:</span> {this.state.firstName} {this.state.lastName}</label>
                    <br/>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Mobile Number:</span> {this.state.Phone}</label>
                    <br/>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Area:</span> {this.state.city} / {this.state.Area}</label>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Address:</span> {this.state.StName}</label>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Location Type:</span> {this.state.locationType}</label>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Shipping Note:</span> {this.state.note ? this.state.note : "No Shipping Note"}</label>
                </div>
            </div>

                <div class="col-xs-12 col-md-6 col-lg-6">
                    <button class="btn btn-danger" style={{color : "white", width: 250, marginTop: 20, lineHeight: 2}} onClick={()=>{this.setState({gotData: false})}}>
                        <span className="icon glyphicon glyphicon-ok"></span>
                        <span className="text" style={{fontWeight: "bold"}}>Edit</span>
                    </button>
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <button class="btn btn-success" style={{color : "white", width: 250, marginTop: 20, lineHeight: 2}} onClick={()=>{this.setState({currentIndex: 1})}}>
                        <span className="icon glyphicon glyphicon-ok"></span>
                        <span className="text" style={{fontWeight: "bold"}}>Next</span>
                    </button>
                </div>
            </div>
        )
    }
}
}

    Payment(){
        if(this.state.currentIndex === 1){
            return ( 
            <div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.paymentMethod != 'Select'  ? "green" : "red"}}>{this.state.paymentMethod != 'Select'  ? "":'*'} Payment Method</label>
                        <select class="form-control" id="sel1" value={this.state.paymentMethod} onChange={e => this.setState({paymentMethod: e.target.value, transId: ''})}>
                            <option>Select</option>
                            <option>Vodafone Cash</option>
                            <option>Etisalat Cash</option>
                            <option>Fawry</option>
                            <option>Cash On Delivery</option>
                        </select>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-6">
                      {this.state.paymentMethod === "Vodafone Cash" && <img src={VodafoneCashLogo} style ={{width: 70, height: 70}}/> }
                      {this.state.paymentMethod === "Etisalat Cash" && <img src={EtisalatCashLogo} style ={{width: 70, height: 70}}/> }
                      {this.state.paymentMethod === "Fawry" && <img src={FawryLogo} style ={{width: 70, height: 70}}/> }
                    </div>
                </div>

               {this.state.paymentMethod === "Vodafone Cash" || this.state.paymentMethod === "Etisalat Cash" || this.state.paymentMethod === "Fawry" ?
                 <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <label style={{color: this.state.transId.length == 12 ? "green" : "red"}}>{this.state.transId.length == 12 ? "":'*'} Transaction ID</label>
                        <input class="form-control" type="text" value={this.state.transId} onChange={e => this.updateInput("transId", e.target.value)} placeholder="Transaction ID" required></input>
                    </div>
                </div> : null}
                <div class="col-xs-12 col-md-offset-6 col-lg-offset-6">
                    <button class="btn btn-success" style={{color : "white", width: 270, marginTop: 20, lineHeight: 2}} onClick={()=>{this.PaymentNext()}}>
                        <span className="icon glyphicon glyphicon-ok"></span>
                        <span className="text" style={{fontWeight: "bold"}}>Next</span>
                    </button>
                </div>
            </div>
            )
        }
    }

    onOpenModal = (type) => {
        this.setState({[type]: true });
      };
     
    onCloseModal = (type) => {
        this.setState({[type]: false });
    };

    getShippingData(){
        if(this.props.loginData.loggedState){
            var that = this
            axios.get(`${this.state.Url}getUserAddress`, {headers: this.state.headers})
            .then(success => {
                const shipping = success.data.user.ShippingData
                    if(shipping){
                        that.setState({firstName: shipping.FirstName, 
                                       lastName: shipping.LastName,
                                       Phone: shipping.Phone, 
                                       city: shipping.City, 
                                       Area: shipping.Area,
                                       locationType: shipping.LocationType,
                                       StName: shipping.StreetNameNo,
                                       note: shipping.ShippingNote,
                                       gotData: true,
                                       loaded: true})
                    }
            }, error => {
            });
        }
    }

    updateShipping(){
        var that = this
        var Data = {FirstName: this.state.firstName, 
                    LastName: this.state.lastName,
                    Phone: this.state.Phone, 
                    City: this.state.city, 
                    Area: this.state.Area, 
                    StreetNameNo: this.state.StName, 
                    LocationType: this.state.locationType,
                    ShippingNote: this.state.note}
        axios.post(this.state.Url+"setUserAddress", Data, {headers: this.state.headers})
        .then(function (response) {
            window.location.reload();
        })
        .catch(function (error) {
            that.setState({ErrorModal: true, ErrorMsg: error.response.data.message})
        })
    }

    updateInput(key, value) {
        this.setState({ [key]: value });
    }

    createCart(){
        let CART = this.props.cart.map(item => {
            return (
                <div key={item.id}>
                    <div class="col-md-12 col-lg-12" style={{backgroundColor: "white"}}>
                        <div class="col-md-3 col-lg-3">
                            <img src={item.img} style={{width: 50, height: 45, marginTop: 5}} alt={item.id}/>
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

    Done(){
    if(this.state.currentIndex === 2){
        return(
        <div>
            <div class="col-xs-12 col-md-12 col-lg-12">
                <h1 style={{color: "black"}}>Shipping Info:</h1>
                <br/>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Shipped To:</span> {this.state.firstName} {this.state.lastName}</label>
                    <br/>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Mobile Number:</span> {this.state.Phone}</label>
                    <br/>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Area:</span> {this.state.city} / {this.state.Area}</label>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Address:</span> {this.state.StName}</label>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Location Type:</span> {this.state.locationType}</label>
                </div>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <label style={{color: "green"}}><span style={{color: "black"}}>Shipping Note:</span> {this.state.note ? this.state.note : "No Shipping Note"}</label>
                </div>
            </div>
            <div class="col-xs-12 col-md-12 col-lg-12">
                <h1 style={{color: "black"}}>Payment Method:</h1>
                <label style={{color: "green"}}><span style={{color: "black"}}></span>Paid by {this.state.paymentMethod}</label>
            </div>
            <div class="col-xs-12 col-md-offset-6 col-lg-offset-6">
                <button class="btn btn-success" style={{color : "white", width: 270, marginTop: 20, lineHeight: 2}} onClick={()=>{this.createOrder()}}>
                    <span className="icon glyphicon glyphicon-ok"></span>
                    <span className="text" style={{fontWeight: "bold"}}>Submit</span>
                </button>
            </div>
        </div>
        )
    }
}

render(){
    return(
    <div class="PrivacyBG">
        <br/><br/><br/><br/>
        <div class="container">
        <div class="col-xs-12 col-md-8 col-lg-8">
            <div class="WhiteBG">
                       {!this.state.loaded && <div>
                            <PacmanLoader
                                css={override}
                                sizeUnit={"px"}
                                size={100}
                                color={'#FFFF00'}
                                loading={true}/>
                            <h2 style={{color: "white"}}>Loading...</h2>
                        </div> }
                {!this.props.loginData.loggedState && !this.state.cart ?
                    <h1 style={{color: "red"}}>Please, login first</h1>
                    : 
                    <div>
                        {this.Bar()}
                        {this.Shipping()}
                        {this.Payment()}
                        {this.Cart()}
                        {this.Done()}
                        {this.Clean()}
                    </div> 
                }

                </div>
            </div>
            {/* CART */}
            <div class="col-xs-12 col-md-4 col-lg-4">

                <div class="WhiteBG">
                   {!this.state.cart && this.state.currentIndex != 3 && <span style={{color: "#6F52FF", fontSize: 17, cursor: "pointer"}} onClick={()=>{this.setState({cart: true, currentIndex: 0})}} class="glyphicon glyphicon-arrow-left"> <span style={{fontFamily: "arial"}}>Edit Cart</span></span>}
                    <h3 style={{color: "black"}}>Shopping Cart <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;<span class="label label-warning">{this.props.cartInfo.totalItems}</span></h3>


                        {this.createCart()}

               {this.props.cartInfo.totalItems > 0 ?   
                <div>  
                    <h5 style={{color: "black"}}>{this.props.cartInfo.totalItems > 1 ? "Items" : "Item"}: <span style={{color: "black"}}>{this.props.cartInfo.totalPrice} EGP</span></h5>
                    <h5 style={{color: "black"}}>+ Shipping: <span style={{color: "black"}}> {this.props.cartInfo.totalPrice < 400 ? "30 EGP" : "0 FREE"}  </span></h5>
                <div class="bordersep-thick"/>
                    <h4 style={{color: "black", fontWeight: "bold"}}>Grand Total: {this.props.cartInfo.totalPrice < 400 ? this.props.cartInfo.totalPrice + 30 : this.props.cartInfo.totalPrice} EGP</h4>
                 </div>
                 :
                 <div>
                     <h3 style={{color: "black"}}>You have no items in your cart</h3>
                 </div> }
                </div>
            </div>
        </div>
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
  
  const matchDispatchToProps = dispatch => bindActionCreators(
    {
        cleanCart,
        cleanCartInfo
    },
    dispatch,
  )


  export default connect(mapStateToProps, matchDispatchToProps)(Checkout);