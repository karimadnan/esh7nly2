import React, { Component } from 'react';
import '../Mycss.css';
import ReactRouter from 'flux-react-router';
import axios from 'axios';
import Getlogin from './navbar';

// import X from '../components/test';

class Main extends Component {


state ={
df: [],
ff: []
}

componentDidMount(){
this.getData(); 
}

getData =() => {
  if (this.state.df) {
  axios.get('https://fnbr.co/api/shop', { 'headers': { 'x-api-key': 'b4d7cae7-7047-4a17-83f6-b4e62091d328' } })
  .then(response => {
      var Daily = response.data.data.daily
      Daily.forEach(element => {
        console.log(element)
      });
      console.log(Daily[0].name)
      this.setState({df: Daily})
  })
  .catch(e => {
      console.log('Error: ', e.response)
  })
}
}
  render() {

    const pStyle = {
      fontSize: '15px',
      textAlign: 'center',
      margin: '70px'
    };


    return (


<div>
  
<Getlogin />
<div className="bg-image">


</div>
</div>
    );
  }
}

export default Main;
