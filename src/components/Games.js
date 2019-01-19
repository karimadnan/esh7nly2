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
      ErrorMsg: '',
      Url: localStorage.getItem('Server'),
      Games: true,
      OffersOps: [],
      SelectedOff: "",
      GameType: ''
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
    if(!this.state.Games){
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
      <h3> {this.state.SelectedOff.value}</h3>
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
    <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center>
          <h2>{this.state.ErrorMsg}</h2>
    </Modal>
    {this.GamesRender()}
    {this.SingleGame()}
    </div>
    </div>
    );
  }
}

export default Games;
