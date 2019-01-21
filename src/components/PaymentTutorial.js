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
      <div class="col-xs-6">
        <div class="DirectPay" style={{cursor: 'pointer'}} onClick={()=>{this.updateOps("PaymentOps", "DirectPay")}}>
        </div>
        </div>

        <div className="PaymentDesc"> 
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
      <div class="container">
      <div class="col-xs-12">
            <div className={t}> 
            </div>
      </div>
      <div class="col-xs-12">
        <div className="PaymentDesc2"> 

        <h3> ازاى تشترك فى فودافون كاش؟ *</h3>
            <p> .هتروح اى فرع فودافون بالبطاقة و خط فودافون بأسمك و تشترك ببلاش</p>
            <h3> ازاى تشترى؟ *</h3>
            <p> ١- بعد ما تشترك و انت فى الفرع اودع الفلوس  </p>
            <p> #٢- وانت فى البيت اطلب *7000</p>
            <p>٣- دوس 1 للعربى و 2 للانجليزى</p>
            <p>٤- اختار "تحويل الاموال" بإدخال الرقم 1</p>
            <p> ٥- اضغط الرقم 1 لادخال رقم موبايل المرسل اليه</p>
            <p>٦- ادخل رقم موبايل المرسل اليه : 01012487427</p>
            <p>٧- اضغط الرقم 1 لتأكيد الرقم و ادخل المبلغ اللى عايز تبعته</p>
            <p>٨- اكد على العملية بإدخال الرقم السرى الخاص بك 4 ارقام</p>
            <p>٩- هتجيلك رسالة فيها المبلغ المحول و رقم العملية </p>
            <p>١٠- هتروح تختار العرض العايزه و تملى المطلوب و لازم المبلخ المحول يساوى العرض بعد كدا تختار طريقة الدفع و تكتب رقم العملية</p>
            <p>(My Offers) ١١- بعد كدا هيوصلنا التفاصيل , عشان تتابع الاوردر ادخل على الاكونت بتاعك على اشحنلى و دوس على اسمك و اختار</p>
            <p> (In Progress) ١٢- الادمنز هيستلموا الاوردر و هظهرلك عندك </p>
            <p>(Successful) ١٣- لو تم التأكد من رقم العملية و المبلغ المحول هتتحول </p>
        </div>
      </div>
      </div>
      )
    }
    else if(!this.state.ChoosePay && this.state.PaymentOps =='EtisCash'){
      return (
        <div class="container">
        <div class="col-xs-12">
              <div className={t}>  </div>
        </div>
              <div class="col-xs-12">
              <div className="PaymentDesc2"> 
      
              <h3> ازاى تشترك فى فودافون كاش؟ *</h3>
                  <p> .هتروح اى فرع فودافون بالبطاقة و خط فودافون بأسمك و تشترك ببلاش</p>
                  <h3> ازاى تشترى؟ *</h3>
                  <p> ١- بعد ما تشترك و انت فى الفرع اودع الفلوس  </p>
                  <p> #٢- وانت فى البيت اطلب *7000</p>
                  <p>٣- دوس 1 للعربى و 2 للانجليزى</p>
                  <p>٤- اختار "تحويل الاموال" بإدخال الرقم 1</p>
                  <p> ٥- اضغط الرقم 1 لادخال رقم موبايل المرسل اليه</p>
                  <p>٦- ادخل رقم موبايل المرسل اليه : 01012487427</p>
                  <p>٧- اضغط الرقم 1 لتأكيد الرقم و ادخل المبلغ اللى عايز تبعته</p>
                  <p>٨- اكد على العملية بإدخال الرقم السرى الخاص بك 4 ارقام</p>
                  <p>٩- هتجيلك رسالة فيها المبلغ المحول و رقم العملية </p>
                  <p>١٠- هتروح تختار العرض العايزه و تملى المطلوب و لازم المبلخ المحول يساوى العرض بعد كدا تختار طريقة الدفع و تكتب رقم العملية</p>
                  <p>(My Offers) ١١- بعد كدا هيوصلنا التفاصيل , عشان تتابع الاوردر ادخل على الاكونت بتاعك على اشحنلى و دوس على اسمك و اختار</p>
                  <p> (In Progress) ١٢- الادمنز هيستلموا الاوردر و هظهرلك عندك </p>
                  <p>(Successful) ١٣- لو تم التأكد من رقم العملية و المبلغ المحول هتتحول </p>
              </div>
            </div>
          </div>
        )
        }
     else if(!this.state.ChoosePay && this.state.PaymentOps =='DirectPay'){
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