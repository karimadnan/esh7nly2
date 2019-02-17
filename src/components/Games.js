import React, { Component } from 'react';
  
import VodafoneCashLogo from '../Images/Vodacash.png';
import EtisalatCashLogo from '../Images/Etiscash.png';
import FawryLogo from '../Images/fawrypaymenttest.png';

import Fortniteshop from './FortniteShop';
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
import fortniteDab from '../Images/fortnitedab.png';


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
      netflixNumber: '',
      fortPhone: '',
      SelectedPlat: '',
      TransId: "",
      PlatformOps: [
      {value: "PC", label:"PC"},    
      {value: "Mobile", label: "Mobile"}],
      ServerOps:[
      {value:"EU West",label:"EU West"},
      {value:"EU Nordic and East",label:"EU Nordic and East"}
      ],
      PaymentOps: [
        {value: "VodafoneCash", label: "Vodafone Cash"},
        {value: "EtisalatCash", label: "Etisalat Cash"},
        {value: "Fawry", label: "Fawry"}],
        SelectedPay: ''
    }
    onOpenModal = (type) => {
      this.setState({[type]: true });
    };
   
    onCloseModal = (type) => {
      this.setState({[type]: false });
    };
    handleChange(type, value) {
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

    <div class="col-xs-12  col-md-4">    
      <div class="netflix" onClick={()=>{this.getGameDetails("netflix")}}></div>
    </div>

  </div>
</div>
      )
    }
  }

  SingleGame = () => {
  if(!this.state.Payment){
    var t=this.state.GameType+"Logo"

    if(!this.state.Games && this.state.GameType ==="league"){
      return (
      <div className="bgr-league0"> 
        <div class="container">

              {/* Game LOGO */}
              <div class="col-xs-12 col-md-12 col-lg-12">
                  <div className={t}>
                  </div>
              </div>

                  <div class="col-xs-12 col-md-12 col-lg-12">
                        <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
                          Back To List
                        </button>
                  </div>
                  
              <div class="col-xs-12 col-md-12 col-lg-12">
              <div className="GameDesc">

              <div class="col-xs-12 col-md-12 col-lg-12">
              <p/>
              </div>

                  <div class="col-xs-6 col-md-6 col-lg-6">
                  <label for="ChooseOffer" >1-Choose Offer:</label>
                  </div>
                  <div class="col-xs-6 col-md-6 col-lg-6">
                        <Select
                        styles={customStyles}
                        value={this.state.SelectedOff}
                        onChange={this.handleChange.bind(this, 'SelectedOff')}
                        options={this.state.OffersOps} placeholder='Choose Offer'
                      />
                  </div>

                  <div class="col-xs-12 col-md-12 col-lg-12">
                  <p/>
                  </div>

                  <div class="col-xs-6 col-md-6 col-lg-6">
                  <label for="ChooseServer">2-Choose Server:</label>
                  </div>
                  <div class="col-xs-6 col-md-6 col-lg-6">
                    <Select      
                        styles={customStyles}
                        value={this.state.SelectedServer}
                        onChange={this.handleChange.bind(this, 'SelectedServer')}
                        options={this.state.ServerOps} placeholder='Choose Server'
                      />
                  </div>

                  <div class="col-xs-12 col-md-12 col-lg-12">
                  <p/>
                  </div>

                  <div class="col-xs-6 col-md-6 col-lg-6">
                  <label for="ChooseServer">3-League Name:</label>
                  </div>
                  <div class="col-xs-6 col-md-6 col-lg-6">
                  <input class="form-control" 
                  style=
                  {{
                    marginLeft : 0,
                    color : "black"
                  }}
                  onChange={e => this.updateInput("leagName", e.target.value)}  type="text" placeholder="Summoner Name"></input>
                  </div>

                  <div class="col-xs-12 col-md-12 col-lg-12">
                  <p/>
                  </div>

                  <div class="col-xs-6 col-md-6 col-lg-6">
                  <label for="Payment" >Total To Pay:</label>
                  </div>
                  <div class="col-xs-6 col-md-6 col-lg-6">
                  {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
                  {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label} <img style ={{width: 30, height: 30}} src={Rp} alt=""/></p>}
                  </div>

                  <div class="col-xs-12 col-md-12 col-lg-12">
                    <p/>
                  </div>

                  <div class="col-xs-6 col-md-6 col-lg-6">
                  <label for="CheckOut" >Proceed to checkout:</label>
                  </div>
                  <div class="col-xs-6 col-md-6 col-lg-6">
                  <button class="checkoutbtn btn btn-primary"      
                  style=
                  {{
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
        </div>

      )
    }
    else if(!this.state.Games && this.state.GameType ==="fortnite"){
      return (
        <div className="bgr-fortnite0"> 
           <div class="container">
                {/* Game LOGO */}
              {/* Game LOGO */}
              <div class="col-xs-12 col-md-12 col-lg-12">
                  <div className={t}>
                  </div>
              </div>

              <div class="col-xs-12 col-md-12 col-lg-12">
                    <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
                      Back To List
                    </button>
              </div>

              <div class="col-xs-12 col-md-12 col-lg-12">      
                  
                <div className="GameDesc">

                      <div class="col-xs-12 col-md-12 col-lg-12">
                          <p/>
                      </div>

                    <div class="col-xs-6 col-md-6 col-lg-6">    
                      <label for="ChooseOffer">1-Choose Offer:</label>
                    </div>
                      <div class="col-xs-6 col-md-6 col-lg-6">
                            <Select
                            styles={customStyles}
                            value={this.state.SelectedOff}
                            onChange={this.handleChange.bind(this, 'SelectedOff')}
                            options={this.state.OffersOps} placeholder='Choose Offer'
                          />
                      </div>

                      <div class="col-xs-12 col-md-12 col-lg-12">
                          <p/>
                      </div>

                    <div class="col-xs-6 col-md-6 col-lg-6">    
                      <label for="ChooseOffer">2-Your Platform:</label>
                    </div>

                    <div class="col-xs-6 col-md-6 col-lg-6">
                          <Select
                          styles={customStyles}
                          value={this.state.SelectedPlat}
                          onChange={this.handleChange.bind(this, 'SelectedPlat')}
                          options={this.state.PlatformOps} placeholder='PC / Mobile'
                        />
                    </div>

                      <div class="col-xs-12 col-md-12 col-lg-12">
                          <p/>
                      </div>

                   <div class="col-xs-6 col-md-6 col-lg-6">    
                      <label for="ChooseServer">3-Phone Number:</label>
                   </div>
                  <div class="col-xs-6 col-md-6 col-lg-6">
                        <input class="form-control" 
                        style=
                          {{
                            marginLeft : 0,
                            color : "black"
                          }}
                          onChange={e => this.updateInput("fortPhone", e.target.value)}  type="text" placeholder="Mobile Number"></input>
                    </div>

                        <div class="col-xs-12 col-md-12 col-lg-12">
                          <p/>
                        </div>

                    <div class="col-xs-6 col-md-6 col-lg-6">   
                        <label for="Payment">Total To Pay:</label>
                    </div>

                    <div class="col-xs-6 col-md-6 col-lg-6">
                    {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
                    {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label} <img style ={{width: 20, height: 20}} src={Vbucks} alt=""/></p>}
                    </div>

                    <div class="col-xs-6 col-md-6 col-lg-6">   
                          <label for="CheckOut">Proceed to checkout:</label>
                    </div>
                          <button class="checkoutbtn btn btn-primary"      
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
    <div class="col-xs-12 col-md-12 col-lg-12">
        <div className={t}>
        </div>
    </div>

    <div class="col-xs-12 col-md-12 col-lg-12">
          <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
            Back To List
          </button>
    </div>

    {/* Offers BODY */}
  <div class="col-xs-12 col-md-12 col-lg-12">

        <div className="GameDesc">

              <div class="col-xs-12 col-md-12 col-lg-12">
                  <p/>
              </div>
            
        <div class="col-xs-6 col-md-6 col-lg-6"> 
          <label for="ChooseOffer">1-Choose Offer:</label>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
              <Select
              styles={customStyles}
              value={this.state.SelectedOff}
              onChange={this.handleChange.bind(this, 'SelectedOff')}
              options={this.state.OffersOps} placeholder='Choose Offer'
            />
        </div>

        <div class="col-xs-12 col-md-12 col-lg-12">
          <p/>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6"> 
          <label for="ChooseOffer" >2-Your Platform:</label>
       </div>

      <div class="col-xs-6 col-md-6 col-lg-6">
            <Select
            styles={customStyles}
            value={this.state.SelectedPlat}
            onChange={this.handleChange.bind(this, 'SelectedPlat')}
            options={this.state.PlatformOps} placeholder='PC / Mobile'
          />
      </div>

          <div class="col-xs-12 col-md-12 col-lg-12">
            <p/>
          </div>

    <div class="col-xs-6 col-md-6 col-lg-6">
      <label for="ChooseServer">3-Pubg Name:</label>
    </div>

    <div class="col-xs-6 col-md-6 col-lg-6">
          <input class="form-control" 
          style=
            {{
              marginLeft : 0,
              color : "black"
            }}
            onChange={e => this.updateInput("pubgName", e.target.value)}  type="text" placeholder="Pubg Name"></input>
      </div>

        <div class="col-xs-12 col-md-12 col-lg-12">
          <p/>
        </div>


        <div class="col-xs-6 col-md-6 col-lg-6">
            <label for="Payment">Total To Pay:</label>
        </div>
    
        <div class="col-xs-6 col-md-6 col-lg-6">
        {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
        {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label}</p>}
        </div>

        <div class="col-xs-12 col-md-12 col-lg-12">
          <p/>
        </div>
        
        <div class="col-xs-6 col-md-6 col-lg-6">
          <label for="CheckOut">Proceed to checkout:</label>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
          <button class="checkoutbtn btn btn-primary"      
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
    </div>

  )
  }
  else if(!this.state.Games && this.state.GameType ==="crossfire")  {

    return (
<div className="bgr-crossfire0"> 
  <div class="container">

      {/* Game LOGO */}
      <div class="col-xs-12 col-md-12 col-lg-12">
          <div className={t}>
          </div>
      </div>

    <div class="col-xs-12 col-md-12 col-lg-12">
          <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
            Back To List
          </button>
    </div>
  
      {/* Offers BODY */}
    <div class="col-xs-12 col-md-12 col-lg-12">
      <div className="GameDesc">
  
            <div class="col-xs-12 col-md-12 col-lg-12">
              <p/>
            </div>

         <div class="col-xs-6 col-md-6 col-lg-6">
            <label for="ChooseOffer">1-Choose Offer:</label>
         </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
              <Select
              styles={customStyles}
              value={this.state.SelectedOff}
              onChange={this.handleChange.bind(this, 'SelectedOff')}
              options={this.state.OffersOps} placeholder='Choose Offer'
            />
        </div>
  
          <div class="col-xs-12 col-md-12 col-lg-12">
            <p/>
          </div>
  
      <div class="col-xs-6 col-md-6 col-lg-6">
        <label for="crossfireName">2-Crossfire Name:</label>
      </div>

      <div class="col-xs-6 col-md-6 col-lg-6">
          <input class="form-control" 
          style=
            {{
              marginLeft : 0,
              color : "black"
            }}
            onChange={e => this.updateInput("crossfireName", e.target.value)}  type="text" placeholder="Crossfire Name"></input>
      </div>

          <div class="col-xs-12 col-md-12 col-lg-12">
            <p/>
          </div>

  
        <div class="col-xs-6 col-md-6 col-lg-6">
          <label for="Payment">Total To Pay:</label>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
            {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
            {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label}</p>}
        </div>
  
        <div class="col-xs-12 col-md-12 col-lg-12">
              <p/>
        </div>
          
        <div class="col-xs-6 col-md-6 col-lg-6">
            <label for="CheckOut">Proceed to checkout:</label>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
            <button class="checkoutbtn btn btn-primary"      
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
</div>
  
    )
    }
    else if(!this.state.Games && this.state.GameType ==="steam")  {

      return (
        <div className="bgr-steam0"> 
        <div class="container">

        {/* Game LOGO */}
        <div class="col-xs-12 col-md-12 col-lg-12">
          <div className={t}>
          </div>
        </div>

      <div class="col-xs-12 col-md-12 col-lg-12">
            <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
              Back To List
            </button>
      </div>
    
        {/* Offers BODY */}
      <div class="col-xs-12 col-md-12 col-lg-12">
        <div className="GameDesc">
    
        <div class="col-xs-12 col-md-12 col-lg-12">
              <p/>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6">    
          <label for="ChooseOffer">1-Choose Offer:</label>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
              <Select
              styles={customStyles}
              value={this.state.SelectedOff}
              onChange={this.handleChange.bind(this, 'SelectedOff')}
              options={this.state.OffersOps} placeholder='Choose Offer'
            />
        </div>
    
        <div class="col-xs-12 col-md-12 col-lg-12">
              <p/>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
          <label for="steamEmail">2-Your Email:</label>
        </div>

          <div class="col-xs-6 col-md-6 col-lg-6">
              <input class="form-control" 
              style=
                {{
                  marginLeft : 0,
                  color : "black"
                }}
                onChange={e => this.updateInput("steamEmail", e.target.value)}  type="text" placeholder="example@gmail.com"></input>
          </div>

        <div class="col-xs-12 col-md-12 col-lg-12">
              <p/>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
            <label for="Payment">Total To Pay:</label>
        </div>
        <div class="col-xs-6 col-md-6 col-lg-6">
            {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
            {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label}</p>}
        </div>
    
        <div class="col-xs-12 col-md-12 col-lg-12">
            <p/>
        </div>        

        <div class="col-xs-6 col-md-6 col-lg-6">
              <label for="CheckOut">Proceed to checkout:</label>
        </div>

          <div class="col-xs-6 col-md-6 col-lg-6">
              <button class="checkoutbtn btn btn-primary"      
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
</div>
    
      )
      }
      else if(!this.state.Games && this.state.GameType ==="tibia")  {

        return (
          <div className="bgr-tibia0"> 
          <div class="container">
          {/* Game LOGO */}
          <div class="col-xs-12 col-md-12 col-lg-12">
            <div className={t}>
            </div>
          </div>

          <div class="col-xs-12 col-md-12 col-lg-12">
                <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
                  Back To List
                </button>
          </div>
      
          {/* Offers BODY */}
        <div class="col-xs-12 col-md-12 col-lg-12">
          <div className="GameDesc">
      
                <div class="col-xs-12 col-md-12 col-lg-12">
                  <p/>
              </div>   

            <div class="col-xs-6 col-md-6 col-lg-6">   
                <label for="ChooseOffer">1-Choose Offer:</label>
            </div>
                <div class="col-xs-6 col-md-6 col-lg-6">
                      <Select
                      styles={customStyles}
                      value={this.state.SelectedOff}
                      onChange={this.handleChange.bind(this, 'SelectedOff')}
                      options={this.state.OffersOps} placeholder='Choose Offer'
                    />
                </div>
      
                <div class="col-xs-12 col-md-12 col-lg-12">
                  <p/>
                </div>   

          <div class="col-xs-6 col-md-6 col-lg-6">
            <label for="tibiaChar">2-Tibia Character:</label>
          </div>

            <div class="col-xs-6 col-md-6 col-lg-6">
                <input class="form-control" 
                style=
                  {{
                    marginLeft : 0,
                    color : "black"
                  }}
                  onChange={e => this.updateInput("tibiaChar", e.target.value)}  type="text" placeholder="Your Ingame Name"></input>
            </div>

            <div class="col-xs-12 col-md-12 col-lg-12">
                <p/>
            </div>   

         <div class="col-xs-6 col-md-6 col-lg-6">
            <label for="Payment">Total To Pay:</label>
         </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
            {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
            {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label}</p>}
        </div>
      
        <div class="col-xs-6 col-md-6 col-lg-6">
            <label for="CheckOut">Proceed to checkout:</label>
        </div>

        <div class="col-xs-6 col-md-6 col-lg-6">
              <button class="checkoutbtn btn btn-primary"      
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
</div>
      
        )
        }
        else if(!this.state.Games && this.state.GameType ==="netflix")  {

          return (
            <div className="bgr-netflix0"> 
            <div class="container">
            {/* Game LOGO */}
            <div class="col-xs-12 col-md-12 col-lg-12">
              <div className={t}>
              </div>
            </div>
  
            <div class="col-xs-12 col-md-12 col-lg-12">
                  <button class="backbtn badge-dark2 btn btn-primary" style={{color : "red"}}  onClick={()=> {this.refreshBack()}}>
                    Back To List
                  </button>
            </div>
        
            {/* Offers BODY */}
          <div class="col-xs-12 col-md-12 col-lg-12">
            <div className="GameDesc">
        
                  <div class="col-xs-12 col-md-12 col-lg-12">
                    <p/>
                </div>   
  
              <div class="col-xs-6 col-md-6 col-lg-6">   
                  <label for="ChooseOffer">1-Choose Offer:</label>
              </div>
                  <div class="col-xs-6 col-md-6 col-lg-6">
                        <Select
                        styles={customStyles}
                        value={this.state.SelectedOff}
                        onChange={this.handleChange.bind(this, 'SelectedOff')}
                        options={this.state.OffersOps} placeholder='Choose Offer'
                      />
                  </div>
        
                  <div class="col-xs-12 col-md-12 col-lg-12">
                    <p/>
                  </div>   
  
            <div class="col-xs-6 col-md-6 col-lg-6">
              <label for="netflixNumber">2-Phone Number:</label>
            </div>
  
              <div class="col-xs-6 col-md-6 col-lg-6">
                  <input class="form-control" 
                  style=
                    {{
                      marginLeft : 0,
                      color : "black"
                    }}
                    onChange={e => this.updateInput("netflixNumber", e.target.value)}  type="text" placeholder="Your Mobile Number"></input>
              </div>
  
              <div class="col-xs-12 col-md-12 col-lg-12">
                  <p/>
              </div>   
  
           <div class="col-xs-6 col-md-6 col-lg-6">
              <label for="Payment">Total To Pay:</label>
           </div>
  
          <div class="col-xs-6 col-md-6 col-lg-6">
              {! this.state.SelectedOff.value && <p style={{textAlign: "center"}}>0$</p>}
              {this.state.SelectedOff.value && <p style={{textAlign: "center"}}> {this.state.SelectedOff.value} = {this.state.SelectedOff.label}</p>}
          </div>
        
          <div class="col-xs-6 col-md-6 col-lg-6">
              <label for="CheckOut">Proceed to checkout:</label>
          </div>
  
          <div class="col-xs-6 col-md-6 col-lg-6">
                <button class="checkoutbtn btn btn-primary"      
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
  </div>
        
          )
          }

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
      this.setState({ExtraData: obj, Payment: true})
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
        this.setState({ExtraData:obj,Payment:true})
    }
  }

    // PUBG CHECKOUT
    else if(this.state.GameType ==="pubg"){
      if(!this.state.SelectedOff || !this.state.SelectedPlat || this.state.pubgName ===""){
        this.setState({ErrorModal: true, ErrorMsg: "Please Fill All Data"})
      }
      else{
        let obj={
          "SelectedPlat":this.state.SelectedPlat,
          "pubgName":this.state.pubgName,
          "SelectedOff":this.state.SelectedOff.value
        }
          this.setState({ExtraData:obj,Payment:true})
      }
    }

    // CROSSFIRE CHECKOUT
    else if(this.state.GameType ==="crossfire"){
      if(!this.state.SelectedOff || this.state.crossfireName ===""){
        this.setState({ErrorModal: true, ErrorMsg: "Please Fill All Data"})
      }
      else{
        let obj={
          "crossfireName":this.state.crossfireName,
          "SelectedOff":this.state.SelectedOff.value
        }
          this.setState({ExtraData:obj,Payment:true})
      }
    }

    // STEAM CHECKOUT
    else if(this.state.GameType ==="steam"){
      if(!this.state.SelectedOff || this.state.steamEmail ===""){
        this.setState({ErrorModal: true, ErrorMsg: "Please Fill All Data"})
      }
      else{
        let obj={
          "steamEmail":this.state.steamEmail,
          "SelectedOff":this.state.SelectedOff.value
        }
          this.setState({ExtraData:obj,Payment:true})
      }
    }

    // TIBIA CHECKOUT
    else if(this.state.GameType ==="tibia"){
      if(!this.state.SelectedOff || this.state.tibiaChar ===""){
        this.setState({ErrorModal: true, ErrorMsg: "Please Fill All Data"})
      }
      else{
        let obj={
          "tibiaChar":this.state.tibiaChar,
          "SelectedOff":this.state.SelectedOff.value
        }
          this.setState({ExtraData:obj,Payment:true})
      }
    }

    // NETFLIX CHECKOUT
    else if(this.state.GameType ==="netflix"){
      if(!this.state.SelectedOff || this.state.netflixNumber ===""){
        this.setState({ErrorModal: true, ErrorMsg: "Please Fill All Data"})
      }
      else{
        let obj={
          "Number":this.state.netflixNumber,
          "SelectedOff":this.state.SelectedOff.value
        }
          this.setState({ExtraData:obj,Payment:true})
      }
    }
}
else{
  this.setState({ErrorModal: true, ErrorMsg: "Please Login"})
}
}

paymentRender(){
if (!this.state.SuccessModal){
  var bg = "bgr-"+this.state.GameType+"0"
if(this.state.Payment){
  return(
    <div class={bg}>
  <div class="paymentBody">
      <div class ="col-xs-12 col-md-12 col-lg-12">
        <h1 style={{textAlign: "center", textDecoration: "underline"}}><span class="glyphicon glyphicon-barcode"></span>  Check Out <span class="glyphicon glyphicon-barcode"></span></h1>
      </div>
      <div class ="col-xs-12 col-md-12 col-lg-12">
      <h2> Offer : <kbd> {this.state.SelectedOff.label}</kbd> </h2>
      </div>
      <div class ="col-xs-12 col-md-12 col-lg-12">
        <h2 > Total Price : <kbd>{this.state.SelectedOff.value}</kbd>  </h2>
      </div>

      <div class ="col-xs-4 col-md-4 col-lg-4">
        <h2 class="text-right"> Method : </h2>
      </div>
        <div style={{marginTop: 21}} class="col-xs-4 col-md-4 col-lg-4">            
            <Select
              styles={customStyles}
              value={this.state.SelectedPay}
              onChange={this.handleChange.bind(this, 'SelectedPay')}
              options={this.state.PaymentOps} placeholder='Choose Payment Method'
            />
        </div>
        <div style={{marginTop: 0}} class="col-xs-4 col-md-4 col-lg-4">            
           {  this.state.SelectedPay.value === "VodafoneCash" && <img style ={{width: 100, height: 100}} src={VodafoneCashLogo} alt=""/>}
           {  this.state.SelectedPay.value === "EtisalatCash" && <img style ={{width: 100, height: 100}} src={EtisalatCashLogo} alt=""/>}
           {  this.state.SelectedPay.value === "Fawry" && <img style ={{width: 100, height: 100}} src={FawryLogo} alt=""/>}
        </div>
      { this.state.SelectedPay.value && <div class="col-xs-12 col-md-12 col-lg-12">
        <div class ="col-xs-4 col-md-4 col-lg-4">
          <h4 class="text-right" style={{marginTop: 21}}> Transaction ID : </h4>
        </div>
        <div style={{marginTop: 21}} class="form-group">
        <div class="col-xs-4 col-md-4 col-lg-4">
            <input onChange={e => this.updateInput("transId", e.target.value)} type="text" class="form-control" placeholder="Your transaction ID" > 
            </input>
            </div>
        </div>
        <div class="col-md-4 col-lg-4 col-xs-4">
            <button onClick={()=> {this.createOrder()}} class="btn btn-primary btn-block">Place Order</button> 
        </div>	

        <div style={{marginTop: 10}} class="col-xs-12 col-md-12 col-lg-12">
        <div class="alert alert-danger">
          <p style={{textDecoration: "underline"}}><strong>Warning!</strong> If you send a wrong transaction id for 3 times in a row your account will get banned.</p>
        </div>
        </div>
        </div>} 
        { this.state.GameType === "league" && 
          <div class="col-xs-12 col-md-12 col-lg-12">
          <div class="alert alert-info">
            <p style={{textDecoration: "underline"}}><strong>Hey!</strong> If it's your first time ordering league rp you'll have to wait 24 hours after accepting our friend request to be able to gift you.</p>
            </div>
          </div>
         }
      </div>
    </div>
  );
}
}
}

createOrder() {

  var that = this
  var headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem("Token")
  }

  let Data = {game: this.state.GameType, paymentMethod: this.state.SelectedPay.value, orderType: "games", extra: this.state.ExtraData, transId: this.state.transId}
  if (this.state.transId && this.state.transId.length >= 12 && /^\d+$/.test(this.state.transId)){
  axios.post(this.state.Url+"createOrder", Data, {headers: headers})
  .then(function (response) {
    that.setState({SuccessModal: true, SuccessMsg: "Your order has been placed, to track your order go to your account orders page."})
  })
  .catch(function (error) {
      that.setState({ErrorModal: true, ErrorMsg: error.response.data.message})
  })
  }
  else {
    this.setState({ErrorModal: true, ErrorMsg: "Make sure to enter the 12 transaction id number correctly"})
  }
  console.log(this.state.transId)
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

  const SuccessStyle = {
    overlay: {
      background: "transparent"
    },
    modal: {
      backgroundColor: 'rgba(124, 214, 105, 0.9)',
      color: "white",
      borderRadius: '10px',
    },
  }

return (
  
  <div>

      <div className="bg-image"> 

      <Modal open={this.state.SuccessModal} onClose={this.onCloseModal.bind(this,'SuccessModal')} center
          styles={SuccessStyle}>
          <h3 class="col-xs-6">{this.state.SuccessMsg}</h3>
          <img style ={{width: 150, height: 120}} class="col-xs-6" src={fortniteDab} alt=""></img>
      </Modal>
      <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
          styles={ErrorStyle}>
          <h3 class="col-xs-6">{this.state.ErrorMsg}</h3>
          <img style ={{width: 150, height: 120}} class="col-xs-6" src={amumu} alt=""></img> 
      </Modal>

        {this.GamesRender()}
        {this.SingleGame()}
        {this.paymentRender()}
        <Getlogin page={"Offers"}/>
      </div>
  </div>
      );
  }
}

export default Games;
