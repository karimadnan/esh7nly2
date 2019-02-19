import React, { Component } from 'react';
import ReactRouter from 'flux-react-router';
import '../Mycss.css';
import '../Respcss.css';
import { FacebookProvider, Page, CustomChat } from 'react-facebook';

class Footer extends Component {

render() {

    return (

    <footer id="footerClass">
        <div class="col-md-6 col-lg-6 col-xs-6 ">
            <h3 style={{fontWeight: "bold"}}> Like us on facebook </h3>
            <FacebookProvider key="1" appId="1984023341904164">
                <Page style={{width: 317}}  showFacepile="false" href="https://www.facebook.com/EgyptianObama/" />
            </FacebookProvider> 
        </div>
        <div class="col-md-6 col-lg-6 col-xs-6 ">
        <h3 style={{fontWeight: "bold"}}> About Us </h3>
        <p> Eshe7nly.com was created to help you make online transactions without using a credit card and to those who were scammed by non-legit online resellers.
        <br/>You can contact us by emailing to contact@eshe7nly.com for more ways to contact us visit - <a  onClick={()=>{ReactRouter.goTo("/contactus")}} style={{cursor: 'pointer'}}>Contact Us <span className="glyphicon glyphicon-earphone"></span> </a></p>
        <p>We are not affiliated Epic Games/Riot Games/Blue hole or endorsed by them in any way and all the graphics/images are fan art.</p>
        </div>
        <div class="col-md-12 col-lg-12 col-xs-12 ">
        <br />  
        <div class="bordersep"/>
        <h6 style={{textAlign: "center", fontWeight: "bold"}}> © 2019, Eshe7nly.com - <a  onClick={()=>{ReactRouter.goTo("/privacy")}} style={{cursor: 'pointer'}}>Privacy Policy  <span className="glyphicon glyphicon-briefcase"></span> </a> </h6>
        </div>
    </footer>
    );
    }
}

export default Footer;