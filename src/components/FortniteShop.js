import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import axios from 'axios';
import Getlogin from './navbar';
import moment from 'moment';

class FortniteShop extends Component {


state ={
df: '',
shop: [],
shopRows: '',
nextShop: '',
}

componentDidMount(){
    this.getData(); 
}
updateState(key, value) {
  this.setState({ [key]: value });
}

getData=() =>{
  if (!this.state.df) {
  axios.get('https://fortnite-public-api.theapinetwork.com/prod09/store/get')
  .then(response => {
    var arr = []
    var shop = response.data.items.forEach(element => {
         let object = {
          name: element.name,
          cost: element.cost,
          img: element.item.images.information
        }
        arr.push(object)
      });
      this.setState({shopRows: response.data.rows})
      this.setState({shop: arr})
      this.setState({df: "test"})
      console.log(this.state.shopRows)
  })
  .catch(e => {
      console.log('Error: ', e.response)
  })
}
}

RenderPage = () => {
    const currentDate = moment();
    const future = moment("00:00 AM", ["h:mm A"]);
    const timeLeftH = moment(future.diff(currentDate)).format("HH");
    const timeLeftM = moment(future.diff(currentDate)).format("mm");

  if(this.state.df){
  return(
<div>
<div class="col-xs-6">
<h1 class="badge badge-dark">Current Shop Rotation: {moment().format('LL')}</h1>
</div>
<div class="col-xs-6">
<h1 class="badge2 badge-dark">New Items In: {timeLeftH}Hour(s) {timeLeftM}Minute(s)</h1>
</div>
<div class="col-xs-12">
<img src={this.state.shop[0].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[1].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[2].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[3].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[4].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[5].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[6].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[7].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[8].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[9].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
<img src={this.state.shop[10].img} style={{width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt=""></img>
</div>
</div>
)
}
}

  render() {

    return (


<div>

<Getlogin />
<div className="bg-image">

{this.RenderPage()}

</div>
</div>
    );
  }
}


export default FortniteShop;
        


