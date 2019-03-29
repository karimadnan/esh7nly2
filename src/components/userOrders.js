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
loaded: false
}

render(){

  if (!this.state.loaded){
    var that = this
    axios.get(`${this.state.Url}getOrderForuser`, {headers: this.state.headers})
    .then(function (response) {
      that.setState({ordersData: response.data.data, loaded: true})
    })
    .catch(function (error) {
      that.setState({loaded: true})
    })
  }
  
  if(this.state.loaded){
    if (this.state.ordersData.length > 0){
        let counter = 0
        var pending = 0
        var onGoing = 0
    
    
        this.state.ordersData.map(row => {
            if (row.status === "pending"){
                pending ++;
            }
            else {
                onGoing ++;
            }
          })

        return (
              <div>
                    <div class="col-xs-4 col-md-2 col-lg-2">
                        <span class="label label-info" style={{fontSize: 15, lineHeight: 2.5}}>Total: {this.state.ordersData.length}</span>
                    </div>
                    <div class="col-xs-4 col-md-2 col-lg-2">
                        <span class="label label-warning" style={{fontSize: 15, lineHeight: 2.5}}>Pending: {pending}</span>
                    </div>
                    <div class="col-xs-4 col-md-2 col-lg-2">
                        <span class="label label-primary" style={{fontSize: 15, lineHeight: 2.5}}>onGoing: {onGoing}</span>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-6">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search"/>
                          <div class="input-group-btn">
                            <button class="btn btn-default" type="submit">
                              <i class="glyphicon glyphicon-search"></i>
                            </button>
                          </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div class="table-responsive">
                            <table style={{backgroundColor: "white"}} class="table table-striped">
                              <thead>
                                <tr style={{color: "black"}}>
                                  <th scope="col">#</th>
                                  <th class="th-sm" scope="col">Created At</th>
                                  <th scope="col">Category</th>
                                  <th class="th-sm" scope="col">Type</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Comment</th>
                                </tr>
                              </thead>
                            <tbody>
                          {this.state.ordersData.map(row => {
                              counter ++;
                              return (
                                <tr key={counter}>
                                  <th style={{color: "black"}}>{counter}</th>
                                  <td ><span class="label label-default">{moment(row.createdAt).format('LLL')}</span></td>
                                  <td ><span class="label label-info">{row.orderType}</span></td>
                                  <td  style={{fontWeight: "bold", textTransform: 'uppercase', color: "black"}}>{row.game}</td>
                                  <td ><span class={row.status === "pending" ? "label label-warning" : "label label-primary"}>{row.status}</span></td>
                                  <td ><span class="menuLabel menuLabel-purple" style={{color: "white"}}>{row.extra.SelectedOff}</span></td>
                                  <td ><span class={row.status === "pending" ? "menuLabel menuLabel-lightGreen" : "menuLabel menuLabel-babyBlue"} style={{color: "black"}}>{row.comment}</span></td>
                                </tr>
                              )
                          })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )
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