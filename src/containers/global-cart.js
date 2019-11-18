import React, { Component } from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux';
import {isMobile} from 'react-device-detect';
import Drawer from '@material-ui/core/Drawer';
import CurrencyFormat from 'react-currency-format';
import {bindActionCreators} from 'redux';
import {removeCartItem, updateCart} from '../actions/index';
import ReactRouter from 'flux-react-router';
import Modal from 'react-responsive-modal';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { withNamespaces } from 'react-i18next';
import compose from 'recompose/compose';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { Scrollbars } from 'react-custom-scrollbars';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CircularProgress from '@material-ui/core/CircularProgress';
import i18next from 'i18next';
import FacePalm from '../Images/facepalm.png';

const customStyles = {
  overlay: {
    background: "transparent",
    zIndex: 1100
  },
  modal: {
    backgroundColor: 'rgba(219, 105, 105, 0.7)',
    minWidth: 300,
    maxWidth: 500,
    color: "white",
    borderRadius: '10px',
  }
}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  drawer:{
    zIndex: 1100
  },
  drawerDark:{
    backgroundColor: '#212121',
    width: 250,
    [theme.breakpoints.up('lg')]: {
      width: 550,
    }
  },
  subtotalDark:{
    color: '#fff',
    fontWeight: 'bold'
  },
  subtotalNormal:{
    color: '#212121',
    fontWeight: 'bold'
  },
  drawerWhite:{
    backgroundColor: '#f7f7fa',
    width: 250,
    [theme.breakpoints.up('lg')]: {
      width: 550,
    }
  },
  cartDrawerFont:{
    color: '#212121',
    fontSize: 13,
    fontWeight: 'bold',
    [theme.breakpoints.up('lg')]: {
      fontSize: 23,
    }
  },
  drawerDeleteDark: {
    margin: theme.spacing.unit * 2,
    color: '#fff',
    '&:hover': {
      color: fade('#fff', 0.525),
    }
  },
  drawerDeleteNormal: {
    margin: theme.spacing.unit * 2,
    color: '#212121',
    '&:hover': {
      color: fade('#fff', 0.525),
    }
  },
  drawerChip: {
    margin: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  },
  fab: {
    margin: theme.spacing.unit,
    fontSize: 10,
    minWidth: 120,
    [theme.breakpoints.up('lg')]: {
      fontSize: 15,
    }
},
extendedIcon2: {
  marginRight: theme.spacing.unit * 10,
},
});

const cartColor = createMuiTheme({
  palette: {
      primary: { main: '#b5b5b5', contrastText: "#fff" },
      secondary: { main: '#212121', contrastText: "#fff" }
  },
});

class GlobalCart extends Component {
  constructor(props){
    super(props); 
    this.state = {
      ErrorModal: false,
      ErrorMsg: '',
      sideBar: false
    }
  }

onOpenModal = (type) => {
  this.setState({[type]: true });
};

onCloseModal = (type) => {
  this.setState({[type]: false });
};

remove(item){
  const { t } = this.props;
  const itemName = item.Name
  const msg = t('removedFromCartMsg', {itemName})
  this.props.removeCartItem(item)
}

goToCheckout(){
  const { t } = this.props;
  if(this.props.loginData.loggedState){
      ReactRouter.goTo("/checkout")
  }
  else{
      this.setState({ErrorModal: true, ErrorMsg: t('notLogged')})
  }
}

goToProduct(id){
  ReactRouter.goTo("/productpage/"+id.split('-')[0])
}

calcPayment(){
  let totalPrice = 0
  this.props.cart.cart.map((item) => {
      totalPrice = totalPrice + item.price * item.quantity
  })
  return totalPrice
}

createCart(){
const { t, classes } = this.props;
let cart = this.props.cart.cart.map((item, index) => {

    var cartName = item.Name
    if(item.option){
        cartName = `(${item.option}) ` + cartName
    }
    if(item.size){
        cartName = `(${item.size.charAt(0).toUpperCase()}) `+ cartName
    }
    if(item.color){
        cartName = `(${item.color.toUpperCase()}) `+ cartName
    }

  return(
    <div key={index} className={this.props.settings.mode === "dark" ? "cart-blackBG" : "cartBG"}>
        <div className="col-md-12 col-lg-12">
            <div className="col-xs-12 col-md-4 col-lg-4">
                <img src={item.defaultImage} className="splash-card-product-view" onClick={()=>{this.goToProduct(item.id)}} style={{cursor: 'pointer', margin: 5}} alt={item.id}/>
            </div>
            <div className="col-xs-12 col-md-4 col-lg-4" onClick={()=>{this.goToProduct(item.id)}} style={{cursor: 'pointer'}}>
                <h4 style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>{cartName.length > 70 ? (((cartName).substring(0,70-3))  + '...' ) : cartName}</h4>
            </div>
            <div className="col-xs-12 col-md-2 col-lg-2">
                <h4 style={{color: "#4a60d9"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h4>
                <h5>{t('quantity')}: {item.quantity}</h5>
            </div>
            <div className="col-xs-12 col-md-2 col-lg-2" className={this.props.settings.mode === 'dark' ? classes.drawerDeleteDark : classes.drawerDeleteNormal} onClick={()=>{this.remove(item)}} style={{cursor: 'pointer'}}>
                <DeleteIcon />
                <Typography>Remove</Typography>
            </div>
        </div>
    </div>

    )
})

return (
    <div>
      {cart}
    </div>
)
}

subtotal(){
  const { t, classes } = this.props;
  if(this.props.cart.cart.length > 0){
    if(i18next.language === "EN"){
      return(
        <div className={this.props.settings.mode === 'dark' ? classes.subtotalDark : classes.subtotalNormal}>
          <div className="col-xs-6 col-md-6 col-lg-6">
            <p style={{
                textTransform: "uppercase", 
                fontFamily: "arial", 
                fontSize: !isMobile ? 18 : "3vw", 
                fontWeight: 'bold'}}>{t('subTotal')}: 
            </p>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6">
            <p style={{ 
                textTransform: "uppercase", 
                fontFamily: "arial", 
                fontSize: !isMobile ? 18 : "3vw", 
                fontWeight: 'bold'}}>{t('currency')} {<CurrencyFormat value={this.calcPayment().toFixed(2)} displayType={'text'} thousandSeparator={true} />}
            </p>
          </div>
        </div>
      )
    }
    else{
      return(
        <div className={this.props.settings.mode === 'dark' ? classes.subtotalDark : classes.subtotalNormal}>
          <div className="col-xs-6 col-md-6 col-lg-6">
            <p style={{
                textTransform: "uppercase", 
                fontFamily: "arial", 
                fontSize: !isMobile ? 18 : "3vw", 
                fontWeight: 'bold'}}>{<CurrencyFormat value={this.calcPayment().toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')} 
            </p>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6">
            <p style={{
                textTransform: "uppercase", 
                fontFamily: "arial", 
                fontSize: !isMobile ? 18 : "3vw", 
                fontWeight: 'bold'}}>: {t('subTotal')} 
            </p>
          </div>
        </div>
      )
    }
  }
}

render(){
  const { t, classes } = this.props;
  return (
    <div> 
      <Modal          
      open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
      styles={customStyles}>
          {i18next.language === "EN" ? 
              <div>
                <h2 className="col-xs-6">{this.state.ErrorMsg}</h2>
                <img className="col-xs-6" src={FacePalm} alt=""></img>
              </div>
              :
              <div>
                <img className="col-xs-6" src={FacePalm} alt=""></img>
                <h2 className="col-xs-6" style={{textAlign: "right"}}>{this.state.ErrorMsg}</h2>
              </div>
          }

      </Modal>
      <Tooltip title={<h6>{t('yourCart')}</h6>} aria-label={<h6>{t('yourCart')}</h6>} placement="bottom">
          <Badge onClick={()=>{this.setState({ sideBar: !this.state.sideBar })}} style={{cursor: "pointer"}} className={this.props.classes.margin} badgeContent={this.props.cart.cart ? this.props.cart.cart.length : 0} color="secondary">
              <ShoppingCart fontSize="large" />
          </Badge>
      </Tooltip>
      <Drawer
          className={classes.drawer}
          classes={{paper: this.props.settings.mode === 'dark' ? classes.drawerDark : classes.drawerWhite}}
          anchor="right"
          open={this.state.sideBar}
          onClose={()=>{this.setState({ sideBar: false })}}
        >
        <div style={{textAlign: "center"}}>
            <Badge badgeContent={this.props.cart.cart ? this.props.cart.cart.length : 0} color="secondary">
              <MuiThemeProvider theme={cartColor}>
                  <ShoppingCart fontSize="large" color={this.props.settings.mode === 'dark' ? "primary" : "secondary"}/>
              </MuiThemeProvider>
            </Badge>
            <Chip
                color="default"
                label={this.props.cart.cart.length > 0 ? t('yourCart') : t('cartEmpty')}
                className={classes.drawerChip}
                classes={{label: classes.cartDrawerFont}}
            />
    
          <Scrollbars autoHeight 
                      autoHeightMin={470} 
                      autoHeightMax={470}
                      renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}>
                      {!this.props.cart.updatingCart ? 
                        <div>
                          {this.createCart()} 
                        </div>
                        : 
                      <CircularProgress size={100} color={'secondary'} className={classes.progress} />}
          </Scrollbars>

          {this.subtotal()}

          {!window.location.href.includes("checkout") && this.props.cart.cart.length > 0 && 
          <div className="col-xs-12 col-md-12 col-lg-12">
                <Grid container justify="center" alignItems="center">
                    <Fab color="secondary" variant="extended" aria-label="Next" onClick={()=>{this.goToCheckout()}} className={classes.fab}>
                        <ShoppingCart className={classes.extendedIcon2} />
                        {t('checkout')}
                    </Fab>
                </Grid>
            </div>}
          </div>
          </Drawer>
        </div>
  );
}
}

function mapStateToProps(state){
    return {
        cart: state.cartItems,
        loginData: state.loginSession,
        settings: state.settings
    }
  }

  
const matchDispatchToProps = dispatch => bindActionCreators(
  {
    removeCartItem,
    updateCart
  },
  dispatch,
)

export default compose(
  withStyles(styles),
  withNamespaces(),
  connect(mapStateToProps, matchDispatchToProps),
)(GlobalCart);