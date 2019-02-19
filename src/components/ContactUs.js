import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import tawkChat from '../Images/tawkchat.png';
import { FacebookProvider, Page, CustomChat } from 'react-facebook';
import Footer from './footer';

class Contact extends Component {

render() {

    return (
  <div>
    <div className="bg-image"> 
    <Getlogin page={"ContactUs"}/>
    <div class="col-xs-12 col-md-12 col-lg-12">

            <div style={{marginTop: 70}} class="ContactUs1 badge-dark">
                <h4> Your game is missing? no problem just contact us</h4>
                <h4> لعبتك مش موجودة؟ مش مشكلة كلمنا  </h4>
            </div>
    </div>
    <div class="col-xs-12 col-md-12 col-lg-12">
            <div style={{marginTop: 10}} class="ContactUs1 badge-dark3">
                <p> 1- Message us from the integrated chat on our website</p>
                <p> كلمنا على الشات الموجود على الصفحة  <img style={{borderRadius: 5.5}} src={tawkChat} alt=""></img></p>
            </div>
    </div>
    <div class="col-xs-12 col-md-12 col-lg-12">
            <div style={{marginTop: 10}} class="ContactUs1 badge-dark3">
                <p> 2- Message us on facebook</p>
                <p> كلمنا على الفيس بوك </p>
                <FacebookProvider key="1" appId="1984023341904164">
                      <Page style={{width: 317}}  showFacepile="false" href="https://www.facebook.com/EgyptianObama/" />
                </FacebookProvider> 
            </div>
    </div>
    </div>
    <Footer />
    </div>
    );
  }
}

export default Contact;