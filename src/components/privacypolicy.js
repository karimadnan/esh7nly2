import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import ReactRouter from 'flux-react-router';

class Privacy extends Component {

render() {

    return (
        <div class ="PrivacyBG">
            <br/> <br/> <br/>
            <div class="container" style={{textAlign: "center"}}>
        <div class="PrivacyBG2">
            <div class="bordersep"/>
                <h2> Privacy policy <span className="glyphicon glyphicon-briefcase"></span> </h2>
                <br/>
            <div style={{fontSize: 15, color:"white"}}>
                <p>• Eshe7nly.com aims to be transparent about the data/info we collect and we respect users privacy.</p>
                <p>• This Policy is to explain what info will be collected/used while using Eshe7nly.com. </p>
            </div>
            <div class="bordersep"/>
                <h2> User information <span className="glyphicon glyphicon-user"></span> </h2>
                    <div style={{fontSize: 15, color:"white"}}>
                        <p>• Currently we do not collect any information about you while browsing the website. </p>
                        <p>• If you decided to talk with us using our website chat plugin tawk.to stores your ip and your name/phone (only if you provided them) this is for communication purposes with us only and are not shared with anyone.</p>
                        <p>• You can view tawk.to privacy policy <a href="https://www.tawk.to/privacy-policy/" style={{cursor: 'pointer'}}>Click Here</a>.</p>
                    </div>
            <div class="bordersep"/>
                <h2> User Accounts <span className="glyphicon glyphicon-cog"></span> </h2>
                    <div style={{fontSize: 15, color:"white"}}>
                        <p>• In order to create account you need to provide (First/last names), (Phone Number), (Email). </p>
                        <p>• We only store this information for further communication if needed after placing an order. </p>
                        <p>• We do not share this information with anyone they will remain for communication purposes only. </p>
                    </div>
            <div class="bordersep"/>
                <h2> Privacy policy changes <span className="glyphicon glyphicon-lock"></span> </h2>
                    <div style={{fontSize: 15, color:"white"}}>
                        <p>• We reserve the right to change this policy anytime and if we do we will make sure everyone will get a notice about the changes. </p>
                    </div>
            <div class="bordersep"/>
                <br/><br/>
                <p>© 2019, Eshe7nly.com - <a  onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: 'pointer'}}>Back to homepage  <span className="glyphicon glyphicon-home"></span> </a></p>
        </div>
            </div>
        <Getlogin />
        </div>

    );
    }
}

export default Privacy;