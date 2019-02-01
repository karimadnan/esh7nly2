import React, { Component } from 'react';

import '../Mycss.css';
import '../games.css';
import '../Respcss.css';
import ReactRouter from 'flux-react-router';
import Getlogin from './navbar';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import Vbucks from '../Images/fortnite-vbucks-icon.png';
import Rp from '../Images/rp.png';
import amumu from '../Images/amumusad.png';

class Games extends Component {

    state = {
      ErrorModal: false,
      PaymentModal: false,
      ErrorMsg: '',
      ExtraData:{},
      Url: localStorage.getItem('Server'),
      Games: true,
      OffersOps: [],
      SelectedOff: '',
      GameType: '',
      SelectedServer:'',
      paymentfill:'',
      tibiaChar:'',
      leagName:'',
      pubgName: '',
      crossfireName: '',
      fortPhone: '',
      SelectedPlat: '',
      PlatformOps: [
      {value: "PC", label:"PC"},    
      {value: "Mobile", label: "Mobile"}],
      ServerOps:[
      {value:"EU West",label:"EU West"},
      {value:"EU Nordic and East",label:"EU Nordic and East"},
      {value:"North America",label:"North America"},
      {value:"Turkey",label:"Turkey"},
      {value:"Brazil",label:"Brazil"},
      {value:"Russia",label:"Russia"},
      {value:"Oceania",label:"Oceania"},
      {value:"Latin America North",label:"Latin America North"},
      {value:"Latin America South",label:"Latin America South"}
      ],
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
    }
    updateInput(key, value) {
      this.setState({ [key]: value });
    }
    refreshBack(){
      this.setState({Games: true, GameType: '', SelectedOff: ''})
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
        console.log(response)
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
  <div class="container">

    <div class="col-xs-12 col-md-4">
      <div class="league" onClick={()=>{this.getGameDetails("league")}}></div> 
    </div>

    <div class="col-xs-12  col-md-4">
      <div class="fortnite" onClick={()=>{this.getGameDetails("fortnite")}}></div>
    </div>

    <div class="col-xs-12  col-md-4">
      <div class="pubg" onClick={()=>{this.getGameDetails("pubg")}}></div>
    </div>

    <div class="col-xs-12  col-md-4">
      <div class="crossfire" onClick={()=>{this.getGameDetails("crossfire")}}></div>
    </div>

    <div class="col-xs-12  col-md-4">    
      <div class="steamgames" onClick={()=>{this.getGameDetails("steam")}}></div>
    </div>

    <div class="col-xs-12  col-md-4">    
      <div class="tibia" onClick={()=>{this.getGameDetails("tibia")}}></div>
    </div>

  </div>
</div>
      )
    }
  }

  SingleGame = () => {

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted black',
        color: state.isSelected ? 'red' : 'blue',
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
      }
    }

    var t=this.state.GameType+"Logo"

    if(!this.state.Games && this.state.GameType ==="league"){
      return (
        <div className="bgr-league0"> 

        <div class="container">

        {/* Game LOGO */}
         <div class="col-xs-12">
            <div className={t}>
             </div>
             <button class="badge badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
        Back To List
        </button>
        </div>

        {/* Offers BODY */}
        <div className="GameDesc">
      <div class="row">

        <label for="ChooseOffer" class="col-xs-6">1-Choose Offer:</label>
        <div class="col-xs-6">
              <Select
              styles={customStyles}
              value={this.state.SelectedOff}
              onChange={this.handleChange.bind(this, 'SelectedOff')}
              options={this.state.OffersOps} placeholder='Choose Offer'
            />
         </div>
         <div class="col-xs-12">
            <p></p>
         </div>
      </div>



      <div class="row">

        <label for="ChooseServer" class="col-xs-6">2-Choose Server:</label>
        <div class="col-xs-6">
          <Select      
              styles={customStyles}
              value={this.state.SelectedServer}
              onChange={this.handleChange.bind(this, 'SelectedServer')}
              options={this.state.ServerOps} placeholder='Choose Server'
            />
         </div>
         <div class="col-xs-12">
            <p></p>
         </div>
      </div>


      <div class="row">
      <label for="ChooseServer" class="col-xs-6">3-League Name:</label>
      <div class="col-xs-6">
      <input class="form-control" 
      style=
        {{
          marginLeft : 0,
          color : "black"
        }}
        onChange={e => this.updateInput("leagName", e.target.value)}  type="text" placeholder="Summoner Name"></input>
  </div>
         <div class="col-xs-12">
            <p></p>
         </div>
     </div>

      <div class="row">
      <label for="Payment" class="col-xs-6">Total To Pay:</label>
      <div class="col-xs-6">
      {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
      {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label} <img style ={{width: 30, height: 30}} src={Rp} alt=""/></p>}
      </div>
      </div>

      <div class="row">
      <label for="CheckOut" class="col-xs-6">Proceed to checkout:</label>
      <button class="col-xs-6 btn btn-primary"      
      style=
        {{
          marginLeft : 0,
          color : "white"
        }}
        onClick={()=> {
        this.CheckOut()
      }}>
        Checkout
      </button>
      </div>
      
        </div>
      {/* Offers BODY END */}
      </div>
      </div>

      )
    }
    else if(!this.state.Games && this.state.GameType ==="fortnite"){
      return (
        <div className="bgr-fortnite0"> 
           <div class="container">
                {/* Game LOGO */}
                <div class="col-xs-12">
                    <div className={t}> </div>
                    <button class="badge badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
                        Back To List
                    </button>
                </div>
                <div className="GameDesc">

                        <div class="col-xs-12">
                            <p></p>
                        </div>
                        
                      <div class="row">
                      <label for="ChooseOffer" class="col-xs-6">1-Choose Offer:</label>
                      <div class="col-xs-6">
                            <Select
                            styles={customStyles}
                            value={this.state.SelectedOff}
                            onChange={this.handleChange.bind(this, 'SelectedOff')}
                            options={this.state.OffersOps} placeholder='Choose Offer'
                          />
                      </div>
                    </div>

                        <div class="col-xs-12">
                            <p></p>
                        </div>

                      <div class="row">
                      <label for="ChooseOffer" class="col-xs-6">2-Your Platform:</label>
                      <div class="col-xs-6">
                            <Select
                            styles={customStyles}
                            value={this.state.SelectedPlat}
                            onChange={this.handleChange.bind(this, 'SelectedPlat')}
                            options={this.state.PlatformOps} placeholder='PC / Mobile'
                          />
                      </div>
                    </div>

                        <div class="col-xs-12">
                            <p></p>
                        </div>

                      <div class="row">
                      <label for="ChooseServer" class="col-xs-6">3-Phone Number:</label>
                      <div class="col-xs-6">
                            <input class="form-control" 
                            style=
                              {{
                                marginLeft : 0,
                                color : "black"
                              }}
                              onChange={e => this.updateInput("fortPhone", e.target.value)}  type="text" placeholder="Mobile Number"></input>
                        </div>
                        <div class="col-xs-12">
                            <p></p>
                        </div>
                        </div>


                    <div class="row">
                        <label for="Payment" class="col-xs-6">Total To Pay:</label>
                        <div class="col-xs-6">
                        {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
                        {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label} <img style ={{width: 20, height: 20}} src={Vbucks} alt=""/></p>}
                        </div>
                    </div>

                    <div class="row">
                          <label for="CheckOut" class="col-xs-6">Proceed to checkout:</label>
                          <button class="col-xs-6 btn btn-primary"      
                          style=
                            {{
                              marginLeft : 0,
                              color : "white"
                            }}
                            onClick={()=> {
                            this.CheckOut()
                          }}>
                            Checkout
                          </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
  else if(!this.state.Games && this.state.GameType ==="pubg")  {

  return (
    <div className="bgr-pubg0"> 
    <div class="container">
    {/* Game LOGO */}
     <div class="col-xs-12">
        <div className={t}> </div>
        <button class="badge badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
            Back To List
        </button>
    </div>

    {/* Offers BODY */}
    <div className="GameDesc">

            <div class="col-xs-12">
                <p></p>
            </div>
            
          <div class="row">
          <label for="ChooseOffer" class="col-xs-6">1-Choose Offer:</label>
          <div class="col-xs-6">
                <Select
                styles={customStyles}
                value={this.state.SelectedOff}
                onChange={this.handleChange.bind(this, 'SelectedOff')}
                options={this.state.OffersOps} placeholder='Choose Offer'
              />
          </div>
        </div>

            <div class="col-xs-12">
                <p></p>
            </div>

          <div class="row">
          <label for="ChooseOffer" class="col-xs-6">2-Your Platform:</label>
          <div class="col-xs-6">
                <Select
                styles={customStyles}
                value={this.state.SelectedPlat}
                onChange={this.handleChange.bind(this, 'SelectedPlat')}
                options={this.state.PlatformOps} placeholder='PC / Mobile'
              />
          </div>
        </div>

         <div class="col-xs-12">
            <p></p>
         </div>


      <div class="row">
      <label for="ChooseServer" class="col-xs-6">3-Pubg Name:</label>
      <div class="col-xs-6">
            <input class="form-control" 
            style=
              {{
                marginLeft : 0,
                color : "black"
              }}
              onChange={e => this.updateInput("pubgName", e.target.value)}  type="text" placeholder="Pubg Name"></input>
        </div>
         <div class="col-xs-12">
            <p></p>
         </div>
       </div>

        <div class="row">
            <label for="Payment" class="col-xs-6">Total To Pay:</label>
            <div class="col-xs-6">
            {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
            {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label}</p>}
            </div>
        </div>

        
        <div class="row">
          <label for="CheckOut" class="col-xs-6">Proceed to checkout:</label>
          <button class="col-xs-6 btn btn-primary"      
          style=
            {{
              marginLeft : -15,
              color : "white"
            }}
            onClick={()=> {
            this.CheckOut()
          }}>
            Checkout
          </button>
        </div>
        
    </div>
    </div>
    </div>

  )
  }
  else if(!this.state.Games && this.state.GameType ==="crossfire")  {

    return (
      <div className="bgr-crossfire0"> 
      <div class="container">
      {/* Game LOGO */}
       <div class="col-xs-12">
          <div className={t}> </div>
          <button class="badge badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
            Back To List
        </button>
      </div>
  
      {/* Offers BODY */}
      <div className="GameDesc">
  
              <div class="col-xs-12">
                  <p></p>
              </div>
              
            <div class="row">
            <label for="ChooseOffer" class="col-xs-6">1-Choose Offer:</label>
            <div class="col-xs-6">
                  <Select
                  styles={customStyles}
                  value={this.state.SelectedOff}
                  onChange={this.handleChange.bind(this, 'SelectedOff')}
                  options={this.state.OffersOps} placeholder='Choose Offer'
                />
            </div>
          </div>
  
           <div class="col-xs-12">
              <p></p>
           </div>
  
        <div class="row">
        <label for="crossfireName" class="col-xs-6">2-Crossfire Name:</label>
        <div class="col-xs-6">
            <input class="form-control" 
            style=
              {{
                marginLeft : 0,
                color : "black"
              }}
              onChange={e => this.updateInput("crossfireName", e.target.value)}  type="text" placeholder="Crossfire Name"></input>
        </div>
           <div class="col-xs-12">
              <p></p>
           </div>
         </div>
  
          <div class="row">
              <label for="Payment" class="col-xs-6">Total To Pay:</label>
              <div class="col-xs-6">
              {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
              {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label}</p>}
              </div>
          </div>
  
          
          <div class="row">
            <label for="CheckOut" class="col-xs-6">Proceed to checkout:</label>
            <button class="col-xs-6 btn btn-primary"      
            style=
              {{
                marginLeft : 0,
                color : "white"
              }}
              onClick={()=> {
              this.CheckOut()
            }}>
              Checkout
            </button>
          </div>
          
      </div>
      </div>
      </div>
  
    )
    }
    else if(!this.state.Games && this.state.GameType ==="steam")  {

      return (
        <div className="bgr-steam0"> 
        <div class="container">
        {/* Game LOGO */}
         <div class="col-xs-12">
            <div className={t}> </div>
            <button class="badge badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
                Back To List
            </button>
        </div>
    
        {/* Offers BODY */}
        <div className="GameDesc">
    
                <div class="col-xs-12">
                    <p></p>
                </div>
                
              <div class="row">
              <label for="ChooseOffer" class="col-xs-6">1-Choose Offer:</label>
              <div class="col-xs-6">
                    <Select
                    styles={customStyles}
                    value={this.state.SelectedOff}
                    onChange={this.handleChange.bind(this, 'SelectedOff')}
                    options={this.state.OffersOps} placeholder='Choose Offer'
                  />
              </div>
            </div>
    
             <div class="col-xs-12">
                <p></p>
             </div>
    
          <div class="row">
          <label for="steamEmail" class="col-xs-6">2-Your Email:</label>
          <div class="col-xs-6">
              <input class="form-control" 
              style=
                {{
                  marginLeft : 0,
                  color : "black"
                }}
                onChange={e => this.updateInput("steamEmail", e.target.value)}  type="text" placeholder="example@gmail.com"></input>
          </div>
             <div class="col-xs-12">
                <p></p>
             </div>
           </div>
    
            <div class="row">
                <label for="Payment" class="col-xs-6">Total To Pay:</label>
                <div class="col-xs-6">
                {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
                {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label}</p>}
                </div>
            </div>
    
            
            <div class="row">
              <label for="CheckOut" class="col-xs-6">Proceed to checkout:</label>
              <button class="btn btn-primary col-xs-6"      
              style=
                {{
                  marginLeft : 0,
                  color : "white"
                }}
                onClick={()=> {
                this.CheckOut()
              }}>
                Checkout
              </button>
            </div>
            
        </div>
        </div>
        </div>
    
      )
      }
      else if(!this.state.Games && this.state.GameType ==="tibia")  {

        return (
          <div className="bgr-tibia0"> 
          <div class="container">
          {/* Game LOGO */}
           <div class="col-xs-12">
              <div className={t}> </div>
              <button class="badge badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
                  Back To List
              </button>
          </div>
      
          {/* Offers BODY */}
          <div className="GameDesc">
      
                  <div class="col-xs-12">
                      <p></p>
                  </div>
                  
                <div class="row">
                <label for="ChooseOffer" class="col-xs-6">1-Choose Offer:</label>
                <div class="col-xs-6">
                      <Select
                      styles={customStyles}
                      value={this.state.SelectedOff}
                      onChange={this.handleChange.bind(this, 'SelectedOff')}
                      options={this.state.OffersOps} placeholder='Choose Offer'
                    />
                </div>
              </div>
      
               <div class="col-xs-12">
                  <p></p>
               </div>
      
            <div class="row">
            <label for="tibiaChar" class="col-xs-6">2-Tibia Character:</label>
            <div class="col-xs-6">
                <input class="form-control" 
                style=
                  {{
                    marginLeft : 0,
                    color : "black"
                  }}
                  onChange={e => this.updateInput("tibiaChar", e.target.value)}  type="text" placeholder="Your Ingame Name"></input>
            </div>
               <div class="col-xs-12">
                  <p></p>
               </div>
             </div>
      
              <div class="row">
                  <label for="Payment" class="col-xs-6">Total To Pay:</label>
                  <div class="col-xs-6">
                  {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
                  {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label}</p>}
                  </div>
              </div>
      
              
              <div class="row">
                <label for="CheckOut" class="col-xs-6">Proceed to checkout:</label>
                <button class="btn btn-primary col-xs-6"      
                style=
                  {{
                    marginLeft : 0,
                    color : "white"
                  }}
                  onClick={()=> {
                  this.CheckOut()
                }}>
                  Checkout
                </button>
              </div>
              
          </div>
          </div>
          </div>
      
        )
        }

  }

  CheckOut = () => {
    // LEAGUE CHECKOUT
if (localStorage.getItem("Token")){
  if(this.state.GameType ==="league"){
  if(!this.state.SelectedOff || this.state.leagName ==="" || !this.state.SelectedServer){
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

  // FORTNITE CHECKOUT
  else if(this.state.GameType ==="fortnite"){
    if(!this.state.SelectedOff || !this.state.SelectedPlat || this.state.fortPhone ===""){
      this.setState({ErrorModal: true, ErrorMsg: "Please Fill All Data"})
    }
    else{
      let obj={
        "SelectedPlat":this.state.SelectedPlat,
        "PhoneNumber":this.state.fortPhone,
        "SelectedOff":this.state.SelectedOff.value
      }
        this.setState({ExtraData:obj,PaymentModal:true})
    }
  }

}
else{
  this.setState({ErrorModal: true, ErrorMsg: "Please Login"})
}
}

paymentModal(){
if(this.state.SelectedPay.value ==="Direct-Pay"){
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

    const ErrorStyle = {
      overlay: {
        background: "transparent"
      },
      modal: {
        backgroundColor: 'rgba(219, 105, 105, 0.9)',
        color: "white",
        borderRadius: '10px',
      },
    }
    return (

  <div>
    <div className="bg-image"> 

    <Getlogin />
    <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
          styles={ErrorStyle}>
          <h3 class="col-xs-6">{this.state.ErrorMsg}</h3>
          <img style ={{width: 150, height: 120}} class="col-xs-6" src={amumu} alt=""></img>    </Modal>
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
