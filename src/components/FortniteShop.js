import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import axios from 'axios';
import Getlogin from './navbar';
import moment from 'moment';

class FortniteShop extends Component {


state ={
loaded: false,
shop: [],
shopRows: '',
shopDate: '',
ShopChoseItem: '',
ShopChoseItemId: '',
ItemFontColor: '',
vbucksIcon: '',
ShopChoseItemData: [],
ItemStored: false,
ShopChose: false
}

componentDidMount(){
    this.getData(); 
}
updateState(key, value) {
  this.setState({ [key]: value });
}

getData=() =>{
  if (!this.state.loaded) {
  axios.get('https://fortnite-public-api.theapinetwork.com/prod09/store/get')
  .then(response => {
    var arr = []
    var shop = response.data.items.forEach(element => {
         let object = {
          name: element.name,
          id: element.itemid,
          img: element.item.images.information
        }
        arr.push(object)
      });
      this.setState({shopRows: response.data.rows, shop: arr, loaded: true, shopDate: response.data.date, vbucksIcon: response.data.vbucks})
  })
  .catch(e => {
      console.log('Error: ', e.response)
  })
}
}

getSingleItem=(id) =>{
  if(this.state.ItemStored === false) {
  axios.get(`https://fortnite-public-api.theapinetwork.com/prod09/item/get?ids=${id}`)
  .then(response => {
      let object = {
        cost: response.data.cost,
        desc: response.data.description,
        img: response.data.images.background,
        type: response.data.type,
        rarity: response.data.rarity
      }
      this.setState({ShopChoseItemData: object, ItemStored: true})
      this.getFontColor(this.state.ShopChoseItemData.rarity)
      console.log(response)
  })
  .catch(e => {
      console.log('ErrorSingleItem: ', e.response)
  })
}
}

getFontColor = (rarity) => {
  var color;
  switch(rarity) {
    case "epic":
      color = "purple"
      break;
    case "rare":
      color = "aqua"
      break;
    case "uncommon":
      color = "green"
      break;
    case "legendary":
      color = "orange"
      break;
    default:
  }
  this.setState({ItemFontColor: color})
}

RenderPage = () => {

    const currentDate = moment();
    const future = moment("00:00 AM", ["h:mm A"]);
    const timeLeftH = moment(future.diff(currentDate)).format("HH");
    const timeLeftM = moment(future.diff(currentDate)).format("mm");

  if(this.state.loaded){
    if(this.state.ShopChose === false){
    let array = [];
    for (var i = 0; i < this.state.shopRows; i++) {
      array.push(i)
    } 

    let images = array.map(image => {
      return (
          <img class="FortShop" onClick={()=>{
          this.updateState("ShopChose", true), 
          this.updateState("ShopChoseItem", this.state.shop[image].name), 
          this.updateState("ShopChoseItemId", this.state.shop[image].id),
          this.getSingleItem(this.state.shop[image].id)}} 
          key={image} 
          src={this.state.shop[image].img} style={{cursor: 'pointer', width: 200, height: 200, margin: 5, WebkitTransform: 'translate(0%, 35%)'}} alt={this.state.shop[image].name}/>
        )
     });
  return( 
<div >
<div className="bg-image">
<div class="col-xs-6">
<h1 class="badge badge-dark">Current Shop Rotation: {this.state.shopDate}</h1>
</div>
<div class="col-xs-6">
<h1 class="badge2 badge-dark">New Items In: {timeLeftH}Hour(s) {timeLeftM}Minute(s)</h1>
</div>
<div class="col-xs-12">
{images}
</div>
</div>

</div>
)
}
else if(this.state.ShopChose === true){
return (

<div>
<div className="bg-image">
<div class="col-xs-12">
<h1 class="badge badge-dark col-xs-4" style={{color : this.state.ItemFontColor}}>{this.state.ShopChoseItem}</h1>

<h1 class="badge badge-dark col-xs-2" style={{margin: 20, color : "white"}}>Price: {this.state.ShopChoseItemData.cost}
<img src={this.state.vbucksIcon} alt="V-Bucks"
style={{float: "right",width: 20, height: 20, marginTop: 5, WebkitTransform: 'translate(0%, 35%)'}}></img>
</h1>
<h1 class="badge badge-dark col-xs-3" style={{color : this.state.ItemFontColor}}>{this.state.ShopChoseItemData.rarity} {this.state.ShopChoseItemData.type}</h1>

<button class="badge badge-dark2 btn btn-primary col-xs-2" style={{float: "right",margin: 15,color : "red"}} onClick={()=> {this.updateState("ShopChose", false), this.updateState("ItemStored", false)}}>
Back To Shop
</button>
</div>

<div class="col-xs-6">
<img src={this.state.ShopChoseItemData.img} style={{width: 440, height: 400, marginTop: -60, WebkitTransform: 'translate(0%, 35%)'}} alt=""/>
</div>
</div>
</div>

  )
}
}
}

  render() {
    return (


<div>
<Getlogin />


{this.RenderPage()}
</div>

    );
  }
}


export default FortniteShop;
        


