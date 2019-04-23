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

const customStyles = {
  overlay: {
    background: "transparent"
  },
  modal: {
    backgroundColor: 'rgba(219, 105, 105, 0.9)',
    color: "white",
    borderRadius: '10px',
  }
}

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
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
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
});

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
          anchor="right"
          open={this.state.sideBar}
          onClose={()=>{this.setState({ sideBar: false })}}
          onOpen={()=>{this.setState({ sideBar: true })}}
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

              const itemName = item.Name
              const msg = t('removedFromCartMsg', {itemName})
              return(
                <li key={item.id}>
                    <div className="col-md-12 col-lg-12 navCart" style={{cursor: "pointer"}} onClick={() => {this.props.removeCartItem(item), this.notify(msg), this.updateInfo(item)}}>
                        <div className="col-md-4 col-lg-4">
                            <img src={item.defaultImage} className="splash-card-product-view" style={{margin: 5}} alt={item.id}/>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <h4 style={{fontWeight: "bold", color: "black"}}>{item.Name.length > 30 ? (((cartName).substring(0,40-3))  + '...' ) : cartName}</h4>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <h4 style={{color: "purple", fontWeight: "bold"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h4>
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
                <button className="btn btn-primary btn-block" style={{color : "white", margin: 10}} onClick={()=>{this.goToCheckout()}}>
                    <span className="icon glyphicon glyphicon-shopping-cart"></span>
                    <span className="text">{t('checkout')}</span>
                </button>
            </div>}
          </div>
          </Drawer>
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