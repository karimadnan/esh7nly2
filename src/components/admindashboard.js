import React, { Component } from 'react';
import Getlogin from './navbar';
import axios from 'axios';
import adminicon from '../Images/adminicon.png';

class Admindashboard extends Component {

state = {
operation: ""
}

updateInput(key, value) {
  this.setState({ [key]: value });
}

renderPage() {

  if(this.state.operation === "news"){
    return(
        <div class="container">
              <div class="newsBody col-md-12 col-lg-12 col-xs-12">
                <h3 style={{fontFamily: "impact", color: "white", textAlign: "center"}}> <img style ={{width: 150, height: 130}} src={adminicon} alt=""></img> Admin Dashboard </h3>
              </div>
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 onClick={()=>{this.updateInput("operation", "")}} class="adminBody" style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-chevron-left"></span> Back to menu </h3>
              </div>
              <div class="form-group">
                <label style={{color: "white"}} for="title">Title:</label>
                <input type="text" class="form-control" id="title"></input>
              </div>
              <div class="form-group">
                <label style={{color: "white"}} for="body">Body:</label>
                <textarea class="form-control" rows="7" id="body"></textarea>
              </div>
              <div class="form-group col-md-12 col-lg-12 col-xs-12">
                  <button class="btn btn-primary btn-block">Post</button> 
              </div>	
        </div>
    )
    }
  else if (this.state.operation === "strikes"){
    return(
      <div class="container">
            <div class="newsBody col-md-12 col-lg-12 col-xs-12">
              <h3 style={{fontFamily: "impact", color: "white", textAlign: "center"}}> <img style ={{width: 150, height: 130}} src={adminicon} alt=""></img> Admin Dashboard </h3>
            </div>
            <div class="col-md-12 col-lg-12 col-xs-12">
              <h3 onClick={()=>{this.updateInput("operation", "")}} class="adminBody" style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-chevron-left"></span> Back to menu </h3>
            </div>
            <div class="form-group">
              <label style={{color: "white"}} for="title">User Name:</label>
              <input type="text" class="form-control" id="title"></input>
            </div>
            <div class="form-group col-md-12 col-lg-12 col-xs-12">
                <button class="btn btn-primary btn-block">Apply Strike</button> 
            </div>	
      </div>
  )
  }
  else if (this.state.operation === "checkuser"){
    return(
      <div class="container">
            <div class="newsBody col-md-12 col-lg-12 col-xs-12">
              <h3 style={{fontFamily: "impact", color: "white", textAlign: "center"}}> <img style ={{width: 150, height: 130}} src={adminicon} alt=""></img> Admin Dashboard </h3>
            </div>
            <div class="col-md-12 col-lg-12 col-xs-12">
              <h3 onClick={()=>{this.updateInput("operation", "")}} class="adminBody" style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-chevron-left"></span> Back to menu </h3>
            </div>
            <div class="form-group">
              <label style={{color: "white"}} for="title">User Name:</label>
              <input type="text" class="form-control" id="title"></input>
            </div>
            <div class="form-group col-md-12 col-lg-12 col-xs-12">
                <button class="btn btn-primary btn-block">Check</button> 
            </div>	
      </div>
  )
  }
    return (
        <div class="container">

              <div class="newsBody col-md-12 col-lg-12 col-xs-12">
                <h1 style={{fontFamily: "impact", color: "white", textAlign: "center"}}> <img style ={{width: 150, height: 130}} src={adminicon} alt=""></img> Admin Dashboard </h1>
              </div>

              {/* News */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "news")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-plus"></span> - Post News</h3>
              </div>
              {/* Tickets */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "tickets")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-envelope"></span> - Check Tickets</h3>
              </div>
              {/* Orders */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "orders")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-euro"></span> - Orders</h3>
              </div>
              {/* Strikes */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "strikes")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-screenshot"></span> - Add Strike</h3>
              </div>
              {/* Passed Orders */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "passed")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-ok-sign"></span> - Passed Orders</h3>
              </div>
              {/* Failed Orders */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "failed")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-remove-sign"></span> - Failed Orders</h3>
              </div>
              {/* User Check */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "checkuser")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-search"></span> - User Check</h3>
              </div>

        </div>
)


}    



render(){
  return (
    <div className="admin-bg">
      <Getlogin />
      {this.renderPage()}
    </div>
  )
}
}
export default Admindashboard;