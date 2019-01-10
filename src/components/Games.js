import React, { Component } from 'react';
import '../App.css';
import '../Mycss.css';
import ReactRouter from 'flux-react-router';

// var ReactRouter = require('flux-react-router');
 // ReactRouter.goTo("/DriverTrips")

class Games extends Component {
  render() {

    return (

  <div>
    <div className="bg-image"> 



    <div class="league" onClick={()=>{ReactRouter.goTo("/Main")}}>  

    <div data-content="Here is a caption" class="league">
    </div>
    </div>

    <div class="fortnite" onClick={()=>{ReactRouter.goTo("/Main")}}>
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
    </div>
    );
  }
}

export default Games;
