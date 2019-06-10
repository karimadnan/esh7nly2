import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux';
import {isMobile} from 'react-device-detect';
import Drawer from '@material-ui/core/Drawer';
import CurrencyFormat from 'react-currency-format';
import {bindActionCreators} from 'redux';
import {removeCartItem, updateCart} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
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

const customStyles = {
  overlay: {
    background: "transparent",
    zIndex: 1100
  },
  modal: {
    backgroundColor: 'rgba(219, 105, 105, 1)',
    minWidth: 300,
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
  drawerBG:{
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
  drawerDeleteIcon: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: fade('#212121', 0.525),
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

notify = (msg) => toast.error(msg, {
  zIndex: 1100,
  position: toast.POSITION.TOP_CENTER,
  autoClose: 2000,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  closeOnClick: true
});

remove(item){
  const { t } = this.props;
  const itemName = item.Name
  const msg = t('removedFromCartMsg', {itemName})
  this.props.removeCartItem(item)
  this.notify(msg)
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
if(!window.location.href.includes("productpage")){
  ReactRouter.goTo(`productpage/${id.split('-')[0]}`)
}
else{
  ReactRouter.goTo(`${id.split('-')[0]}`)
}
}

createCart(){
const { t } = this.props;
const { classes } = this.props;
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
    <div key={index} className="cartBG">
        <div className="col-md-12 col-lg-12">
            <div className="col-xs-12 col-md-4 col-lg-4">
                <img src={item.defaultImage} className="splash-card-product-view" onClick={()=>{this.goToProduct(item.id)}} style={{cursor: 'pointer', margin: 5}} alt={item.id}/>
            </div>
            <div className="col-xs-12 col-md-4 col-lg-4" onClick={()=>{this.goToProduct(item.id)}} style={{cursor: 'pointer'}}>
                <h4 style={{fontWeight: "bold", color: "#212121", whiteSpace: 'normal', wordWrap: 'break-word'}}>{cartName.length > 70 ? (((cartName).substring(0,70-3))  + '...' ) : cartName}</h4>
            </div>
            <div className="col-xs-12 col-md-2 col-lg-2">
                <h4 style={{color: "#3F51B5", fontWeight: "bold"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h4>
                <h5 style={{color: "#212121"}}>{t('quantity')}: {item.quantity}</h5>
            </div>
            <div className="col-xs-12 col-md-2 col-lg-2" className={classes.drawerDeleteIcon} onClick={()=>{this.remove(item)}} style={{cursor: 'pointer'}}>
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

render(){
  const { t } = this.props;
  const { classes } = this.props;
  return (
    <div> 
      <Modal          
      open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
      styles={customStyles}>
          <h2>{this.state.ErrorMsg}</h2>
      </Modal>
      <Tooltip title={<h6>{t('yourCart')}</h6>} aria-label={<h6>{t('yourCart')}</h6>} placement="bottom">
          <Badge onClick={()=>{this.setState({ sideBar: !this.state.sideBar })}} style={{cursor: "pointer"}} className={this.props.classes.margin} badgeContent={this.props.cart.cart ? this.props.cart.cart.length : 0} color="secondary">
              <ShoppingCart fontSize="large" />
          </Badge>
      </Tooltip>
      <Drawer
          className={classes.drawer}
          classes={{paper: classes.drawerBG}}
          anchor="right"
          open={this.state.sideBar}
          onClose={()=>{this.setState({ sideBar: false })}}
        >
        <div style={{textAlign: "center"}}>
          {this.props.cart.cart.length > 0 ? 
              <div>
                <Badge badgeContent={this.props.cart.cart ? this.props.cart.cart.length : 0} color="secondary">
                    <ShoppingCart fontSize="large" />
                </Badge>
                <Chip
                    color="default"
                    label={t('yourCart')}
                    className={classes.drawerChip}
                    classes={{label: classes.cartDrawerFont}}
                />
              </div>
              :
            <div>
              <Badge badgeContent={this.props.cart.cart ? this.props.cart.cart.length : 0} color="secondary">
                  <ShoppingCart fontSize="large" />
              </Badge>
              <Chip
                    color="default"
                    label={t('cartEmpty')}
                    className={classes.drawerChip}
                    classes={{label: classes.cartDrawerFont}}
                />
            </div>}

          {!this.props.cart.updatingCart ? 
          <Scrollbars autoHeight 
                      autoHeightMin={500} 
                      autoHeightMax={500}
                      renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}>
                  {this.createCart()}
          </Scrollbars>:           
          <Scrollbars autoHeight 
                      autoHeightMin={500} 
                      autoHeightMax={500}
                      renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}>
                  <CircularProgress size={100} color={'secondary'} className={classes.progress} />
          </Scrollbars>}

          {this.props.cart.cart.length > 0 && 
          <div style={{color: "black"}}>
            <div className="col-xs-6 col-md-6 col-lg-6">
              <span style={{textAlign: "left", 
                            textTransform: "uppercase", 
                            fontFamily: "arial", 
                            fontSize: !isMobile ? 18 : "3vw", 
                            fontWeight: 'bold'}}>{t('subTotal')}: </span>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-6">
              <span style={{textAlign: "right", 
                            textTransform: "uppercase", 
                            fontFamily: "arial", 
                            fontSize: !isMobile ? 18 : "3vw", 
                            fontWeight: 'bold'}}>{t('currency')} {<CurrencyFormat value={this.props.cart.totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />} </span>
            </div>
          </div>}
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
          <ToastContainer/>
        </div>
  );
}
}

function mapStateToProps(state){
    return {
        cart: state.cartItems,
        loginData: state.loginSession
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