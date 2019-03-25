import React, { Component } from 'react';
import Getlogin from './navbar';
import axios from 'axios';
import {connect} from 'react-redux';

class userOrders extends Component {

state = {
headers: {
  'Content-Type': 'application/json',
  'authorization': this.props.loginData.token},
Url: this.props.server.main,
ordersData: []
}

render(){
  
    var that = this
    axios.get(`${this.state.Url}getOrderForuser`, {headers: this.state.headers})
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error.response);
    })

    return (
        <Getlogin />
    )
  }

}

function mapStateToProps(state){
  return {
      loginData: state.loginSession,
      server: state.server,
      lang: state.lang.lang
  }
}

export default connect(mapStateToProps)(userOrders);