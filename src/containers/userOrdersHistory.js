import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import Loader from '../containers/loader';

class userOrders extends Component {

state = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': this.props.loginData.token},
    Url: this.props.server.main,
    ordersData: {},
    loaded: false,
    done: false
}

componentDidMount(){
  this.getUserOrderHistory();
}

getUserOrderHistory(){
    var that = this
    axios.get(`${this.state.Url}getUserHistory`, {headers: this.state.headers})
    .then(function (response) {
      that.setState({ordersData: response.data.data, loaded: true, done: true})
    })
    .catch(function (error) {
      that.setState({done: true})
    })
}

render(){
if(this.state.done){
    if(this.state.loaded){
        console.log(this.state.ordersData, "History")
        return(
            <h1> ORDERS HISTORY </h1>
        )
    }
    else{
      return(
        <h1> HISTORY ERROR </h1>
      )
    }
}
else {
  return(
        <Loader color={'black'}/>
  )
}
}
}

function mapStateToProps(state){
  return {
      loginData: state.loginSession,
      server: state.server,
  }
}

export default connect(mapStateToProps)(userOrders);