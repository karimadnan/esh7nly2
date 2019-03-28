import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import VodafoneCashLogo from '../Images/Vodacash.png';
import EtisalatCashLogo from '../Images/Etiscash.png';
import FawryLogo from '../Images/fawrypaymenttest.png';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Leads extends Component {

state = {
headers: {
  'Content-Type': 'application/json',
  'authorization': this.props.loginData.token},
Url: this.props.server.main,
ordersData: {},
loaded: false
}

assignLead(lead){
    var that = this
    axios.get(`${this.state.Url}assginlead?orderID=${lead._id}`, {headers: this.state.headers})
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error, "ERROR")
    })
}

render(){
  if (!this.state.loaded){
    var that = this
    axios.get(`${this.state.Url}getOrdersByType?status=pending`, {headers: this.state.headers})
    .then(function (response) {
      that.setState({ordersData: response.data.data, loaded: true})
    })
    .catch(function (error) {
      that.setState({loaded: true})
    })
  }
  if(this.state.loaded){

    let LEADS = this.state.ordersData.map(lead => {
        return (
            <div class="col-md-12 col-lg-12 leadsBG" key={lead._id}>
                <div class="col-md-3 col-lg-3">
                    <span style={{fontSize: 16, lineHeight: 2.5}} class="label label-primary">{moment(lead.createdAt).format('LLL')}</span>
                </div>
                <div class="col-md-2 col-lg-2">
                    <span style={{fontSize: 16, lineHeight: 2.5}} class="label label-info">{lead.orderType}</span>
                </div>
                <div class="col-md-2 col-lg-2">
                    <span style={{fontSize: 16, lineHeight: 2.5}} class="label label-success">{lead.game}</span>
                </div>
                <div class="col-md-2 col-lg-2">
                {  lead.paymentMethod === "VodafoneCash" && <img style ={{width: 50, height: 50}} src={VodafoneCashLogo} alt=""/>}
                {  lead.paymentMethod === "EtisalatCash" && <img style ={{width: 50, height: 50}} src={EtisalatCashLogo} alt=""/>}
                {  lead.paymentMethod === "Fawry" && <img style ={{width: 50, height: 50}} src={FawryLogo} alt=""/>}
                </div>
                <div class="col-md-2 col-lg-2">
                    <button class="btn btn-danger btn-block" style={{color : "white", lineHeight: 2.0, marginTop: 4}} onClick={()=>{this.assignLead(lead)}}>
                        <span className="icon glyphicon glyphicon-ok"></span>
                        <span className="text">Take</span>
                    </button>                
                </div>
            </div>
        )
    })
    return(
        <div>
        <div class="col-md-12 col-lg-12 leadsTitleBG">
            <div class="col-md-3 col-lg-3">
                <span style={{fontSize: 16, lineHeight: 2.5, color: "white"}} class="menuLabel menuLabel-purple">Order Date</span>
            </div>
            <div class="col-md-2 col-lg-2">
                <span style={{fontSize: 16, lineHeight: 2.5, color: "white"}} class="menuLabel menuLabel-purple">Type</span>
            </div>
            <div class="col-md-2 col-lg-2">
                <span style={{fontSize: 16, lineHeight: 2.5, color: "white"}} class="menuLabel menuLabel-purple">Info</span>
            </div>
            <div class="col-md-2 col-lg-2">
                <span style={{fontSize: 16, lineHeight: 2.5, color: "white"}} class="menuLabel menuLabel-purple">Method</span>
            </div>
        </div>
            {LEADS}
        </div>
    )
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

export default connect(mapStateToProps)(Leads);