import React, { Component } from 'react';
import '../App.css';
import '../Mycss.css';
import ReactRouter from 'flux-react-router';
import Getlogin from './navbar';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Select from 'react-select';

class Games extends Component {

    state = {
      ErrorModal: false,
      PaymentModal: false,
      ErrorMsg: '',
      ExtraData:{},
      Url: localStorage.getItem('Server'),
      Games: true,
      OffersOps: [],
      SelectedOff: "",
      GameType: '',
      SelectedServer:"",
      paymentfill:"",
      leagName:"",
      ServerOps:[{value:"west",label:"west"},
      {value:"nord",label:"nord"}],
      PaymentOps: [
        {value: "Vodafone-Cash", label: "Vodafone Cash"},
        {value: "Etisalat-Cash", label: "Etisalat Cash"},
        {value: "Direct-Pay", label: "Direct Payment"}],
        SelectedPay: ''
    }

    onOpenModal = (type) => {
      this.setState({[type]: true });
    };
   
    onCloseModal = (type) => {
      this.setState({[type]: false });
    };

    handleChange(type, value) {
      console.log(value, type)
      this.setState({[type]: value}, () =>{
      });
      // console.log(`Option selected:`, type);
    }
    updateInput(key, value) {
  
      this.setState({ [key]: value });
    }
  getGameDetails(name) {
    var that = this
    axios.get(`${this.state.Url}getGame?Name=${name}`)
    .then(function (response) {
        var arr = []
        response.data.data[0].Offers.forEach(element => {
          let object = {
            value: element.value,
            label: element.label
          }
          arr.push(object)
        });
        that.setState({Games: false, GameType: response.data.data[0].Name, OffersOps: arr})  
    })
    .catch(function (error) {
      console.log(error.response,"----------------------");
      that.setState({
        ErrorModal:true,
        ErrorMsg:error.response.data.message
      })
    }); 
  }

  GamesRender = () => {
    if(this.state.Games){

      return (
        <div className="bg-image"> 

        <div class="league" onClick={()=>{this.getGameDetails("league")}}>  
        </div>
    
        <div class="fortnite" onClick={()=>{this.getGameDetails("fortnite")}}>
        </div>
    
        <div class="pubg" onClick={()=>{ReactRouter.goTo("/Main")}}>
        </div>
    
        <div class="crossfire" onClick={()=>{ReactRouter.goTo("/Main")}}>
        </div>
    
        <div class="game1" onClick={()=>{ReactRouter.goTo("/Main")}}>
        </div>
    
        <div class="game2" onClick={()=>{ReactRouter.goTo("/Main")}}>
        </div>
    
    
        </div>
      )
    }
  }
  
  SingleGame = () => {
    var t=this.state.GameType+"Logo"
    if(!this.state.Games && this.state.GameType =="league"){
      return (
        <div>
        <div className={t}>
        </div>
        <div className="GameDesc">
        <div> 
        <Select
        value={this.state.SelectedOff}
        onChange={this.handleChange.bind(this, 'SelectedOff')}
        options={this.state.OffersOps} placeholder='Choose Offer'
      />
        </div>
      <p> {this.state.SelectedOff.value}</p>
      <Select
        value={this.state.SelectedServer}
        onChange={this.handleChange.bind(this, 'SelectedServer')}
        options={this.state.ServerOps} placeholder='Choose Server'
      />
      <input  onChange={e => this.updateInput("leagName", e.target.value)}  type="text" placeholder="Summoner Name"></input>
      <button onClick={()=> {
        this.CheckOut()
      }}>
        Checkout
      </button>
      </div>
      </div>
      )
    }
    else if(!this.state.Games && this.state.GameType =="fortnite"){

    }
  }

  CheckOut = () => {
    if(!localStorage.getItem("ID")){
        this.setState({ErrorModal: true, ErrorMsg: "Please Login"})
  }
  if(this.state.GameType =="league"){
  if(!this.state.SelectedOff || this.state.leagName =="" || !this.state.SelectedServer){
    this.setState({ErrorModal: true, ErrorMsg: "Please Fill All Data"})
  }
  else{
    let obj={
      "summonerName":this.state.leagName,
      "SelectedOff":this.state.SelectedOff.value,
      "SelectedServer":this.state.SelectedServer.value
    }
    this.setState({ExtraData:obj,PaymentModal:true})
  }

  }
}
paymentModal(){
if(this.state.SelectedPay.value =="Direct-Pay"){
  return(
    <div>
        <input  onChange={e => this.updateInput("paymentfill", e.target.value)}  type="text" placeholder="phone Number"></input>
    </div>
  );
}
else{
  return(
    <div>
        <input  onChange={e => this.updateInput("paymentfill", e.target.value)}  type="text" placeholder="trans Id"></input>
    </div>
  ); 
}
}
  render() {

    return (

  <div>
    <div className="bg-image"> 
    <Getlogin />
    <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center>
          <h2>{this.state.ErrorMsg}</h2>
    </Modal>
    <Modal open={this.state.PaymentModal} onClose={this.onCloseModal.bind(this,'PaymentModal')} center>
    <Select
        value={this.state.SelectedPay}
        onChange={this.handleChange.bind(this, 'SelectedPay')}
        options={this.state.PaymentOps} placeholder='Choose Payment'
      />
          {this.paymentModal()}
    </Modal>
    {this.GamesRender()}
    {this.SingleGame()}
    </div>
    </div>
    );
  }
}

export default Games;
