import React, { Component } from 'react';
import '../Mycss.css';
import Getlogin from './navbar';

class EtisCash extends Component {

render() {

return (

    <div>
        <Getlogin />
        <div className="etis-bg">
        <div className="Voda-title">
        <h3> ازاى تشترك فى اتصالات كاش؟</h3>
            <p> .هتروح اى فرع اتصالات بالبطاقة و خط اتصالات بأسمك و تشترك ببلاش</p>
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
export default EtisCash;