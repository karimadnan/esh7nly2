import React, { Component } from 'react';
import ReactRouter from 'flux-react-router';
import VodafoneCashLogo from '../Images/Vodacash.png';
import EtisalatCashLogo from '../Images/Etiscash.png';
import FawryLogo from '../Images/fawrypaymenttest.png';
import '../Mycss.css';
import '../Respcss.css';
import { FacebookProvider, Page} from 'react-facebook';

class Footer extends Component {

render() {
    return (

    <footer id="page-footer">
        <div class="col-md-6 col-lg-6 col-xs-12 ">
            <h3 style={{fontWeight: "bold"}}> Like us on facebook<span className="svg-icon svg-icon-facebook"></span> </h3>
            <FacebookProvider key="1" appId="1984023341904164">
                <Page style={{width: 317}}  showFacepile="false" href="https://www.facebook.com/EgyptianObama/" />
            </FacebookProvider> 
        </div>
        <div class="col-md-6 col-lg-6 col-xs-12 ">
        <h3 style={{fontWeight: "bold"}}> About Us<span className="svg-icon svg-icon-sphinx"></span></h3>
        <p> GGegypt.com was developed to help you make online transactions and track your orders with our system and get real-time detailed information on your order status without using a credit card and to those who were scammed by non-legit online resellers.
        <br/><br/>
        You can contact us by emailing to contact@ggegypt.com for more ways to contact us visit - <a  onClick={()=>{ReactRouter.goTo("/contactus")}} style={{cursor: 'pointer'}}>Contact Us <span className="glyphicon glyphicon-earphone"></span> </a></p>
        <p>We are not affiliated Epic Games/Riot Games/Blue hole or endorsed by them in any way and all the graphics/images are fan art.</p>
        </div>
        <div class="col-md-12 col-lg-12 col-xs-12 ">
        <br />  
        <div class="bordersep"/>
            <div class="col-md-6 col-lg-6 col-xs-6 ">
                <h6 style={{textAlign: "center", fontWeight: "bold"}}> © 2019, GGegypt.com - <a  onClick={()=>{ReactRouter.goTo("/privacy")}} style={{cursor: 'pointer'}}>Privacy Policy  <span className="glyphicon glyphicon-briefcase"></span> </a> </h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xs-2">
                <img style ={{width: 70, height: 70, marginTop: 10}} src={VodafoneCashLogo} alt=""/>
            </div>
            <div class="col-md-1 col-lg-1 col-xs-2">
                <img style ={{width: 70, height: 70, marginTop: 10}} src={EtisalatCashLogo} alt=""/>
            </div>    
            <div class="col-md-1 col-lg-1 col-xs-2">
                <img style ={{width: 70, height: 70, marginTop: 10}} src={FawryLogo} alt=""/>
            </div>
        </div>
    </footer>
    );
    }
}

export default Footer;