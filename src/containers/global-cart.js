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

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  },
});

class GlobalCart extends Component {

  state = {
    sideBar: false
  }

updateInfo (data){
  let object = {
      price: data.price,
      items: 1
      }
  this.props.updateCartInfo(object, 'remove')
}

notify = (id) => toast.error(`${id} removed from cart!`, {
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
  return (
    <div>

      <Badge onClick={()=>{this.setState({ sideBar: !this.state.sideBar })}} style={{cursor: "pointer"}} className={this.props.classes.margin} badgeContent={this.props.cartInfo.totalItems} color="primary">
        <span className="glyphicon glyphicon-shopping-cart" style={{fontSize: 22, color: "white"}} ></span>
      </Badge>

      <Drawer
          anchor="right"
          open={this.state.sideBar}
          onClose={()=>{this.setState({ sideBar: false })}}
          onOpen={()=>{this.setState({ sideBar: true })}}
        >
        <div style={{padding: 20, textAlign: "center", width: isMobile ? 250 : 550}}>
          {this.props.cart.length > 0 ? 
              <p style={{textAlign: "center", fontWeight: "bold", backgroundColor: "white", color: "black"}}>Click on an item to remove x1</p>
              :
              <p style={{textAlign: "center", fontWeight: "bold", backgroundColor: "white", color: "black"}}>Your cart is empty.</p>
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
                    <div className="col-md-12 col-lg-12 navCart" style={{cursor: "pointer"}} onClick={() => {this.props.removeCartItem(item), this.notify(item.Name), this.updateInfo(item)}}>
                        <div className="col-md-4 col-lg-4">
                            <img src={item.defaultImage} className="splash-card-product-view" style={{margin: 5}} alt={item.id}/>
                        </div>
                        <div className="col-md-4 col-lg-4">
                            <h4 style={{fontWeight: "bold", color: "black"}}>{item.Name.length > 30 ? (((cartName).substring(0,40-3))  + '...' ) : cartName}</h4>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <h4 style={{color: "purple", fontWeight: "bold"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</h4>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <h5 style={{color: "black"}}>Qty: {item.quantity}</h5>
                        </div>
                        <div style={{borderBottom: "1px dashed grey"}}/>
                    </div>
                </li>

                )
            })}



          {this.props.cart.length > 0 && 
          <div style={{color: "black"}}>
            <div className="col-xs-6 col-md-6 col-lg-6">
              <span style={{textAlign: "left", textTransform: "uppercase", fontFamily: "arial", fontSize: !isMobile ? 18 : "3vw"}}>Subtotal: </span>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-6">
              <span style={{textAlign: "right", textTransform: "uppercase", fontFamily: "arial", fontSize: !isMobile ? 18 : "3vw"}}>EGP {<CurrencyFormat value={this.props.cartInfo.totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />} </span>
            </div>
          </div>}
          {!window.location.href.includes("checkout") && this.props.cart.length > 0 && 
          <div className="col-xs-12 col-md-12 col-lg-12">
                <button className="btn btn-primary btn-block" style={{color : "white", margin: 10}} onClick={()=>{this.goToCheckout()}}>
                    <span className="icon glyphicon glyphicon-shopping-cart"></span>
                    <span className="text">Checkout</span>
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


export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(GlobalCart));