import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import { FacebookProvider, Page, CustomChat } from 'react-facebook';

class Footer extends Component {

render() {

    return (


        <footer class="footer">
        <div class="col-md-6 col-lg-6 col-xs-6 ">
                  <div class ="panelFb" >
                      <div class="fbShit fb-page">
                      <FacebookProvider key="1" appId="1984023341904164">
                      <Page style={{width: 317}}  showFacepile="false" href="https://www.facebook.com/EgyptianObama/" />
                    </FacebookProvider> 
              </div>
              </div>
              </div>
        </footer>

    );
    }
}

export default Footer;