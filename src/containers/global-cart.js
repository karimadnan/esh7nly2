import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux';
import {isMobile} from 'react-device-detect';
import Drawer from '@material-ui/core/Drawer';
import CurrencyFormat from 'react-currency-format';
import {bindActionCreators} from 'redux';
import {removeCartItem, updateCartInfo} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import ReactRouter from 'flux-react-router';
import Modal from 'react-responsive-modal';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { withNamespaces } from 'react-i18next';
import compose from 'recompose/compose';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

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
  drawer:{
    zIndex: 1100
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

  state = {
    ErrorModal: false,
    ErrorMsg: '',
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
  this.updateInfo(item)
}

goToCheckout(){
  if(this.props.loginData.loggedState){
      ReactRouter.goTo("/checkout")
  }
  else{
      this.setState({ErrorModal: true, ErrorMsg: "Please login first to checkout"})
  }
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
          <Badge onClick={()=>{this.setState({ sideBar: !this.state.sideBar })}} style={{cursor: "pointer"}} className={this.props.classes.margin} badgeContent={this.props.cartInfo.totalItems} color="secondary">
              <ShoppingCart fontSize="large" />
          </Badge>
      </Tooltip>
      <Drawer
          className={classes.drawer}
          anchor="right"
          open={this.state.sideBar}
          onClose={()=>{this.setState({ sideBar: false })}}
        >
        <div style={{padding: 20, textAlign: "center", width: isMobile ? 250 : 550}}>
          {this.props.cart.length > 0 ? 
              <p style={{textAlign: "center", fontWeight: "bold", backgroundColor: "white", color: "black"}}>{t('clickToRemoveCart')}</p>
              :
              <p style={{textAlign: "center", fontWeight: "bold", backgroundColor: "white", color: "black"}}>{t('cartEmpty')}</p>
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
                    cartName = `(${item.color.toUpperCase()}) `+ cartName
                }

              return(
                <li key={item.id}>
                    <div className="col-md-12 col-lg-12 navCart" style={{cursor: "pointer"}} onClick={() => {this.remove(item)}}>
                        <div className="col-md-4 col-lg-4">
                            <img src={item.defaultImage} className="splash-card-product-view" style={{margin: 5}} alt={item.id}/>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <h4 style={{fontWeight: "bold", color: "black"}}>{cartName.length > 30 ? (((cartName).substring(0,30-10))  + '...' ) : cartName}</h4>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <h4 style={{color: "#3F51B5", fontWeight: "bold"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h4>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <h5 style={{color: "black"}}>{t('quantity')}: {item.quantity}</h5>
                        </div>
                        <div style={{borderBottom: "1px dashed grey"}}/>
                    </div>
                </li>

                )
            })}



          {this.props.cart.length > 0 && 
          <div style={{color: "black"}}>
            <div className="col-xs-6 col-md-6 col-lg-6">
              <span style={{textAlign: "left", textTransform: "uppercase", fontFamily: "arial", fontSize: !isMobile ? 18 : "3vw"}}>{t('subTotal')}: </span>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-6">
              <span style={{textAlign: "right", textTransform: "uppercase", fontFamily: "arial", fontSize: !isMobile ? 18 : "3vw"}}>{t('currency')} {<CurrencyFormat value={this.props.cartInfo.totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />} </span>
            </div>
          </div>}
          {!window.location.href.includes("checkout") && this.props.cart.length > 0 && 
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
        cartInfo: state.updateCartInfo,
        cart: state.cartItems.cart,
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

export default compose(
  withStyles(styles),
  withNamespaces(),
  connect(mapStateToProps, matchDispatchToProps),
)(GlobalCart);