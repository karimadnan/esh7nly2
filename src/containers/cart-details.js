import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Mycss.css';
import '../Respcss.css';
import Navbar from '../components/navbar';
import {removeCartItem, updateCartInfo} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import {bindActionCreators} from 'redux';
import ReactRouter from 'flux-react-router';
import amumu from '../Images/amumusad.png';
import fortniteDab from '../Images/fortnitedab.png';
import Modal from 'react-responsive-modal';
import CurrencyFormat from 'react-currency-format';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Done from '@material-ui/icons/Done';
import Off from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import Chip from '@material-ui/core/Chip';
import { Divider } from '@material-ui/core';
import NextIcon from '@material-ui/icons/Done';
import i18next from 'i18next';

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

  const styles = theme => ({
    chip: {
        margin: theme.spacing.unit,
        fontSize: 13,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20
        }
    },
    listText: {
        fontSize: 13,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20
        }
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
        marginRight: theme.spacing.unit * 6,
    }
    })

class cartDetails extends Component {

    state = {
        ErrorModal: false,
        ErrorMsg: '',
        SuccessModal: false,
        SuccessMsg: ''
    }

    onOpenModal = (type) => {
      this.setState({[type]: true });
    };
   
    onCloseModal = (type) => {
      this.setState({[type]: false });
    };

    goToCheckout(){
        if(this.props.loginData.loggedState){
            ReactRouter.goTo("/checkout")
        }
        else{
            this.setState({ErrorModal: true, ErrorMsg: "Please login first to checkout"})
        }
    }

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
        const { classes } = this.props;

        let CART = this.props.cart.map(item => {
            return (
                <div class="col-md-12 col-lg-12" key={item} style={{backgroundColor: "white", fontFamily: "arial", textAlign: "center"}}>
                    <div class="col-md-4 col-lg-4">
                        <img src={item.defaultImage} class="splash-card-product-view" style={{margin: 20}} alt={item.id}/>
                    </div>
                    <div class="col-md-4 col-lg-4" style={{color: "black"}}>
                        <h3 style={{fontWeight: "bold"}}>{item.Name}</h3>
                        <button class="btn btn-danger" style={{cursor: "pointer", minWidth: 100}} onClick={() => {this.props.removeCartItem(item), this.notify(item.Name), this.updateInfo(item)}}>
                            <span className="icon glyphicon glyphicon-remove-circle"></span>
                            <span className="text">Remove</span>
                        </button>
                        <br/>                        <br/>
                        <span style={{fontSize: 15}} class="label label-primary">{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</span>
                        <h4>Quantity: <span>x{item.quantity}</span></h4>
                         {item.size && <h4>Size: {item.size}</h4> }
                         {item.info && <h4>Type: <span class="label label-primary">{item.info}</span></h4>}
                         {item.color && <h4>Color: {item.color}</h4>}
                         {item.option && <h4>Option: {item.option}</h4>}
                         <Divider className={classes.divider}/>
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


    render() {
        const { t } = this.props;
        const { classes } = this.props;
        const totalProps = <CurrencyFormat value={this.props.cartInfo.totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />
        const total = totalProps.props.value

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
                    <Navbar />
                </div>
            )          
        }
        return (
            <div>
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
                    <Grid container justify="center" alignItems="center">
                        <Badge className={classes.extendedIcon} badgeContent={this.props.cartInfo.totalItems} color="secondary">     
                            <ShoppingCart fontSize="large" />
                        </Badge>
                            {t('yourCart')}
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <Chip label={t('totalCart', {total})} className={classes.chip} />
                    </Grid>
                {this.props.cartInfo.totalPrice > 400 ? 
                    <Grid container justify="center" alignItems="center">
                        <Chip
                            avatar={<Done />}
                            label={`${t('freeShip')}`}
                            className={classes.chip}
                        />
                    </Grid>
                     :
                     <Grid container justify="center" alignItems="center">
                        <Chip
                            avatar={<Off />}
                            label={`${t('noFreeShip')}`}
                            className={classes.chip}
                        />
                     </Grid>
                    }
                <Divider className={classes.divider}/>

                <div class="col-xs-12 col-md-12 col-lg-12">
                    {this.createListItems()}
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Chip label={`${t('totalCart', {total})}`} className={classes.chip} />
                    </Grid>
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Fab color="primary" variant="extended" aria-label="Save" onClick={()=>{this.goToCheckout()}} className={classes.fab}>
                            <NextIcon className={classes.extendedIcon2} />
                            <h5>{t('checkout')}</h5>
                        </Fab>
                    </Grid>
                </div>
                <Navbar />
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        cart: state.cartItems.cart,
        cartInfo: state.updateCartInfo,
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
)(cartDetails);