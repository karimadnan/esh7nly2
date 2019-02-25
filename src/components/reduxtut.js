import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Userlist from '../containers/merch-shop';
import CartDetails from '../containers/cart-details';

class Redux extends Component {
  render() {
    return (
        <div>
        <h2>Shop:</h2>
        <Userlist/>
        <hr />
        <h2>Cart:</h2>
        <CartDetails/>
    </div>
    );
  }
}

export default Redux;
