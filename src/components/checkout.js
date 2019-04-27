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
import CurrencyFormat from 'react-currency-format';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import NextIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/BorderColor';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BackIcon from '@material-ui/icons/SkipPrevious';
import i18next from 'i18next';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const override = css`
    display: block;
    border-color: red;
`;

const styles = theme => ({
    Avatar: {
        margin: 10,
        width: 80,
        height: 80,
      },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    extendedIcon2: {
        marginRight: theme.spacing.unit * 6,
    },
});

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
        paymentMethod: '',
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
        const { t } = this.props;
        var that = this
        var payment;
        switch(this.state.paymentMethod){
            case `${t('vodaCash')}`:
                payment = 'Vodafone Cash'
            break;
            case `${t('etisCash')}`:
                payment = 'Etisalat Cash'
            break;
            case `${t('fawry')}`:
                payment = 'Fawry'
            break;
            case `${t('cashOnDel')}`:
                payment = 'Cash On Delivery'
            break;
        }
        var Data = {paymentMethod: payment,
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
        const { t } = this.props;
        if(this.state.currentIndex === 3){
                return(
                    <div>
                        <h1 style={{color: "green"}}>{t('madeOrder')}</h1>
                        <p style={{color: "black"}}><span style={{color: "purple", cursor: "pointer"}} onClick={()=>{ReactRouter.goTo("/account")}}>{t('madeOrderText')}<span className="glyphicon glyphicon-user"></span></span></p>
                    </div>    
                )
        }
    }

    PaymentNext(){
        const { t } = this.props;
        if(this.state.paymentMethod === `${t('cashOnDel')}`){
            this.setState({currentIndex: this.state.currentIndex + 1})
        }
        else if(this.state.paymentMethod === `${t('select')}` || this.state.paymentMethod === ``){
            this.setState({ErrorModal: true, ErrorMsg: `${t('noPaymentMethod')}`})
        }
        else if (this.state.paymentMethod !== `${t('cashOnDel')}` && this.state.paymentMethod !== `${t('select')}`){
            if(this.state.transId.length === 12 && isInt(this.state.transId)){
                this.setState({currentIndex: this.state.currentIndex + 1})
            }
            else {
                this.setState({ErrorModal: true, ErrorMsg: `${t('wrongTransId')}`})
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
    const { t } = this.props;
    const { classes } = this.props;
    let current =  [`${t('shipping')}`, `${t('barPayment')}`, `${t('barReview')}`, `${t('barDone')}`]
    if (!this.state.cart && this.state.loaded){
        return (
        <div>
            {this.state.currentIndex > 0 && this.state.currentIndex < 3 && 
            <Fab variant="extended" aria-label="Back" onClick={()=>{this.setState({currentIndex: this.state.currentIndex-1})}} className={classes.fab}>
                <BackIcon className={classes.extendedIcon} />
                    {t('back')}
            </Fab>}
            <h2 style={{color: "black", textAlign: "center"}}>{current[this.state.currentIndex]}</h2>
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
    const { t } = this.props;
    const { classes } = this.props;
    if(!this.state.cart){
        if(this.state.currentIndex === 0 && !this.state.gotData && this.state.loaded){
            return (
                <div class="form-group has-feedback">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.firstName.length > 2 ? "green" : "red"}}>{this.state.firstName.length > 2 ? "":'*'} {t('firstName')}</label>
                        <input class="form-control" type="text" value={this.state.firstName} onChange={e => this.updateInput("firstName", e.target.value)} placeholder={t('firstName')} required></input>
                        <br/>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.lastName.length > 2 ? "green" : "red"}}>{this.state.lastName.length > 2 ? "":'*'} {t('lastName')}</label>
                        <input class="form-control" type="text" value={this.state.lastName} onChange={e => this.updateInput("lastName", e.target.value)} placeholder={t('firstName')} required></input>
                        <br/>
                    </div>
                </div>

                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.Phone.length === 11 ? "green" : "red"}}>{this.state.Phone.length === 11 ? "":'*'} {t('phone')}</label>
                        <input class="form-control" type="text" value={this.state.Phone} onChange={e => this.updateInput("Phone", e.target.value)} placeholder={t('phone')} required></input>
                        <br/>
                    </div>
                </div>

                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.city != '' ? "green" : "red"}}>{this.state.city != '' ? "":'*'} {t('city')}</label>
                        <select class="form-control" id="sel1" value={this.state.city} onChange={e => this.updateInput("city", e.target.value)}>
                            <option>{t('select')}</option>
                            <option>{t('cairo')}</option>
                            <option>{t('giza')}</option>
                            <option>{t('helwan')}</option>
                            <option>{t('6oct')}</option>
                        </select>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.Area.length > 4 ? "green" : "red"}}>{this.state.Area.length > 4 ? "":'*'} {t('area')}</label>
                        <input class="form-control" type="text" value={this.state.Area} onChange={e => this.updateInput("Area", e.target.value)} placeholder={t('area')} required></input>
                        <br/>
                    </div>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <label style={{color: this.state.StName.length > 6 ? "green" : "red"}}>{this.state.StName.length > 6 ? "":'*'} {t('streetName')}</label>
                        <input class="form-control" type="text" value={this.state.StName} onChange={e => this.updateInput("StName", e.target.value)} placeholder={t('streetName')} required></input>
                        <br/>
                    </div>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <label style={{color: this.state.locationType != '' ? "green" : "red"}}>{this.state.locationType != '' ? "":'*'} {t('locationType')}</label>
                        <select class="form-control" id="sel1" value={this.state.locationType} onChange={e => this.updateInput("locationType", e.target.value)}>
                            <option>{t('select')}</option>
                            <option>{t('locationHome')}</option>
                            <option>{t('locationBusiness')}</option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                    <br/>
                        <label style={{color: "black"}}> {t('shippingNote')}</label>
                        <textarea onChange={e => this.updateInput("note", e.target.value)} value={this.state.note} class="form-control" rows="2" id="comment"></textarea>
                    </div>
                </div>
                    <div class="col-xs-12 col-md-offset-6 col-lg-offset-6">
                            <Fab color="primary" variant="extended" aria-label="Save" onClick={()=>{this.updateShipping()}} className={classes.fab}>
                                <NextIcon className={classes.extendedIcon2} />
                                <h5>{t('save')}</h5>
                            </Fab>
                    </div>
                </div>
            )
        }
    else if (this.state.currentIndex === 0 && this.state.gotData && this.state.loaded){
        if (i18next.language === "EN"){
        return (
            <div style={{whiteSpace: "normal", wordWrap: "break-word"}}>
                    <h4>{t('shippedTo')}:</h4>
                    <ListItemText primary={<h4>{this.state.firstName} {this.state.lastName}</h4>} />
                <Divider />
                    <h4>{t('phone')}:</h4>
                    <ListItemText primary={<h4>{this.state.Phone}</h4>} />
                <Divider />
                    <h4>{t('area')}:</h4>
                    <ListItemText primary={<h4>{this.state.city} / {this.state.Area}</h4>} />
                <Divider />
                    <h4>{t('streetName')}:</h4>
                    <ListItemText primary={<h4>{this.state.StName}</h4>} />
                <Divider />
                    <h4>{t('locationType')}:</h4>
                    <ListItemText primary={<h4>{this.state.locationType}</h4>} />
                <Divider />
                    <h4 >{t('shippingNote')}:</h4>
                    <ListItemText primary={<h4>{this.state.note ? this.state.note : `${t('noShippingNote')}`}</h4>} />

                <div class="col-xs-12 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Fab color="secondary" variant="extended" aria-label="Edit" onClick={()=>{this.setState({gotData: false})}} className={classes.fab}>
                            <EditIcon className={classes.extendedIcon2} />
                            <h5>{t('edit')}</h5>
                        </Fab>
                    </Grid>
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.setState({currentIndex: 1})}} className={classes.fab}>
                            <NextIcon className={classes.extendedIcon2} />
                            <h5>{t('next')}</h5>
                        </Fab>
                    </Grid>
                </div>
            </div>
        )}
    else{
        return(
            <div style={{whiteSpace: "normal", wordWrap: "break-word"}}>
                <h4>:{t('shippedTo')}</h4>
                <ListItemText primary={<h4>{this.state.firstName} {this.state.lastName}</h4>} />
            <Divider />
                <h4>:{t('phone')}</h4>
                <ListItemText primary={<h4>{this.state.Phone}</h4>} />
            <Divider />
                <h4>:{t('area')}</h4>
                <ListItemText primary={<h4>{this.state.city} / {this.state.Area}</h4>} />
            <Divider />
                <h4>:{t('streetName')}</h4>
                <ListItemText primary={<h4>{this.state.StName}</h4>} />
            <Divider />
                <h4>:{t('locationType')}</h4>
                <ListItemText primary={<h4>{this.state.locationType}</h4>} />
            <Divider />
                <h4>:{t('shippingNote')}</h4>
                <ListItemText primary={<h4>{this.state.note ? this.state.note : `${t('noShippingNote')}`}</h4>} />

            <div class="col-xs-12 col-md-6 col-lg-6">
                <Grid container justify="center" alignItems="center">
                    <Fab color="secondary" variant="extended" aria-label="Edit" onClick={()=>{this.setState({gotData: false})}} className={classes.fab}>
                        <EditIcon className={classes.extendedIcon2} />
                        <h5>{t('edit')}</h5>
                    </Fab>
                </Grid>
            </div>
            <div class="col-xs-12 col-md-6 col-lg-6">
                <Grid container justify="center" alignItems="center">
                    <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.setState({currentIndex: 1})}} className={classes.fab}>
                        <NextIcon className={classes.extendedIcon2} />
                        <h5>{t('next')}</h5>
                    </Fab>
                </Grid>
            </div>
        </div>
        )
    }
    }
}
    }

    Payment(){
        const { t } = this.props;
        const { classes } = this.props;
        if(this.state.currentIndex === 1){
            return ( 
            <div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.paymentMethod != ``  ? "green" : "red"}}>{this.state.paymentMethod != ``  ? "":'*'} {t('paymentMethod')}</label>
                        <select class="form-control" id="sel1" value={this.state.paymentMethod} onChange={e => this.setState({paymentMethod: e.target.value, transId: ''})}>
                            <option>{t('select')}</option>
                            <option>{t('vodaCash')}</option>
                            <option>{t('etisCash')}</option>
                            <option>{t('fawry')}</option>
                            <option>{t('cashOnDel')}</option>
                        </select>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-6">
                      {this.state.paymentMethod === `${t('vodaCash')}` && <img src={VodafoneCashLogo} style ={{width: 70, height: 70}}/> }
                      {this.state.paymentMethod === `${t('etisCash')}` && <img src={EtisalatCashLogo} style ={{width: 70, height: 70}}/> }
                      {this.state.paymentMethod === `${t('fawry')}` && <img src={FawryLogo} style ={{width: 70, height: 70}}/> }
                    </div>
                </div>

               {this.state.paymentMethod === `${t('vodaCash')}` || this.state.paymentMethod === `${t('etisCash')}` || this.state.paymentMethod === `${t('fawry')}` ?
                 <div class="col-xs-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <label style={{color: this.state.transId.length == 12 ? "green" : "red"}}>{this.state.transId.length == 12 ? "":'*'} {t('transId')}</label>
                        <input class="form-control" type="text" value={this.state.transId} onChange={e => this.updateInput("transId", e.target.value)} placeholder={t('transId')} required></input>
                    </div>
                </div> : null}
                <div class="col-xs-12 col-md-offset-6 col-lg-offset-6">
                    <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.PaymentNext()}} className={classes.fab}>
                        <NextIcon className={classes.extendedIcon2} />
                            {t('next')}
                    </Fab>
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
        const { t } = this.props;
        const { classes } = this.props;
        let CART = this.props.cart.map(item => {
            return (
                <div key={item.id}>
                    <div class="row">
                        <div class="col-xs-12 col-md-3 col-lg-3">
                            <Avatar alt="Product Picture" src={item.defaultImage} className={classes.Avatar} />
                        </div>
                        <div class="col-xs-12 col-md-3 col-lg-3">
                            <ListItem>
                                <ListItemText primary={<h5>{item.Name.length > 20 ? (((item.Name).substring(0,10-3)) + '...') : item.Name}</h5>} />
                            </ListItem>
                        </div>
                        <div class="col-xs-6 col-md-3 col-lg-3">
                            <ListItem>
                                <ListItemText primary={<h5><CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />{t('currency')}</h5>}/>
                            </ListItem>
                        </div>  
                        <div class="col-xs-6 col-md-3 col-lg-3">
                            <ListItem>
                                    <ListItemText primary={<h5>{t('quantity')}: {item.quantity}</h5>}/>
                            </ListItem>
                        </div>  
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
    const { t } = this.props;
    const { classes } = this.props;
    if(this.state.currentIndex === 2){
        if (i18next.language === "EN"){
            return (
                <div style={{whiteSpace: "normal", wordWrap: "break-word"}}>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <h1 style={{color: "black"}}>{t('shipping')}:</h1>
                    </div>
                        <h4>{t('shippedTo')}:</h4>
                        <ListItemText primary={<h4>{this.state.firstName} {this.state.lastName}</h4>} />
                        <h4>{t('phone')}:</h4>
                        <ListItemText primary={<h4>{this.state.Phone}</h4>} />
                        <h4>{t('area')}:</h4>
                        <ListItemText primary={<h4>{this.state.city} / {this.state.Area}</h4>} />
                        <h4>{t('streetName')}:</h4>
                        <ListItemText primary={<h4>{this.state.StName}</h4>} />
                        <h4>{t('locationType')}:</h4>
                        <ListItemText primary={<h4>{this.state.locationType}</h4>} />
                        <h4 >{t('shippingNote')}:</h4>
                        <ListItemText primary={<h4>{this.state.note ? this.state.note : `${t('noShippingNote')}`}</h4>} />

                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <h1 style={{color: "black"}}>{t('paymentMethod')}:</h1>
                        <ListItemText primary={<h4>{this.state.paymentMethod}</h4>} />
                    </div>
                    <div class="col-xs-12 col-md-offset-6 col-lg-offset-6">
                    <Fab color="primary" variant="extended" aria-label="Save" onClick={()=>{this.createOrder()}} className={classes.fab}>
                        <NextIcon className={classes.extendedIcon2} />
                        <h5>{t('submit')}</h5>
                    </Fab>
                    </div>
                </div>
            )}
        else{
            return(
                <div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <h1 style={{color: "black"}}>:{t('shipping')}</h1>
                </div>
                    <h4>:{t('shippedTo')}</h4>
                    <ListItemText primary={<h4>{this.state.firstName} {this.state.lastName}</h4>} />
                    <h4>:{t('phone')}</h4>
                    <ListItemText primary={<h4>{this.state.Phone}</h4>} />
                    <h4>:{t('area')}</h4>
                    <ListItemText primary={<h4>{this.state.city} / {this.state.Area}</h4>} />
                    <h4>:{t('streetName')}</h4>
                    <ListItemText primary={<h4>{this.state.StName}</h4>} />
                    <h4>:{t('locationType')}</h4>
                    <ListItemText primary={<h4>{this.state.locationType}</h4>} />
                    <h4>:{t('shippingNote')}</h4>           
                    <ListItemText primary={<h4 style={{whiteSpace: "normal", wordWrap: "break-word"}}>{this.state.note ? this.state.note : `${t('noShippingNote')}`}</h4>} />

                <div class="col-xs-12 col-md-12 col-lg-12">
                        <h1 style={{color: "black"}}>:{t('paymentMethod')}</h1>
                        <ListItemText primary={<h4>{this.state.paymentMethod}</h4>} />
                </div>
                <div class="col-xs-12 col-md-offset-6 col-lg-offset-6">
                    <Fab color="primary" variant="extended" aria-label="Save" onClick={()=>{this.createOrder()}} className={classes.fab}>
                        <NextIcon className={classes.extendedIcon2} />
                        <h5>{t('submit')}</h5>
                    </Fab>
                </div>
            </div>
            )
        }
    }
}

render(){
    const { t } = this.props;
    const { classes } = this.props;
    var total = this.props.cartInfo.totalPrice
    var grandTotal = total > 400 ? total : total + 30
    return(
    <div class="GG-BG-INVERSE">
        <div  style={{padding: 10}}>
        <div class="col-xs-12 col-md-8 col-lg-8">
            <div class="WhiteBG">
                       {!this.state.loaded && this.props.loginData.loggedState && <div>
                            <PacmanLoader
                                css={override}
                                sizeUnit={"px"}
                                size={100}
                                color={'#FFFF00'}
                                loading={true}/>
                            <h2 style={{color: "black"}}>{t('loading')}...</h2>
                        </div> }
                {!this.props.loginData.loggedState && !this.state.cart ?
                    <h1 style={{color: "red"}}>{t('notLogged')}</h1>
                    : 
                    this.props.loginData.loggedState && this.state.currentIndex != 3 && this.props.cartInfo.totalItems === 0 ?
                         <h1 style={{color: "red"}}>{t('emptyCart')}</h1>  
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
                   {!this.state.cart && this.state.currentIndex != 3 && this.props.cartInfo.totalItems > 0 && 
                    <Fab color="primary" variant="extended" onClick={()=>{this.setState({cart: true, currentIndex: 0})}} className={classes.fab}>
                        <Badge className={classes.extendedIcon} badgeContent={this.props.cartInfo.totalItems} color="secondary">     
                            <ShoppingCart fontSize="large" style={{color: "#fff"}}/>
                        </Badge>
                            <h5>{t('editCart')}</h5>
                    </Fab>}

                    <Divider />

                        {this.createCart()}

               {this.props.cartInfo.totalItems > 0 ?   
                <div>  
                    <Typography variant="h4" color="#212121">
                        {t('items')} {<CurrencyFormat value={total.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}
                    </Typography>
                    <Typography variant="h4" color="#212121">
                    {this.props.cartInfo.totalPrice < 400 ?
                        `${t('shipping')}: 30${t('currency')}`
                        :
                        `${t('freeShip')}`
                        }
                    </Typography>
                <Divider />
                    <Typography variant="h4" color="#212121">
                        {t('grandTotal')} {<CurrencyFormat value={grandTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}
                    </Typography>                 
                </div>
                 :
                 <Typography variant="h4" color="#212121">
                        {t('emptyCart')}                 
                </Typography>}
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
        cartInfo: state.updateCartInfo
    }
  }
  
  const matchDispatchToProps = dispatch => bindActionCreators(
    {
        cleanCart,
        cleanCartInfo
    },
    dispatch,
  )


export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps, matchDispatchToProps),
)(Checkout);