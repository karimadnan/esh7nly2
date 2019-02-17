import React, { Component } from 'react';
import Getlogin from './navbar';
import axios from 'axios';

class userOrders extends Component {

state = {
headers: {
  'Content-Type': 'application/json',
  'authorization': localStorage.getItem("Token")},
operation: "",
Url: localStorage.getItem('Server'),
ordersData: []
}

getAllOrders(){

    var that = this
    
    axios.get(`${this.state.Url}getAllOrders`, {headers: this.state.headers})
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.response);
      })
}

renderPage(){

}
render(){
    return (
      <div className="admin-bg">
        <Getlogin />
        {this.renderPage()}
      </div>
    )
  }

}
export default userOrders;