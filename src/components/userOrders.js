import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class UserOrders extends Component {

state = {
headers: {
  'Content-Type': 'application/json',
  'authorization': this.props.loginData.token},
Url: this.props.server.main,
ordersData: {},
MyRow:'',
showRow:false,
loaded: false
}

render(){

  if (!this.state.loaded){
    var that = this
    axios.get(`${this.state.Url}getOrderForuser`, {headers: this.state.headers})
    .then(function (response) {
      console.log(response)
      that.setState({ordersData: response.data.data, loaded: true})
    })
    .catch(function (error) {
      that.setState({loaded: true})
    })
  }
  
  if(this.state.loaded ){
    if (this.state.ordersData.length > 0 && !this.state.showrow){
        let counter = 0
        var pending = 0
        var onGoing = 0
    
    
      let ORDERS =  this.state.ordersData.map(row => {
            if (row.status === "pending"){
                pending ++;
            }
            else {
                onGoing ++;
            }
            return (
              <div class="col-xs-12 col-md-12 col-lg-12" key={row._id} style={{lineHeight: 3}}>
                  <div class="col-xs-3 col-md-3 col-lg-3">
                      <span class="label label-primary" style={{fontSize: 17}}>{moment(row.createdAt).format('LLL')}</span>
                  </div>
                  <div class="col-xs-2 col-md-2 col-lg-2">
                      <span style={{fontSize: 17}}>{row.comment}</span>
                  </div>
                  <div class="col-xs-2 col-md-2 col-lg-2">
                      <span class="label label-info" style={{fontSize: 17}}>{row.status}</span>
                  </div>
                  <div class="col-xs-4 col-md-4 col-lg-4">
                      <span style={{fontSize: 20, color: "purple", fontWeight: "bold", lineHeight: 0.5, cursor: "pointer"}}  onClick={ () => {this.setState({MyRow: row , showRow: true})}}> View Details <span className="glyphicon glyphicon-eye-open"/></span>
                  </div>
              </div>
          )
          })

      return (
          <div>
                <div class="col-xs-12 col-md-12 col-lg-12 OrdersTitleBG" style={{marginBottom: 15}}>
                  <div class="col-xs-3 col-md-3 col-lg-3">
                      <span style={{fontSize: 20, color: "white", fontWeight: "bold"}}>Date</span>
                  </div>
                  <div class="col-xs-2 col-md-2 col-lg-2">
                      <span style={{fontSize: 20, color: "white", fontWeight: "bold"}}>Comment</span>
                  </div>
                  <div class="col-xs-2 col-md-2 col-lg-2">
                      <span style={{fontSize: 20, color: "white", fontWeight: "bold"}}>Status</span>
                  </div>
                 </div>
                      {ORDERS}
          </div>
      )

  }
  else if(this.state.showRow){
    console.log(this.state.MyRow)
    return(<div><img src={this.state.MyRow.img}/></div>)
  }
  else{
    return(
        <div style={{color: "black"}}>
              <h1>You have no orders</h1>
              <p>Place an order and it will appear here</p>
        </div>
    )
  }
}
else{
  return(

        <div>
            <PacmanLoader
                css={override}
                sizeUnit={"px"}
                size={100}
                color={'#FFFF00'}
                loading={true}/>
            <h2 style={{color: "black"}}>Loading...</h2>
    </div>
  )
}
}
}

function mapStateToProps(state){
  return {
      loginData: state.loginSession,
      server: state.server,
      lang: state.lang.lang
  }
}

export default connect(mapStateToProps)(UserOrders);