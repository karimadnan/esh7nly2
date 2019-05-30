import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import NavBar from './navbar';
import ReactRouter from 'flux-react-router';
import '../Mycss.css';
import '../Respcss.css';
import amumu from '../Images/amumusad.png';
import fortniteDab from '../Images/fortnitedab.png';
import Modal from 'react-responsive-modal';
import isInt from 'validator/lib/isInt';
import {bindActionCreators} from 'redux';
import {cleanCart, cleanCartInfo, setShipping} from '../actions/index';
import CurrencyFormat from 'react-currency-format';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NextIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/BorderColor';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BackIcon from '@material-ui/icons/SkipPrevious';
import i18next from 'i18next';
import Loader from '../containers/loader';
import {Helmet} from "react-helmet";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Scrollbars } from 'react-custom-scrollbars';
import Avatar from '@material-ui/core/Avatar';
import Select from 'react-select';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


const styles = theme => ({
    Avatar: {
        margin: 10,
        width: 80,
        height: 80,
      },
    divider: {
        margin: theme.spacing.unit,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    extendedIcon2: {
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up('lg')]: {
            fontSize: 15,
            minWidth: 100,
            maxWidth: 100,
          }
    },
    cartFont: {
        fontSize: 13,
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
          fontSize: 17,
        }
    },
    priceFont: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#3F51B5',
        [theme.breakpoints.up('sm')]: {
          fontSize: 17,
        }
    },
    shoppingCartFont:{
        fontSize: 13,
        fontWeight: 'bold',
        color: '#212121',
        margin: theme.spacing.unit,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20,
        }
    },
    shoppingCartPrice:{
        fontSize: 13,
        fontWeight: 'bold',
        color: '#212121',
        margin: theme.spacing.unit,
        [theme.breakpoints.up('sm')]: {
          fontSize: 17,
        }
    },
    vodaAvatar: {
        margin: 10,
        width: 150,
        height: 150,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#b71c1c',
      },
    etisAvatar: {
        margin: 10,
        width: 150,
        height: 150,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#1b5e20',
      },
    fawryAvatar: {
        margin: 10,
        width: 150,
        height: 150,
        fontWeight: 'bold',
        color: '#0277bd',
        backgroundColor: '#fdd835',
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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted black',
      color: state.isSelected ? 'white' : '#212121',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
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
        SuccessMsg: '',
        ShipPrice: '',
        shipping:[
            {label: 'Cairo', value: '30'},
            {label: 'Giza', value: '40'},
            {label: 'Helwan', value: '50'},
            {label: '6 of october', value: '60'}
        ],
        selectedShipping: ''
    }

    componentDidMount(){
        this.getShippingData()
    }

    handleShipping = selectedShipping => {
        this.setState({selectedShipping}, () =>{
            this.props.setShipping(this.state.selectedShipping.label, 'city')
            this.props.setShipping(this.state.selectedShipping.value, 'price')
            this.setState({city: this.state.selectedShipping.label})
        });
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
            default: 
            return undefined
        }
        var Data = {paymentMethod: payment,
                    orderType: "Products",
                    cart: this.props.cart,
                    totalPrice: this.props.cartInfo.totalPrice};
        if(this.state.transId){
            Data['transId']=this.state.transId
        }
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
            <div className="progress">
                <div className={this.state.currentN[this.state.currentIndex] > 66 ? "progress-bar progress-bar-success progress-bar-striped active" : this.state.currentN[this.state.currentIndex] > 33 ? "progress-bar progress-bar-striped active" : "progress-bar progress-bar-warning progress-bar-striped active"} role="progressbar"
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
                <div className="form-group has-feedback">
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <div className="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.firstName.length > 2 ? "green" : "red"}}>{this.state.firstName.length > 2 ? "":'*'} {t('firstName')}</label>
                        <input className="form-control" type="text" value={this.state.firstName} onChange={e => this.updateInput("firstName", e.target.value)} placeholder={t('firstName')} required></input>
                        <br/>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.lastName.length > 2 ? "green" : "red"}}>{this.state.lastName.length > 2 ? "":'*'} {t('lastName')}</label>
                        <input className="form-control" type="text" value={this.state.lastName} onChange={e => this.updateInput("lastName", e.target.value)} placeholder={t('firstName')} required></input>
                        <br/>
                    </div>
                </div>

                <div className="col-xs-12 col-md-12 col-lg-12">
                    <div className="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.Phone.length === 11 ? "green" : "red"}}>{this.state.Phone.length === 11 ? "":'*'} {t('phone')}</label>
                        <input className="form-control" type="text" value={this.state.Phone} onChange={e => this.updateInput("Phone", e.target.value)} placeholder={t('phone')} required></input>
                        <br/>
                    </div>
                </div>

                <div className="col-xs-12 col-md-12 col-lg-12">
                    <div className="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.city !== '' ? "green" : "red"}}>{this.state.city !== '' ? "":'*'} {t('city')}</label>
                        <Select
                            isSearchable={false}
                            isMulti={false}
                            styles={customStyles}
                            value={this.state.selectedShipping}
                            onChange={this.handleShipping}
                            options={this.state.shipping} placeholder={t('shipping')}
                        /> 
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.Area.length > 4 ? "green" : "red"}}>{this.state.Area.length > 4 ? "":'*'} {t('area')}</label>
                        <input className="form-control" type="text" value={this.state.Area} onChange={e => this.updateInput("Area", e.target.value)} placeholder={t('area')} required></input>
                        <br/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <label style={{color: this.state.StName.length > 6 ? "green" : "red"}}>{this.state.StName.length > 6 ? "":'*'} {t('streetName')}</label>
                        <input className="form-control" type="text" value={this.state.StName} onChange={e => this.updateInput("StName", e.target.value)} placeholder={t('streetName')} required></input>
                        <br/>
                    </div>
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <label style={{color: this.state.locationType !== '' ? "green" : "red"}}>{this.state.locationType !== '' ? "":'*'} {t('locationType')}</label>
                        <select className="form-control" id="sel1" value={this.state.locationType} onChange={e => this.updateInput("locationType", e.target.value)}>
                            <option>{t('select')}</option>
                            <option>{t('locationHome')}</option>
                            <option>{t('locationBusiness')}</option>
                        </select>
                    </div>
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <div className="col-xs-12 col-md-12 col-lg-12">
                    <br/>
                        <label style={{color: "black"}}> {t('shippingNote')}</label>
                        <textarea onChange={e => this.updateInput("note", e.target.value)} value={this.state.note} class="form-control" rows="2" id="comment"></textarea>
                    </div>
                </div>
                    <div className="col-xs-12 col-md-offset-6 col-lg-offset-6">
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

                <div className="col-xs-6 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Fab color="secondary" variant="extended" aria-label="Edit" onClick={()=>{this.setState({gotData: false})}} className={classes.fab}>
                            <EditIcon className={classes.extendedIcon2} />
                            <h5>{t('edit')}</h5>
                        </Fab>
                    </Grid>
                </div>
                <div className="col-xs-6 col-md-6 col-lg-6">
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

            <div className="col-xs-12 col-md-6 col-lg-6">
                <Grid container justify="center" alignItems="center">
                    <Fab color="secondary" variant="extended" aria-label="Edit" onClick={()=>{this.setState({gotData: false})}} className={classes.fab}>
                        <EditIcon className={classes.extendedIcon2} />
                        <h5>{t('edit')}</h5>
                    </Fab>
                </Grid>
            </div>
            <div className="col-xs-12 col-md-6 col-lg-6">
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
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <div className="col-xs-12 col-md-6 col-lg-6">
                        <label style={{color: this.state.paymentMethod !== ``  ? "green" : "red"}}>{this.state.paymentMethod !== ``  ? "":'*'} {t('paymentMethod')}</label>
                        <select className="form-control" id="sel1" value={this.state.paymentMethod} onChange={e => this.setState({paymentMethod: e.target.value, transId: ''})}>
                            <option>{t('select')}</option>
                            <option>{t('vodaCash')}</option>
                            <option>{t('etisCash')}</option>
                            <option>{t('fawry')}</option>
                            <option>{t('cashOnDel')}</option>
                        </select>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-6">
                      {this.state.paymentMethod === `${t('vodaCash')}` && <Avatar className={classes.vodaAvatar}>Vodafone</Avatar> }
                      {this.state.paymentMethod === `${t('etisCash')}` && <Avatar className={classes.etisAvatar}>Etisalat</Avatar>  }
                      {this.state.paymentMethod === `${t('fawry')}` && <Avatar className={classes.fawryAvatar}>Fawry</Avatar>   }
                    </div>
                </div>

               {this.state.paymentMethod === `${t('vodaCash')}` || this.state.paymentMethod === `${t('etisCash')}` || this.state.paymentMethod === `${t('fawry')}` ?
                 <div className="col-xs-12 col-md-12 col-lg-12">
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <label style={{color: this.state.transId.length === 12 ? "green" : "red"}}>{this.state.transId.length === 12 ? "":'*'} {t('transId')}</label>
                        <input className="form-control" type="text" value={this.state.transId} onChange={e => this.updateInput("transId", e.target.value)} placeholder={t('transId')} required></input>
                    </div>
                </div> : null}
                <div className="col-xs-12 col-md-offset-6 col-lg-offset-6">
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
        if(this.props.loginData.loggedState && !this.props.loginData.isAdmin){
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
                                       ShipPrice: shipping.ShippingPrice,
                                       gotData: true,
                                       loaded: true})
                    }
                    else{
                        that.setState({gotData: false, loaded: true})
                    }
            }, error => {
                that.setState({gotData: false, loaded: true})
            });
        }
    }

    updateShipping(){
        const { t } = this.props;
        var locationType;
        switch(this.state.locationType){
            case `${t('locationBusiness')}`:
                locationType = 'Business'
            break;
            case `${t('locationHome')}`:
                locationType = 'Home'
            break;
            default: 
            return undefined
        }
        var that = this
        var Data = {FirstName: this.state.firstName, 
                    LastName: this.state.lastName,
                    Phone: this.state.Phone, 
                    City: this.state.city, 
                    Area: this.state.Area, 
                    StreetNameNo: this.state.StName, 
                    LocationType: locationType,
                    ShippingNote: this.state.note,
                    ShippingPrice: this.props.cartInfo.shippingPrice}
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
            let productName = item.Name
            if(item.option){
                productName = `(${item.option}) ` + productName
            }
            if(item.size){
                productName = `(${item.size.charAt(0).toUpperCase()}) `+ productName
            }
            if(item.color){
                productName = `(${item.color.toUpperCase()}) `+ productName
            }
            return (
                <div key={item.id}> 
                    <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
                        <div className="col-xs-4 col-md-4 col-lg-4">
                            <img src={item.defaultImage} alt={'Product'} className="userOrdersImages" />
                        </div>
                        <div className="col-xs-8 col-md-8 col-lg-8">
                            <div className="col-xs-12 col-md-12 col-lg-12">
                                <Typography className={classes.cartFont}>
                                    {productName.length > 20 ? (((productName).substring(0,20-3)) + '...') : productName}
                                </Typography>
                            </div>          
                            <div className="col-xs-12 col-md-12 col-lg-12">
                                <Typography className={classes.priceFont}>
                                    <CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} /> {t('currency')}
                                </Typography>
                            </div>  
                            <div className="col-xs-12 col-md-12 col-lg-12">
                                <ListItemText primary={<h5>{t('quantity')}: {item.quantity}</h5>}/>
                            </div>  
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
                    <div className="col-xs-12 col-md-12 col-lg-12">
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

                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <h1 style={{color: "black"}}>{t('paymentMethod')}:</h1>
                        <ListItemText primary={<h4>{this.state.paymentMethod}</h4>} />
                    </div>
                    <div className="col-xs-12 col-md-offset-6 col-lg-offset-6">
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
                <div className="col-xs-12 col-md-12 col-lg-12">
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

                <div className="col-xs-12 col-md-12 col-lg-12">
                        <h1 style={{color: "black"}}>:{t('paymentMethod')}</h1>
                        <ListItemText primary={<h4>{this.state.paymentMethod}</h4>} />
                </div>
                <div className="col-xs-12 col-md-offset-6 col-lg-offset-6">
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

returnGrandTotal(){
let outPut = 0
    if(this.state.ShipPrice){
        outPut = this.props.cartInfo.totalPrice + Number(this.state.ShipPrice)
    }
    else{
        outPut = this.props.cartInfo.totalPrice + Number(this.props.cartInfo.shippingPrice)
    }
return outPut
}

returnShippingCost(){
let outPut = 0
    if(this.props.cartInfo.shippingPrice){
        outPut = Number(this.props.cartInfo.shippingPrice)
    }
    else{
        outPut = Number(this.state.ShipPrice)
    }
return outPut
}

render(){
    const { t } = this.props;
    const { classes } = this.props;
    let total = this.props.cartInfo.totalPrice;
    let grandTotal = this.returnGrandTotal();


    return(
    <div className="GG-BG-INVERSE">
        <Helmet>
            <title>{t('checkoutTitle')}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        </Helmet>
        <div className="col-xs-12 col-md-8 col-lg-8">
        <div style={{margin: 10}}>
            <div className="WhiteBG">
                {!this.state.loaded && this.props.loginData.loggedState && !this.props.loginData.isAdmin && <Loader />}
                {this.props.loginData.isAdmin ? <h1 style={{color: "red"}}>Admins cannot checkout</h1>:undefined}
                {!this.props.loginData.loggedState && !this.state.cart ?
                    <h1 style={{color: "red"}}>{t('notLogged')}</h1>
                    : 
                    this.props.loginData.loggedState && this.state.currentIndex !== 3 && this.props.cartInfo.totalItems === 0 ?
                         <h1 style={{color: "red"}}>{t('emptyCart')}</h1>  
                    :
                    <div>
                        {this.Bar()}
                        {this.Shipping()}
                        {this.Payment()}
                        {this.Done()}
                        {this.Clean()}
                    </div> 
                }
            </div>
            </div>
            </div>
            {/* CART */}
            <div className="col-xs-12 col-md-4 col-lg-4">
            <div style={{margin: 10}}>
            <div className="cartBG">
                   {!this.state.cart && this.state.currentIndex !== 3 && this.props.cartInfo.totalItems > 0 ? 
                   
                <div style={{backgroundColor: fade('#f2efef', 0.625)}}>
                    <Grid container justify="center" alignItems="center">
                        <Typography className={classes.shoppingCartFont}>
                            {t('yourCart')}
                        </Typography>
                    </Grid>
                </div>
                :
                <div style={{backgroundColor: fade('#f2efef', 0.625)}}>
                    <Grid container justify="center" alignItems="center">
                        <Typography className={classes.shoppingCartFont}>
                            {t('emptyCart')}   
                        </Typography>
                    </Grid>
                </div>}

                <Scrollbars autoHeight 
                            autoHeightMin={100} 
                            autoHeightMax={300}
                            renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}>
                        {this.createCart()}
                </Scrollbars>

               {this.props.cartInfo.totalItems > 0 ?   
                <div>  
                    <div className="row" style={{backgroundColor: fade('#f2efef', 0.625)}}>
                    {i18next.language === "EN" ?
                        <div>
                            <div className="col-xs-6 col-md-6 col-lg-6">
                                <Grid container justify="flex-start" alignItems="center">
                                    <Typography className={classes.shoppingCartPrice}>
                                        {t('items')}: 
                                    </Typography>
                                </Grid>
                            </div>
                            <div className="col-xs-6 col-md-6 col-lg-6">
                                <Grid container justify="flex-end" alignItems="center">
                                    <Typography className={classes.shoppingCartPrice}>
                                        {<CurrencyFormat value={total.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}
                                    </Typography>
                                </Grid>
                            </div>
                        </div>
                    :
                        <div>
                            <div className="col-xs-6 col-md-6 col-lg-6">
                                <Grid container justify="flex-start" alignItems="center">
                                    <Typography className={classes.shoppingCartPrice}>
                                        {t('currency')} {<CurrencyFormat value={total.toFixed(2)} displayType={'text'} thousandSeparator={true} />}
                                    </Typography>
                                </Grid>
                            </div>

                            <div className="col-xs-6 col-md-6 col-lg-6">
                                <Grid container justify="flex-end" alignItems="center">
                                    <Typography className={classes.shoppingCartPrice}>
                                        : {t('items')} 
                                    </Typography>
                                </Grid>
                            </div>
                        </div>}

                    {i18next.language === "EN" ?
                        <div>
                            <div>
                            {this.props.cartInfo.totalPrice < 400 ?
                            <div>
                                <div className="col-xs-6 col-md-6 col-lg-6">
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Typography className={classes.shoppingCartPrice}>
                                            {`${t('shipping')} (${this.state.city || this.props.cartInfo.shippingCity}):`}
                                        </Typography>
                                    </Grid>
                                </div>
                                <div className="col-xs-6 col-md-6 col-lg-6">
                                    <Grid container justify="flex-end" alignItems="center">
                                        <Typography className={classes.shoppingCartPrice}>
                                           {<CurrencyFormat value={this.returnShippingCost().toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}
                                        </Typography>
                                    </Grid>
                                </div>
                            </div>
                                :
                                <div className="col-xs-6 col-md-6 col-lg-6">
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Typography className={classes.shoppingCartPrice}>
                                            {`${t('freeShip')}`}
                                        </Typography>
                                    </Grid>
                                </div>
                                }
                            </div>
                        </div>
                        :
                        <div>
                            {this.props.cartInfo.totalPrice < 400 ?
                            <div>
                                <div className="col-xs-6 col-md-6 col-lg-6">
                                    <Grid container justify="flex-start" alignItems="center">
                                        <Typography className={classes.shoppingCartPrice}>
                                            {<CurrencyFormat value={this.returnShippingCost().toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}
                                        </Typography>
                                    </Grid>
                                </div>

                                <div className="col-xs-6 col-md-6 col-lg-6">
                                    <Grid container justify="flex-end" alignItems="center">
                                        <Typography className={classes.shoppingCartPrice}>
                                            {`: (${this.state.city || this.props.cartInfo.shippingCity}) ${t('shipping')}`}
                                        </Typography>
                                    </Grid>
                                </div>
                            </div>
                                :
                                <div className="col-xs-12 col-md-12 col-lg-12">
                                    <Grid container justify="flex-end" alignItems="center">
                                        <Typography className={classes.shoppingCartPrice}>
                                            {`${t('freeShip')}`}
                                        </Typography>
                                    </Grid>
                                </div>
                                }
                        </div>}

                </div>

                <div className="row" style={{backgroundColor: fade('#ccc7c7', 1)}}>
                {i18next.language === "EN" ?
                    <div>
                        <div className="col-xs-6 col-md-6 col-lg-6">
                            <Grid container justify="flex-start" alignItems="center">
                                <Typography className={classes.shoppingCartPrice}>
                                    {t('grandTotal')}:
                                </Typography>    
                            </Grid>
                        </div>
                        <div className="col-xs-6 col-md-6 col-lg-6">
                            <Grid container justify="flex-end" alignItems="center">
                                <Typography className={classes.shoppingCartPrice}>
                                    {<CurrencyFormat value={grandTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}
                                </Typography>    
                            </Grid>
                        </div>
                    </div>
                :
                    <div>
                        <div className="col-xs-6 col-md-6 col-lg-6">
                            <Grid container justify="flex-start" alignItems="center">
                                <Typography className={classes.shoppingCartPrice}>
                                    {t('currency')} {<CurrencyFormat value={grandTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} />}
                                </Typography>
                            </Grid>
                        </div>

                        <div className="col-xs-6 col-md-6 col-lg-6">
                            <Grid container justify="flex-end" alignItems="center">
                                <Typography className={classes.shoppingCartPrice}>
                                    : {t('grandTotal')}
                                </Typography>
                            </Grid>
                        </div>
                    </div>}

                </div>             
                </div>: undefined}
                </div>
                </div>
            </div>

        <Modal open={this.state.SuccessModal} onClose={this.onCloseModal.bind(this,'SuccessModal')} center
            styles={SuccessStyle}>
            <h3 className="col-xs-6">{this.state.SuccessMsg}</h3>
            <img style ={{width: 150, height: 120}} className="col-xs-6" src={fortniteDab} alt=""></img>
        </Modal>
        <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
            styles={ErrorStyle}>
            <h3 className="col-xs-6">{this.state.ErrorMsg}</h3>
            <img style ={{width: 150, height: 120}} className="col-xs-6" src={amumu} alt=""></img> 
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
        cleanCartInfo,
        setShipping
    },
    dispatch,
  )


export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps, matchDispatchToProps),
)(Checkout);