import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import Footer from './footer';
import {connect} from 'react-redux';
import CountUp from 'react-countup';

const icon = "svg-icon-big svg-icon-face"+ Math.floor(Math.random() * 6 + 1)

class Profile extends Component {

    state = {
        msgs: {
            EN: ["Hey", "Yo", "Howdy", "Sup"],
            AR: ["باشااا", "عامل ايه ياسطاااا", "انتا تانى"]
        },
        status: "Active",
        email: 'karimmadnan@gmail.com',
        phone: "01012487427",
        health: 2,
        orders: {total: 10, failed: 5, passed: 3, pending: 2},
        vouchPoints: 100
    }

    healthBar(health){
        switch(health){
        case 3: {
            return (
                <span>
                    <span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-hearts"/>
                </span>
            )
        }
        case 2: {
            return (
                <span>
                    <span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-emptyHearts"/>
                </span>
            )
        }
        case 1: {
            return (
                <span>
                    <span class="svg-icon svg-icon-hearts"/><span class="svg-icon svg-icon-emptyHearts"/><span class="svg-icon svg-icon-emptyHearts"/>
                </span>
            )
        }
        case 0: {
            return (
                <span>
                    <span class="svg-icon svg-icon-emptyHearts"/><span class="svg-icon svg-icon-emptyHearts"/><span class="svg-icon svg-icon-emptyHearts"/>
                </span>
            )
        }
        } 
    }

    render() {
        if (!this.props.loginData.loggedState){
            return (
            <div class ="PrivacyBG">
                <div class="container">
                    <h1>403 (Forbidden)</h1>
                    <p> You're not logged in</p>
                </div>
            </div>
          )
          }
        
        return (
        <div>
            <div class ="PrivacyBG">
                <br/><br/><br/>
                <div class="container">
                    <h1 style={{color: "white"}}>
                    <span style={{color: "green"}}>{this.props.lang === "EN" ? 
                    this.state.msgs.EN[Math.floor(Math.random() * this.state.msgs.EN.length)]
                    :
                    this.state.msgs.AR[Math.floor(Math.random() * this.state.msgs.AR.length)]}
                    </span>, {this.props.loginData.userName}<span class={icon}/></h1>
                <div class="bordersep"/>
                    <div class="ProfileBG">
                        <h3 class="col-xs-12 col-md-12 col-lg-12">
                            <div class="col-xs-12 col-md-3 col-lg-3">
                                <span class="label label-default">Total Orders: {this.state.orders.total}</span>
                            </div>
                            <div class="col-xs-12 col-md-3 col-lg-3">
                                <span class="label label-warning">Pending: {this.state.orders.pending}</span>
                            </div>
                            <div class="col-xs-12 col-md-3 col-lg-3">
                                <span class="label label-success">Passed: {this.state.orders.passed}</span>
                            </div>
                            <div class="col-xs-12    col-md-3 col-lg-3">
                                <span class="label label-danger">Failed: {this.state.orders.failed}</span>
                            </div>
                            <br/><br/>
                        </h3>

                            <h3 style={{fontFamily: "impact", color: "white"}}>Account Status:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: this.state.status === "Active" ? "Green" : "Red", fontWeight: "bold"}} >{this.state.status}</span></h3>

                            <h3 style={{fontFamily: "impact", color: "white"}}>Health:{this.healthBar(this.state.health)}</h3><p>({this.props.lang === "EN" ? "You lose health if you provide a fake transaction id at 0 health your account will be banned" : "هتخسر هيلث لو بعت رقم عملية تحويل وهمى لو الهيلث خلص الاكونت هيتقفل"})</p>
                        <br/>
                            <h3 style={{fontFamily: "impact", color: "white"}}>Email:&nbsp;&nbsp;<span style={{fontFamily: "arial", textDecoration: "underline"}} class="label label-primary">{this.state.email}</span></h3>
                        <br/>
                            <h3 style={{fontFamily: "impact", color: "white"}}>Phone:&nbsp;&nbsp;<span style={{fontFamily: "arial", textDecoration: "underline"}} class="label label-primary">{this.state.phone}</span></h3>
                        <br/>
                            <h3 style={{fontFamily: "impact", color: "white"}}>Points: <span style={{fontFamily: "arial", textDecoration: "underline"}} class="menuLabel-small menuLabel-purple"> <CountUp duration={5} end={this.state.vouchPoints}/>-Ash7enly Points</span></h3>
                            <p>({this.props.lang === "EN" ? "You gain ash7enly points on every successful purchase you make, you can use them to redeem prizes" : "هتاخد اشحنلى بوينتس على كل شحنة, تقدر تبدلهم بجوايز"})</p>
                            <br/>
                            <button class="btn btn-default" style={{color : "black", width: 270, fontWeight: "bold"}} onClick={()=>{this.updateInput("Type", "Merch")}}>
                                <span className="icon glyphicon glyphicon-pencil"></span>
                                <span className="text">Change Password</span>
                            </button>    
                            &nbsp;&nbsp;&nbsp;
                            <button class="btn btn-default" style={{color : "black", width: 270, fontWeight: "bold"}} onClick={()=>{this.updateInput("Type", "Merch")}}>
                                <span className="icon glyphicon glyphicon-off"></span>
                                <span className="text">Logout</span>
                            </button>      
                 </div>
                        <div class="bordersep"/>
                </div>
                <br/>
                <Getlogin/>
                <Footer/>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        loginData: state.loginSession,
        lang: state.lang.lang
    }
  }
  
  export default connect(mapStateToProps)(Profile);