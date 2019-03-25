import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import {connect} from 'react-redux';
import CountUp from 'react-countup';
import axios from 'axios';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


const icon = "svg-icon-big svg-icon-face"+ Math.floor(Math.random() * 6 + 1)

class Profile extends Component {

    state = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        msgs: {
            EN: ["Hey", "Yo", "Howdy", "Sup"],
            AR: ["باشااا", "عامل ايه ياسطاااا", "انتا تانى"]
        },
        status: '',
        email: '',
        phone: '',
        health: '',
        vouchPoints: ''
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

    if(!this.state.status){
        let Data = {token: this.props.loginData.token}
        var that = this
        axios.post(this.state.Url+"getUserbyId", Data, {headers: this.state.headers})
        .then(function (response) {
            const info = response.data.doc
            that.setState({status: info.status, 
                email: info.Email,
                phone: info.Phone,
                health: info.health,
                vouchPoints: info.VouchPoints})
        })
        .catch(function (error) {
            console.log(error.response.data.message, "FAIL")
        })
    }

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

                  {this.state.status && <div class="ProfileBGW">
                        <h1 style={{color: "black"}}>
                            <span style={{color: "purple"}}>{this.props.lang === "EN" ? 
                            this.state.msgs.EN[Math.floor(Math.random() * this.state.msgs.EN.length)]
                            :
                            this.state.msgs.AR[Math.floor(Math.random() * this.state.msgs.AR.length)]}
                            </span>, {this.props.loginData.userName}<span class={icon}/></h1>
                            <h3 style={{fontFamily: "impact", color: "black"}}>Account Status:&nbsp;&nbsp;<span style={{fontFamily: "arial", color: this.state.status === "active" ? "Green" : "Red", fontWeight: "bold"}} >{this.state.status}</span></h3>

                            <h3 style={{fontFamily: "impact", color: "black"}}>Health:{this.healthBar(this.state.health)}</h3><p style={{color: "black"}}>({this.props.lang === "EN" ? "You lose health if you provide a fake transaction id at 0 health your account will be banned" : "هتخسر هيلث لو بعت رقم عملية تحويل وهمى لو الهيلث خلص الاكونت هيتقفل"})</p>
                        <br/>
                            <h3 style={{fontFamily: "impact", color: "black"}}>Email:&nbsp;&nbsp;<span style={{fontFamily: "arial", textDecoration: "underline"}} class="label label-primary">{this.state.email}</span></h3>
                        <br/>
                            <h3 style={{fontFamily: "impact", color: "black"}}>Phone:&nbsp;&nbsp;<span style={{fontFamily: "arial", textDecoration: "underline"}} class="label label-primary">{this.state.phone}</span></h3>
                        <br/>
                            <h3 style={{fontFamily: "impact", color: "black"}}>Points: <span style={{fontFamily: "arial", textDecoration: "underline", color:"white"}} class="menuLabel-small menuLabel-purple"> <CountUp duration={5} end={this.state.vouchPoints}/>-Ash7enly Points</span></h3>
                            <p style={{color: "black"}}>({this.props.lang === "EN" ? "You gain ash7enly points on every successful purchase you make, you can use them to redeem prizes" : "هتاخد اشحنلى بوينتس على كل شحنة, تقدر تبدلهم بجوايز"})</p>
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
                 </div>} 
                </div>
                <br/>
                <Getlogin/>
            </div>
        </div>
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
  
  export default connect(mapStateToProps)(Profile);