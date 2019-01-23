import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import ReactRouter from 'flux-react-router';
import axios from 'axios';
import Getlogin from './navbar';

// import X from '../components/test';

class Main extends Component {


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
