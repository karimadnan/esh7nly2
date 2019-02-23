import React, { Component } from 'react';

import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import Footer from './footer';

class Payment extends Component {

state = {
    PaymentOps: '',
    ChoosePay: true
}

  updateOps(key, value) {
    this.setState({ [key]: value });
    this.setState({ChoosePay: false})
  }

  refreshBack(){
    this.setState({PaymentOps: '', ChoosePay: true})
  }

  PaymentRender = () => {
    if(this.state.ChoosePay){

      return (

        <div className="container"> 
        
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
        <div class="Fawry" style={{cursor: 'pointer'}} onClick={()=>{this.updateOps("PaymentOps", "Fawry")}}>
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

    if(!this.state.ChoosePay && this.state.PaymentOps ==='VodaCash'){
      return (
      <div class="container">
      <br/>
      <br/>
      <br/>
      <div class="col-xs-12">
            <div className={t}> 
            </div>
      </div>
      
      <div class="col-xs-12 col-md-12 col-lg-12">
          <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red", marginTop: 5}}  onClick={()=> {this.refreshBack()}}>
            Back To List
          </button>
     </div>

      <div class="col-xs-12">
        <div style={{textAlign: "right", paddingRight: 10, fontSize: 20, fontWeight: "bold"}} className="badge-dark"> 
        <h1 > ازاى تشترك فى فودافون كاش؟ *</h1>
            <p> .هتروح اى فرع فودافون بالبطاقة و خط فودافون بأسمك و تشترك ببلاش</p>
            <h1 > ازاى تشترى؟ *</h1>
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
    else if(!this.state.ChoosePay && this.state.PaymentOps ==='EtisCash'){
      return (
        <div class="container">
      <br/>
      <br/>
      <br/>
        <div class="col-xs-12">
              <div className={t}>  </div>
        </div>

        <div class="col-xs-12 col-md-12 col-lg-12">
          <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red", marginTop: 5}}  onClick={()=> {this.refreshBack()}}>
            Back To List
          </button>
       </div>

        <div class="col-xs-12 col-md-12 col-lg-12">
          <div style={{textAlign: "right", paddingRight: 10, fontSize: 20, fontWeight: "bold"}} className="badge-dark"> 
      
              <h1 > ازاى تشترك فى اتصالات كاش؟ *</h1>
                  <p> .هتروح اى فرع اتصالات بالبطاقة و خط اتصالات بأسمك و تشترك ببلاش</p>
                  <h1 > ازاى تشترى؟ *</h1>
                  <p> ١- بعد ما تشترك و انت فى الفرع اودع الفلوس  </p>
                  <p> #٢- وانت فى البيت اطلب *777</p>
                  <p>٣- ستحصل على قائمة فلوس إختار "تحويل نقود" بالضغط على رقم 1</p>
                  <p>٤- أدخل كلمة المرور</p>
                  <p> ٥- أدخل المبلغ الذي تريد تحويله</p>
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
     else if(!this.state.ChoosePay && this.state.PaymentOps ==='Fawry'){
        return (
          <div class="container">
        <br/>
        <br/>
        <br/>

         <div class="col-xs-12">
             <div className={t}> 
        </div>

        <div class="col-xs-12 col-md-12 col-lg-12">
          <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red", marginTop: 5}}  onClick={()=> {this.refreshBack()}}>
            Back To List
          </button>
        </div>

              <div class="col-xs-12">
              <div style={{textAlign: "right", paddingRight: 10, fontSize: 20, fontWeight: "bold"}} className="badge-dark"> 
                  <h1 >*الدفع بالكاش داخل القاهرة فقط*</h1>
                   <h1 > ازاى تشترى بالكاش على طول؟</h1>
                   <p> ١- هتختار العرض العايزه و هتدخل رقم الموبايل</p>
                   <p>٢-هيوصلنا الرقم وواحد من الادمنز هيتصل بيك </p>
                   <p>٣-هيسألك على التفاصيل و هيقولك اقرب مكان تدفع فيه على حسب منطقتك</p>
                   <p>٤- بعد تأكيد الدفع هيوصلك العرض فى 5 دقايق</p>
                   <p>٥- اتأكد ان رقمك صح عشان ده هنتابع عليه معاك</p>
                   <p>٦- مواعيد الدفع بالكاش من 12 ص ل 12 م </p>
                   <p>٧- لو اخترت عرض بعد ساعات العمل هنكلمك فى ساعات العمل فقط</p>
              </div>
              </div>
          </div>
        </div>
            )
       }
    }
render() {
    return (

  <div>
    <div className="bg-image"> 
    <Getlogin page={"HowTo"}/>
    {this.PaymentRender()}
    {this.SinglePayment()}
    </div>
    <Footer />
    </div>
    );
  }
}


export default Payment;