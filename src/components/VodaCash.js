import React, { Component } from 'react';
import '../Mycss.css';
import Getlogin from './navbar';

class VodaCash extends Component {

render() {

return (

    <div>
        <Getlogin />
        <div className="voda-bg">
        <div className="Voda-title">
        <h3> ازاى تشترك فى فودافون كاش؟</h3>
            <p> .هتروح اى فرع فودافون بالبطاقة و خط فودافون بأسمك و تشترك ببلاش</p>
        </div>
        <div className="Voda-title2">
            <div className="Voda-text">
            <h3> ازاى تدفع؟ </h3>
            <p> ١- بعد ما تشترك و انت فى الفرع اودع الفلوس  </p>
            </div>
            <div className="Voda-text2">
            <p> #٢- وانت فى البيت اطلب *7000 </p>
            </div>
            <div className="Voda-text3">
            <p> ٣-  </p>
            </div>
        </div>
        </div>
    </div>

        );
        }
                                }
export default VodaCash;