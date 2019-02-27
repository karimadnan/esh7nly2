import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Mycss.css';
import '../games.css';
import '../Respcss.css';
import Getlogin from '../components/navbar';
import {removeCartItem, updateCartInfo} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import {bindActionCreators} from 'redux';

class cartDetails extends Component {
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
        return (

                <div class="table-responsive" style={{color: "black", fontSize: 20}}>
                    <table style={{backgroundColor: "white"}} class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Size</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {this.props.cart.map(item => {

                        return (
                            <tr key={item.id}>
                            <th >{item.Name}</th>
                            <th ><span class="label label-primary">{item.price} EGP</span></th>
                            <th ><img src={item.img} style={{width: 100, height: 100}} alt={item.id}/> </th>
                            <th ><span class="label label-primary">{item.size}</span></th>
                            <th ><span class="label label-primary">{item.quantity}</span></th>
                            <th ><span style={{cursor: "pointer"}} onClick={() => {this.props.removeCartItem(item), this.notify(item.Name), this.updateInfo(item)}} class="glyphicon glyphicon-remove"></span></th>
                            </tr>
                        )
                    })}
                    </tbody>
                    </table>
                </div>
            )
    }

    render() {
        if(this.props.cart.length < 1){
            return (
                <div >
                    <h1>&nbsp;Your cart is empty<span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;</h1>
                <div class="bordersep"/>
                <Getlogin />
                </div>
            )          
        }
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
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <h1 style={{fontSize: 25}}>Total items: <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;<span class="label label-warning">{this.props.cartInfo.totalItems}</span></h1>
                </div>
                <div class="col-xs-12 col-md-6 col-lg-6">
                    <h1 style={{fontSize: 25}}>Price: <span className="glyphicon glyphicon-euro"></span>&nbsp;&nbsp;<span class="label label-primary">{this.props.cartInfo.totalPrice} EGP</span></h1>
                </div>
                <br/>
                <div class="bordersep col-xs-12 col-md-12 col-lg-12">  
                    <br/>
                </div>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    {this.createListItems()}
                </div>
                <Getlogin />
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        cart: state.cartItems.cart,
        cartInfo: state.updateCartInfo
    }
}

const matchDispatchToProps = dispatch => bindActionCreators(
    {
      removeCartItem,
      updateCartInfo
    },
    dispatch,
  )

export default connect(mapStateToProps, matchDispatchToProps)(cartDetails);