import React, { Component } from 'react';
import '../App.css';
import '../Mycss.css';
import Getlogin from './navbar';

class Games extends Component {

state = {
    PaymentOps: '',
    ChoosePay: true
}

  updateOps(key, value) {
    this.setState({ [key]: value });
    this.setState({ChoosePay: false})
  }

  PaymentRender = () => {
    if(this.state.ChoosePay){

      return (

        <div className="bg-image"> 
        
        <div class="container">
        <div class="col-xs-6">
        <div class="VodaCash" style={{cursor: 'pointer'}} onClick={()=>{this.updateOps("PaymentOps", "VodaCash")}}>  
        </div>
        </div>
        <div class="col-xs-6">
        <div class="EtisCash" style={{cursor: 'pointer'}} onClick={()=>{this.updateOps("PaymentOps", "EtisCash")}}>
        </div>
        </div>
        <div className="PaymentDesc col col-xs-12"> 
        <h3> * Choose one of the payment options above:</h3>
            <p> Click on the image of the payment option you would like to know how to use.</p>
            <p> .دوس على طريقة الدفع عشان تعرف تعمل ايه عشان تشترى</p>
        </div>
        </div>
      </div>
      )
    }
}

  SinglePayment = () => {
    var t=this.state.PaymentOps+"Logo"

    if(!this.state.ChoosePay && this.state.PaymentOps =='VodaCash'){
      return (
      <div class="col-xs-12">
            <div className={t}> 
            </div>
      </div>
      )
    }
  }

render() {

    return (

  <div>
    <div className="bg-image"> 
    <Getlogin />
    {this.PaymentRender()}
    {this.SinglePayment()}
    </div>
    </div>
    );
  }
}

export default Games;