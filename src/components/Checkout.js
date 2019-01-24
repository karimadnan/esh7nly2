import React, { Component } from 'react';
import Getlogin from './navbar';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import ReactRouter from 'flux-react-router';

class CheckOut extends Component {
    state ={
        ErrorModal: false,
        ErrorMsg: '',
        Url: localStorage.getItem('Server'),
        Game: this.props.Game,
        Price: this.props.Value,
        PaymentOps: [
        {value: "Vodafone-Cash", label: "Vodafone Cash"},
        {value: "Etisalat-Cash", label: "Etisalat Cash"},
        {value: "Direct-Pay", label: "Direct Payment"}],
        SelectedPay: ''
    }

    
componentDidMount(){
    console.log(this.state.Game, this.state.Price)
}

onOpenModal = (type) => {
    this.setState({[type]: true });
  };
 
  onCloseModal = (type) => {
    this.setState({[type]: false });
  };

  handleChange(type, value) {
    console.log(value, type)
    this.setState({[type]: value});
  }
    render(){
  return (
    <div className="bg-image">
    <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center>
          <h2>{this.state.ErrorMsg}</h2>
    </Modal>
    <Getlogin />
    <div className="GameDesc">
    <div> 
    <Select
        value={this.state.SelectedPay}
        onChange={this.handleChange.bind(this, 'SelectedPay')}
        options={this.state.PaymentOps} placeholder='Choose Payment'
      />
      </div>
    </div>
    </div>
  )
}
}
export default CheckOut;
