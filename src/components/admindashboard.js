import React, { Component } from 'react';
import Getlogin from './navbar';
import axios from 'axios';
import adminicon from '../Images/adminicon.png';
import VodafoneCashLogo from '../Images/Vodacash.png';
import EtisalatCashLogo from '../Images/Etiscash.png';
import FawryLogo from '../Images/fawrypaymenttest.png';
import moment from 'moment';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-responsive-modal';

class Admindashboard extends Component {

notify = (id) => toast.info(`${id} action excuted!`, {
  position: "top-right",
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
});

state = {
headers: {
  'Content-Type': 'application/json',
  'authorization': this.props.loginData.token},
operation: "",
Url: this.props.server.main,
ordersData: [],
ordersHistory: [],
ordersCheck: '',
creatorCode: '',
InfoModal: false
}

updateInput(key, value) {
  this.setState({ [key]: value });
}
onOpenModal = (type) => {
  this.setState({[type]: true });
};

onCloseModal = (type) => {
  this.setState({[type]: false });
};

getOrdersHistory() {
  var that = this
  axios.get(`${this.state.Url}getAllOrdersHistory`, {headers: this.state.headers})
    .then(function (response) {
      var objects = []
      response.data.data.forEach(element => {
        let object = {
         startDate: element.createdAt,
         endDate: element.endedAt,
         endedBy: element.endedBy,
         paymentMethod: element.paymentMethod,
         order: element.game,
         transId: element.transId,
         orderType: element.orderType,
         data: element.extra,
         user: element.user
       }
       objects.push(object)
      })
      that.setState({ordersHistory: objects})
      console.log(response)
    })
    .catch(function (error) {
      console.log(error.response);
    })
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
  })
  .catch(function (error) {
    console.log(error)
})
}

tableHistory() {
  if (this.state.ordersHistory.length > 0){
    var counter = 0
    return (
    <div class="container">

      <br/>
      <br/>
      <br/>

      <div class="col-xs-12 col-md-12 col-lg-12">
      <h3 onClick={()=>{this.updateInput("operation", "")}} class="adminBody" style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-chevron-left"></span> Back to menu </h3>
      </div>
      <div class="col-xs-12 col-md-12 col-lg-12">
        <div class="col-xs-4 col-md-2 col-lg-2">
          <div class="badge-light">
            <p style={{fontWeight: "bold", fontSize: 15, textAlign: "center"}}>Finished Orders: {this.state.ordersHistory.length}</p>
          </div>
         </div>
         <div class="col-xs-4 col-md-2 col-lg-2">
          <div class="badge-light">
            <p style={{fontWeight: "bold", fontSize: 15, textAlign: "center"}}>Failed: </p>
          </div>
         </div>
         <div class="col-xs-4 col-md-2 col-lg-2">
          <div class="badge-light">
            <p style={{fontWeight: "bold", fontSize: 15, textAlign: "center"}}>Passed: </p>
          </div>
         </div>
      </div>
    <div class="col-xs-12 col-md-12 col-lg-12">
    <div class="table-responsive">
      <table style={{backgroundColor: "white"}} class="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th class="th-lg" scope="col">Created At</th>
        <th class="th-lg" scope="col">Ended At</th>
        <th scope="col">Order</th>
        <th class="th-sm" scope="col">Method</th>
        <th class="th-lg" scope="col">Trans ID</th>
        <th scope="col">View</th>
        <th scope="col">Type</th>
        <th scope="col">Agent</th>
      </tr>
      </thead>
      <tbody>
        {this.state.ordersHistory.map(row => {
            counter ++;
            return (
              <tr key={counter}>
                <th >{counter}</th>
                <td ><span class="label label-default">{moment(row.startDate).format('LLL')}</span></td>
                <td ><span class="label label-info">{moment(row.endDate).format('LLL')}</span></td>
                <td  style={{fontWeight: "bold", textTransform: 'uppercase'}}>{row.order}</td>
                <td >{row.paymentMethod === "VodafoneCash" ? <img style ={{width: 40, height: 40}} src={VodafoneCashLogo} alt=""/> : 
                    row.paymentMethod === "EtisalatCash" ? <img style ={{width: 40, height: 40}} src={EtisalatCashLogo} alt=""/> : <img style ={{width: 40, height: 40}} src={FawryLogo} alt=""/>}</td>
                <td ><span class="label label-default">{row.transId}</span></td>
                <td ><span style={{cursor: 'pointer'}} className="glyphicon glyphicon-eye-open"></span></td>
                <td  style={{fontWeight: "bold", textTransform: 'uppercase'}}>{row.orderType}</td>
                <td ><span class="label label-warning">{row.endedBy}</span></td>
              </tr>
            )
        })}
      </tbody>
      </table>
      </div>
    </div>
  </div>
    )
  }
  }

tableLeads() {
  if (this.state.ordersData.length > 0){

    var counter = 0
    var pending = 0
    var InProgress = 0


    this.state.ordersData.map(row => {
        if (row.status === "pending"){
            pending ++;
        }
        else {
            InProgress ++;
        }
      })

    return (
    <div class="container">
      <br/><br/><br/>
      <div class="col-xs-12 col-md-12 col-lg-12">
      <h3 onClick={()=>{this.updateInput("operation", "")}} class="adminBody" style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-chevron-left"></span> Back to menu </h3>
      </div>
      <div class="col-xs-12 col-md-12 col-lg-12">
        <div class="col-xs-4 col-md-2 col-lg-2">
          <div class="badge-light">
            <p style={{fontWeight: "bold", fontSize: 15, textAlign: "center"}}>Total Orders: {this.state.ordersData.length}</p>
          </div>
         </div>
         <div class="col-xs-4 col-md-2 col-lg-2">
          <div class="badge-light">
          <p style={{fontWeight: "bold", fontSize: 15, textAlign: "center"}}>Pending: {pending}</p>
          </div>
         </div>
         <div class="col-xs-4 col-md-2 col-lg-2">
          <div class="badge-light">
            <p style={{fontWeight: "bold", fontSize: 15, textAlign: "center"}}>InProgress: {InProgress}</p>
          </div>
         </div>
      </div>    

  <div class="col-xs-12 col-md-12 col-lg-12">
    <div class="table-responsive">
      <table style={{backgroundColor: "white"}} class="table table-striped table-dark">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Trans ID</th>
        <th scope="col">Phone</th>
        <th scope="col">Order</th>
        <th scope="col">Status</th>
        <th scope="col">Method</th>
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
              <th ><span class="label label-default">{row.transId}</span></th>
              <th ><span class="label label-info">{row.userPhone}</span></th>
              <td style={{fontWeight: "bold", textTransform: 'uppercase'}}>{row.game}</td>
              <td>{row.status === "pending" ? <span class="label label-default">Pending</span> : <span class="label label-primary">InProgress</span>}</td>
              <td>{row.paymentMethod === "VodafoneCash" ? <img style ={{width: 40, height: 40}} src={VodafoneCashLogo} alt=""/> : 
                  row.paymentMethod === "EtisalatCash" ? <img style ={{width: 40, height: 40}} src={EtisalatCashLogo} alt=""/> : <img style ={{width: 40, height: 40}} src={FawryLogo} alt=""/>}</td>
              <td ><span style={{cursor: 'pointer'}} onClick={() => {this.updateInput("InfoModal", "true")}} className="glyphicon glyphicon-eye-open"></span></td>
              <Modal open={this.state.InfoModal} onClose={this.onCloseModal.bind(this,'InfoModal')} center>
                  <h3 class="col-xs-6">{row.transId}</h3>
              </Modal>
              <td> {row.status === "pending" ? <button  onClick={this.viewOrder.bind(this, row.orderID)} class="btn btn-primary"> Check </button> : <div>
                <button  style={{marginRight: 5}} onClick={this.endOrder.bind(this, row.orderID)} class="btn btn-success"> done </button>
                <button  onClick={this.endOrder.bind(this, row.orderID)} class="btn btn-danger"> cancel </button> </div>} </td>
            </tr>
          )
      })}
      </tbody>
      </table>
      </div>
    </div>
  </div>
    )
  }
  }

header(){
  return (
    <div class="container">
      <br/>      <br/>
      <div class="newsBody col-md-12 col-lg-12 col-xs-12">
        <h3 style={{fontFamily: "impact", color: "white", textAlign: "center"}}> <img style ={{width: 150, height: 130}} src={adminicon} alt=""></img> Admin Dashboard </h3>
      </div>
      <div class="col-md-12 col-lg-12 col-xs-12">
        <h3 onClick={()=>{this.updateInput("operation", "")}} class="adminBody" style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-chevron-left"></span> Back to menu </h3>
      </div>
    </div>
    )
}

renderPage() {
  if (this.state.operation === "strikes"){
    return(
      <div class="container">
            {this.header()}
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
            {this.header()}
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
  // else if (this.state.operation === "Cc"){
  //   return(
  //     <div class="container">
  //           {this.header()}
  //           <div class="form-group">
  //             <label style={{color: "white"}} for="title">Creator Code:</label>
  //             <input onChange={e => this.updateInput("creatorCode", e.target.value)} type="text" class="form-control" id="title"></input>
  //           </div>
  //           <div class="form-group col-md-12 col-lg-12 col-xs-12">
  //               <button onClick={() => {this.props.setCcode(this.state.creatorCode), this.notify(this.state.operation), this.updateInput("operation", '')}} class="btn btn-primary btn-block">Apply</button> 
  //           </div>	
  //     </div>
  // )
  // }
  else if (this.state.operation === "orders"){
    return (
    <div class="container">
        {this.tableLeads()}
    </div>
    )
  }
  else if (this.state.operation === "passed"){
    return (
    <div class="container">
        {this.tableHistory()}
    </div>
    )
  }
    return (
        <div class="container">
              <br/><br/>
              <div class="newsBody col-md-12 col-lg-12 col-xs-12">
                <h1 style={{fontFamily: "impact", color: "white", textAlign: "center"}}> <img style ={{width: 150, height: 130}} src={adminicon} alt=""></img> Admin Dashboard </h1>
              </div>

              {/* Tickets */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "Cc")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-pencil"></span> - Set Creator Code</h3>
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
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "passed"), this.getOrdersHistory()}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-align-justify"></span> - All Orders</h3>
              </div>
              {/* User Check */}
              <div class="col-md-12 col-lg-12 col-xs-12">
                <h3 class="adminBody" onClick={()=>{this.updateInput("operation", "checkuser")}} style={{textAlign: "center", cursor: 'pointer'}}><span class="glyphicon glyphicon-search"></span> - User Check</h3>
              </div>

        </div>
)

}    

render(){
  if (!this.props.loginData.isAdmin){
    return (
      <div class ="GG-BG">
        <br/><br/><br/>
        <div class="container">
          <div class="ProfileBGW" style={{color: "white"}}>
            <h1>401 (Unauthorized Access)</h1>
            <p> You don't have permission to view this page</p>
          </div>
        </div>
        <Getlogin />
      </div>
  )
  }
else {
  return (
    <div className="admin-bg">
      <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange={false}
            draggable={false}
            pauseOnHover={false}
      />
      <Getlogin page={"Admin"}/>
      {this.renderPage()}
    </div>
  )}
}
}

function mapStateToProps(state){
  return {
      loginData: state.loginSession,
      server: state.server
  }
}

export default connect(mapStateToProps)(Admindashboard);