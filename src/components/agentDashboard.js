import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import {connect} from 'react-redux';
import axios from 'axios';
import Leads from './leads';
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

class AgentDashboard extends Component {

    state = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        status: '',
        email: '',
        phone: '',
        ordersData: {},
        totalOrders: 0,
        failed: 0,
        passed: 0,
        nav: 'profile'
    }

    updateInput(key, value) {
        this.setState({ [key]: value });
    }
    
    Current(){
        if(this.state.nav === "profile"){
            return(
            <div>
            <BrowserView>
                <h1 style={{color: "black"}}><span style={{color: "purple"}}>Agent</span>, {this.props.loginData.userName}</h1>
                    <br/>
                    <h3 style={{textAlign: "center", color: "black"}}>Your performance this month</h3>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <span style={{fontSize: 16}} class="label label-primary col-xs-4 col-md-4 col-lg-4">Total: {this.state.totalOrders}</span>
                        <span style={{fontSize: 16}} class="label label-success col-xs-4 col-md-4 col-lg-4">Passed: {this.state.passed}</span>
                        <span style={{fontSize: 16}} class="label label-danger col-xs-4 col-md-4 col-lg-4">Failed: {this.state.failed}</span>
                    </div>
                    <br/>
                    <h3 style={{fontFamily: "impact", color: "black", textTransform: 'uppercase'}}>Account Status:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: this.state.status === "active" ? "Lime" : "Red", fontWeight: "bold"}} >{this.state.status}</span></h3>

                    <h3 style={{fontFamily: "impact", color: "black"}}>Email:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: "white"}} class="menuLabel-small menuLabel-babyRed">{this.state.email}</span></h3>
                <br/>
                    <h3 style={{fontFamily: "impact", color: "black"}}>Phone:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: "white"}} class="menuLabel-small menuLabel-babyRed">{this.state.phone}</span></h3>
                <br/>
            </BrowserView>
            <MobileView>
                <h1 style={{color: "black", fontSize: "8vw"}}>Agent, {this.props.loginData.userName}</h1>
                    <br/>
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <span style={{fontSize: "4vw"}} class="label label-primary col-xs-4 col-md-4 col-lg-4">Total: {this.state.totalOrders}</span>
                        <span style={{fontSize: "4vw"}} class="label label-success col-xs-4 col-md-4 col-lg-4">Passed: {this.state.passed}</span>
                        <span style={{fontSize: "4vw"}} class="label label-danger col-xs-4 col-md-4 col-lg-4">Failed: {this.state.failed}</span>
                    </div>
                    <br/>
                    <h3 style={{fontFamily: "impact", color: "black", textTransform: 'uppercase', fontSize: "6vw"}}>Account Status:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: this.state.status === "active" ? "Lime" : "Red", fontWeight: "bold"}} >{this.state.status}</span></h3>

                    <h3 style={{fontFamily: "impact", color: "black", fontSize: "5vw"}}>Email:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: "white"}} class="menuLabel-small menuLabel-babyRed">{this.state.email}</span></h3>
                <br/>
                    <h3 style={{fontFamily: "impact", color: "black", fontSize: "7vw"}}>Phone:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: "white"}} class="menuLabel-small menuLabel-babyRed">{this.state.phone}</span></h3>
                <br/>
            </MobileView>
            </div>
            )
        }
      else if (this.state.nav === "leads"){
          return(
            <Leads/>
        )
      }
    }

    render() {
    if (!this.props.loginData.loggedState || !this.props.loginData.isAdmin){
        return (
            <div class ="PrivacyBG">
            <br/><br/><br/>
            <div class="container">
              <div class="errorBG" style={{color: "white"}}>
                  <h1>403 (Forbidden)</h1>
                  <p> Ooops Something Went Wrong.</p>
              </div>
            </div>
            <Getlogin />
          </div>
        )
        }
    else{
        if(!this.state.status){
            let Data = {token: this.props.loginData.token}
            var that = this

            axios.post(this.state.Url+"getAdminbyId", Data, {headers: this.state.headers})
            .then(function (response) {
                const info = response.data.doc
                that.setState({email: info.Email, phone: info.Phone, status: info.status})
            })
            .catch(function (error) {
                // console.log(error.response.data.message, "FAIL")
            })

            axios.get(`${this.state.Url}getAdminHistory`, {headers: this.state.headers})
            .then(function (response) {
                console.log(response)
                // that.setState({ordersData: response.data.doc})
            })
            .catch(function (error) {
              if (error.response.data.message){
                // console.log(error.response.data.message, "FAIL")
              }
            })
            
        }
        return (
            <div>
                <div class ="PrivacyBG">
                    <br/><br/><br/>
                    <div class="container">
                        
                        {!this.state.status && 
                        <div>
                            <PacmanLoader
                                css={override}
                                sizeUnit={"px"}
                                size={100}
                                color={'#FFFF00'}
                                loading={true}/>
                            <h2 style={{color: "white"}}>Loading...</h2>
                        </div>}
    
                      {this.state.status && 
                      <div>
                        <br/>
                        <BrowserView>
                            <div class="agentNav col-xs-12 col-md-12 col-lg-12">
                                <div class={this.state.nav === "profile" ? "profileNavActive col-xs-3 col-md-1 col-lg-1" : "profileNavItem col-xs-3 col-md-1 col-lg-1"}>
                                    <h3 onClick={()=>{this.updateInput("nav", "profile")}} style={{lineHeight: 0.3}}>Profile</h3>
                                </div>
                                <div class={this.state.nav === "leads" ? "profileNavActive col-xs-3 col-md-1 col-lg-1" : "profileNavItem col-xs-3 col-md-1 col-lg-1"}>
                                    <h3 onClick={()=>{this.updateInput("nav", "leads")}} style={{lineHeight: 0.3}}>Leads</h3>
                                </div>
                                <div class={this.state.nav === "Orders" ? "profileNavActive col-xs-3 col-md-2 col-lg-2" : "profileNavItem col-xs-3 col-md-2 col-lg-2"}>
                                    <h3 onClick={()=>{this.updateInput("nav", "Orders")}} style={{lineHeight: 1.8, display: "inline"}}>My Orders</h3>
                                </div>
                                <div class="profileNavItem col-xs-3 col-md-1 col-lg-1">
                                    <h3 onClick={()=>{this.updateInput("nav", "settings")}} style={{lineHeight: 0.3}}>Settings</h3>
                                </div>
                            </div>
                        </BrowserView>
                        <MobileView>
                            <div class="agentNav col-xs-12 col-md-12 col-lg-12">
                                <div class={this.state.nav === "profile" ? "profileNavActive col-xs-3 col-md-1 col-lg-1" : "profileNavItem col-xs-3 col-md-1 col-lg-1"}>
                                    <h5 onClick={()=>{this.updateInput("nav", "profile")}} style={{lineHeight: 1.7}}>Profile</h5>
                                </div>
                                <div class={this.state.nav === "leads" ? "profileNavActive col-xs-3 col-md-1 col-lg-1" : "profileNavItem col-xs-3 col-md-1 col-lg-1"}>
                                    <h5 onClick={()=>{this.updateInput("nav", "leads")}} style={{lineHeight: 1.7}}>Leads</h5>
                                </div>
                                <div class={this.state.nav === "Orders" ? "profileNavActive col-xs-3 col-md-1 col-lg-1" : "profileNavItem col-xs-3 col-md-1 col-lg-1"}>
                                    <h5 onClick={()=>{this.updateInput("nav", "Orders")}} style={{lineHeight: 1.7, display: "inline"}}>My Orders</h5>
                                </div>
                                <div class="profileNavItem col-xs-3 col-md-1 col-lg-1">
                                    <h5 onClick={()=>{this.updateInput("nav", "settings")}} style={{lineHeight: 1.7}} style={{lineHeight: 1.7}}>Settings</h5>
                                </div>
                            </div>
                        </MobileView>
                        <div class="ProfileBGW">
                                {this.Current()}
                     </div>
                     </div>} 
                    </div>
                    <br/>
                </div>
                <Getlogin/>
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
  
  export default connect(mapStateToProps)(AgentDashboard);