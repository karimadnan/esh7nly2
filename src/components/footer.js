import React, { Component } from 'react';
import ReactRouter from 'flux-react-router';
import VodafoneCashLogo from '../Images/vodacashfooter.png';
import EtisalatCashLogo from '../Images/etisalatfooter.png';
import FawryLogo from '../Images/fawrypaymenttest.png';
import '../Mycss.css';
import '../Respcss.css';
import { FacebookProvider, Page} from 'react-facebook';

class Footer extends Component {

render() {
    return (

    <footer id="page-footer">
        <div className="col-md-6 col-lg-6 col-xs-12 ">
            <h3 style={{fontWeight: "bold"}}> Like us on facebook<span className="svg-icon svg-icon-facebook"></span> </h3>
            <FacebookProvider key="1" appId="1984023341904164">
                <Page style={{width: 317}}  showFacepile="false" href="https://www.facebook.com/ggegypt1337/" />
            </FacebookProvider> 
        </div>
        <div className="col-md-6 col-lg-6 col-xs-12 ">
        <h3 style={{fontWeight: "bold"}}> About Us<span className="svg-icon-logo svg-icon-logoBig"></span></h3>
        <p> GGegypt.com is developed by gamers and for gamers we know what gamers want and we will try to fill the gap. We will try to provide everything a gamer need. We also developed a system where you can real-time track your order, Our agents will always update you with info about your order just from your account page.
        <br/><br/>
        You can contact us by email to contact@ggegypt.com for more ways to contact us visit - <a  onClick={()=>{ReactRouter.goTo("/contactus")}} style={{cursor: 'pointer'}}>Contact Us <span className="glyphicon glyphicon-earphone"></span> </a></p>
        <p>We are not affiliated Epic Games/Riot Games/Blue hole or endorsed by them in any way and all the graphics/images are fan art.</p>
        </div>
        <div className="col-md-12 col-lg-12 col-xs-12 ">
        <br />  
        <div className="bordersep"/>
            <div className="col-md-6 col-lg-6 col-xs-12 ">
                <h6 style={{textAlign: "center", fontWeight: "bold"}}> © 2019, GGegypt.com - <a  onClick={()=>{ReactRouter.goTo("/privacy")}} style={{cursor: 'pointer'}}>Privacy Policy  <span className="glyphicon glyphicon-briefcase"></span> </a> </h6>
            </div>
            <div className="col-md-1 col-lg-1 col-xs-4">
                <img style ={{width: 70, height: 70, marginTop: 10}} src={VodafoneCashLogo} alt=""/>
            </div>
            <div className="col-md-1 col-lg-1 col-xs-4">
                <img style ={{width: 70, height: 70, marginTop: 10}} src={EtisalatCashLogo} alt=""/>
            </div>    
            <div className="col-md-1 col-lg-1 col-xs-4">
                <img style ={{width: 70, height: 70, marginTop: 10}} src={FawryLogo} alt=""/>
            </div>
        </div>
    </footer>
    );
    }
}

export default Footer;