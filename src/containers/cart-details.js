import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Mycss.css';
import '../games.css';
import '../Respcss.css';
import Getlogin from '../components/navbar';
import {removeCartItem} from '../actions/index';
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
        
    createListItems(){
        return (

                <div class="table-responsive" style={{color: "black", fontSize: 20}}>
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
                    <table style={{backgroundColor: "white"}} class="table table-striped table-dark">
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
                            <th ><span style={{cursor: "pointer"}} onClick={() => {this.props.removeCartItem(item), this.notify(item.Name)}} class="glyphicon glyphicon-remove"></span></th>
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
                <div class ="PrivacyBG">
                <div class="container">
                    <h1>Your cart is empty<span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;</h1>
                </div>
                <div class="bordersep"/>
                <Getlogin />
                </div>
            )          
        }
        return (

            <div class="container">
                <h1>Total items <span className="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;<span class="label label-warning">{this.props.cart.length}</span></h1>
                    <br/>
                    <div class="bordersep"/>
                    <br/>
                    {this.createListItems()}
                    <Getlogin />
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        cart: state.cartItems.cart
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({removeCartItem: removeCartItem}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(cartDetails);