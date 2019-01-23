import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import ReactRouter from 'flux-react-router';
import axios from 'axios';
import Getlogin from './navbar';

// import X from '../components/test';

class Main extends Component {

    state = {
      loaded: false
    }
  componentDidMount(){
    this.getSteamData(); 
    }

  getSteamData=() =>{
    if (!this.state.loaded) {
    axios.get('https://store.steampowered.com/api/featured/')
    .then(response => {
        console.log(response)
        this.setState({loaded: true})
    })
    .catch(e => {
        console.log('Error: ', e.response)
    })
  }
  }

  render() {

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
