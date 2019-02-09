import React, { Component } from 'react';
import Getlogin from './navbar';
import axios from 'axios';
import adminicon from '../Images/adminicon.png';

class Admindashboard extends Component {

state = {
headers: {
  'Content-Type': 'application/json',
  'authorization': localStorage.getItem("Token")},
operation: "",
Url: localStorage.getItem('Server'),
ordersData: []
}



updateInput(key, value) {
  this.setState({ [key]: value });
}

getAllOrders(){

  var that = this

  axios.get(`${this.state.Url}getAllOrders`, {headers: this.state.headers})
  .then(function (response) {
    var objects = []
    response.data.data.forEach(element => {
      let object = {
       data: element.extra,
       game: element.game,
       orderType: element.orderType,
       paymentMethod: element.paymentMethod,
       status: element.status,
       transId: element.transId,
       userName: element.user.Name,
       userPhone: element.user.Phone,
       orderID: element._id
     }
     objects.push(object)
    })
    that.setState({ordersData: objects})
    console.log(response)
  })
  .catch(function (error) {
    console.log(error.response);
  })
}

viewOrder(id) {
  console.log(id)
  var Data = {orderID: id}
  var that = this
  axios.post(this.state.Url+"viewOrder", Data, {headers: this.state.headers})
  .then(function (response) {
    that.getAllOrders()
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
})
}

endOrder(id) {
  console.log(id)
  var Data = {orderID: id}
  var that = this
  axios.post(this.state.Url+"endOrder", Data, {headers: this.state.headers})
  .then(function (response) {
    that.getAllOrders()
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
})
}

table() {
  if (this.state.ordersData.length > 0){
    var counter = 0
    return (
    <div class="container">
      <br/>
      <br/>
      <br/>
    <div style={{backgroundColor: "white"}}>
      <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Game</th>
        <th scope="col">Status</th>
        <th scope="col">View</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
        {this.state.ordersData.map(row => {
            counter ++;
            return (
              <tr key={counter}>
                <th scope="row">{counter}</th>
                <td>{row.game}</td>
                <td>{row.status === "pending" ? <span class="label label-default">Pending</span> : <span class="label label-primary">InProgress</span>}</td>
                <td><span style={{cursor: 'pointer'}} onClick={()=>{console.log(row.data)}} className="glyphicon glyphicon-eye-open"></span></td>
            <td> {row.status === "pending" ? <button  onClick={this.viewOrder.bind(this, row.orderID)} class="btn btn-success"> Check </button> : 
                   <button  onClick={this.endOrder.bind(this, row.orderID)} class="btn btn-danger"> End </button> } </td>
              </tr>
            )
        })}
      </tbody>
      </table>
    </div>
  </div>
    )
  }
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
  else if (this.state.operation === "orders"){
    return (
    <div class="container">
        {this.table()}
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
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "orders"), this.getAllOrders()}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-euro"></span> - Orders</h3>
              </div>
              {/* Strikes */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "strikes")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-screenshot"></span> - Add Strike</h3>
              </div>
              {/* All Orders */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "passed")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-align-justify"></span> - All Orders</h3>
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