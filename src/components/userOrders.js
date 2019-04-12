import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import {
  BrowserView,
  MobileView,
} from "react-device-detect";

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
    if (this.state.ordersData.length > 0 && !this.state.showRow){

        var counter = 0
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

      let ORDERS =  this.state.ordersData.map(row => {
            counter ++;
            return (
            <div>
              <BrowserView>
              <div class="row" key={row._id} style={{lineHeight: 3, color: "white", fontFamily: "arial", backgroundColor: counter % 2 === 0 ? "#7f7192" : "#595163"}}>
                  <div class="col-xs-4 col-md-4 col-lg-4">
                      {row.cart.map(imgs => {

                          return(
                            <div class="col-xs-4 col-md-4 col-lg-4">
                                <img src={imgs.defaultImage} class="splash-card-product-view" style={{margin: 10}}/>
                            </div>
                          )
                        
                      })}
                            {row.cart.length > 3 &&<h2>...</h2>}
                  </div>
                  <div class="col-xs-3 col-md-3 col-lg-3">
                      <span  style={{fontSize: 17}}>{moment(row.createdAt).format('LLL')}</span>
                  </div>
                  <div class="col-xs-3 col-md-3 col-lg-3" style={{wordWrap: "break-word", lineHeight: 1.9}}>
                      <span style={{fontSize: 17}}>{row.comment}</span>
                  </div>
                  <div class="col-xs-1 col-md-1 col-lg-1">
                      <span style={{fontSize: 17}}>{row.status}</span>
                  </div>
                  <div class="col-xs-1 col-md-1 col-lg-1">
                      <span style={{fontSize: 18, cursor: "pointer", color: "#ffbb00"}}  onClick={ () => {this.setState({MyRow: row, showRow: true})}}> View</span>
                  </div>
              </div>
              </BrowserView>
              <MobileView>
                <div class="row" key={row._id} style={{lineHeight: 3, backgroundColor: "white", color: "white", fontFamily: "arial", backgroundColor: counter % 2 === 0 ? "#7f7192" : "#595163"}}>
                    <div class="col-xs-4 col-md-4 col-lg-4">
                        {row.cart.map(imgs => {
                            return(
                              <img src={imgs.defaultImage} class="splash-card-product-view" style={{margin: 5}}/>
                            )
                        })}
                    </div>
                    <div class="col-xs-4 col-md-3 col-lg-3">
                        <span  style={{fontSize: "3vw"}}>{moment(row.createdAt).format('LLL')}</span>
                    </div>
                    <div class="col-xs-4 col-md-3 col-lg-3" style={{wordWrap: "break-word", lineHeight: 1.9}}>
                        <span style={{fontSize: "3vw"}}>{row.comment}</span>
                    </div>
                    <div class="col-xs-2 col-md-1 col-lg-1">
                        <span style={{fontSize: "3vw"}}>{row.status}</span>
                    </div>
                    <div class="col-xs-2 col-md-1 col-lg-1">
                        <span style={{fontSize: "3vw", cursor: "pointer", color: "#ffbb00"}}  onClick={ () => {this.setState({MyRow: row, showRow: true})}}> View</span>
                    </div>
                </div>
              </MobileView>
            </div>
          )

          })

      return (
          <div>
              <BrowserView>
                    <div class="row OrdersTitleBG" style={{marginBottom: 15}}>
                        <div class="col-xs-4 col-md-4 col-lg-4">
                              <span style={{fontSize: 20, color: "white", fontWeight: "bold"}}>Image</span>
                          </div>
                          <div class="col-xs-3 col-md-3 col-lg-3">
                              <span style={{fontSize: 20, color: "white", fontWeight: "bold"}}>Date</span>
                          </div>
                          <div class="col-xs-3 col-md-3 col-lg-3">
                              <span style={{fontSize: 20, color: "white", fontWeight: "bold"}}>Comment</span>
                          </div>
                          <div class="col-xs-1 col-md-1 col-lg-1">
                              <span style={{fontSize: 20, color: "white", fontWeight: "bold"}}>Status</span>
                          </div>
                    </div>
                 </BrowserView>
                 <MobileView>
                    <div class="row OrdersTitleBG" style={{marginBottom: 15}}>
                        <div class="col-xs-4 col-md-4 col-lg-4">
                              <span style={{fontSize: "3vw", color: "white", fontWeight: "bold"}}>Image</span>
                          </div>
                          <div class="col-xs-4 col-md-3 col-lg-3">
                              <span style={{fontSize: "3vw", color: "white", fontWeight: "bold"}}>Date</span>
                          </div>
                          <div class="col-xs-2 col-md-3 col-lg-3">
                              <span style={{fontSize: "3vw", color: "white", fontWeight: "bold"}}>Comment</span>
                          </div>
                          <div class="col-xs-2 col-md-1 col-lg-1">
                              <span style={{fontSize: "3vw", color: "white", fontWeight: "bold"}}>Status</span>
                          </div>
                    </div>
                 </MobileView>
                      {ORDERS}
          </div>
      )

  }
  else if(this.state.showRow){
    var totalPrice = 0
    var rowbg = 0
    this.state.MyRow.cart.map(row => {
            totalPrice = totalPrice + row.price
    })

    return(
    <div>
        <div class="col-xs-6 col-md-6 col-lg-6">
            <span style={{color: "orange", fontSize: 17, cursor: "pointer"}} onClick={()=>{this.setState({showRow: false})}} class="glyphicon glyphicon-arrow-left"> <span style={{fontFamily: "arial"}}>Back</span></span>
        </div>
        <div class="col-xs-6 col-md-6 col-lg-6">
            <h1 style={{color: "black", textAlign: "center"}}>•Total Price•  <br/> <span style={{color: "purple", fontSize: 25}}>{totalPrice} EGP {totalPrice < 400 ? `+ Shipping: 30 EGP = ${totalPrice+30}  EGP` : ""}</span>
            </h1>
        </div>
        <div class="col-xs-6 col-md-6 col-lg-6">
            <h1 style={{color: "black", textAlign: "center"}}>•Order Status• <br/><span style={{color: "purple", fontSize: 25}}>{this.state.MyRow.status}</span></h1>
        </div>
        <div class="col-xs-6 col-md-6 col-lg-6">
            <h1 style={{color: "black", textAlign: "center"}}>•Agent Comment• <br/><span style={{color: "purple", fontSize: 25, wordWrap: "break-word"}}>{this.state.MyRow.comment}</span></h1>
        </div>
        {this.state.MyRow.cart.map(row => {
            rowbg++;
            return(
              <div class="col-xs-12 col-md-12 col-lg-12" style={{color: "white", fontFamily: "arial", backgroundColor: rowbg % 2 === 0 ? "#7f7192" : "#595163"}}>
                <BrowserView>
                  <div class="col-xs-6 col-md-3 col-lg-3">
                      <img src={row.defaultImage} class="splash-card-product-view" style={{margin: 10}}/>
                  </div>
                  <div class="col-xs-6 col-md-3 col-lg-3" style={{color: "white"}}>
                  <h3 style={{fontWeight: "bold"}}>{row.Name}</h3>
                        <span style={{fontSize: 15}}>{row.price} EGP</span>
                        <h4>Quantity: <span>x{row.quantity}</span></h4>
                        {row.size && <h4>Size: {row.size}</h4> }
                        {row.info && <h4>Type: <span class="label label-primary">{row.info}</span></h4>}
                        {row.color && <h4>Color: {row.color}</h4>}
                        {row.option && <h4>Option: {row.option}</h4>}
                  </div>
                </BrowserView>
                <MobileView>
                  <div class="col-xs-6 col-md-3 col-lg-3">
                      <img src={row.defaultImage} class="splash-card-product-view" style={{margin: 10}}/>
                  </div>
                  <div class="col-xs-6 col-md-3 col-lg-3" style={{color: "white"}}>
                  <h3 style={{fontWeight: "bold"}}>{row.Name}</h3>
                        <span style={{fontSize: "3vw"}}>{row.price} EGP</span>
                        <h4>Quantity: <span>x{row.quantity}</span></h4>
                        {row.size && <h4>Size: {row.size}</h4> }
                        {row.info && <h4>Type: <span class="label label-primary">{row.info}</span></h4>}
                        {row.color && <h4>Color: {row.color}</h4>}
                        {row.option && <h4>Option: {row.option}</h4>}
                  </div>
                </MobileView>
            </div>)
           })}
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