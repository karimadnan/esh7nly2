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
        axios.get('https://fnbr.co/api/shop', 
        {headers: { 'x-api-key': 'b4d7cae7-7047-4a17-83f6-b4e62091d328' }})
      .then(response => {
        var arr = []
        var dailydata = response.data.data.daily.forEach(element => {
             let object1 = {
              name: element.name,
              cost: element.price,
              img: element.images.icon,
              rarity: element.rarity,
              type: element.type
            }
            arr.push(object1)
          });
          var featureddata = response.data.data.featured.forEach(element => {
            let object2 = {
              name: element.name,
              cost: element.price,
              img: element.images.icon,
              rarity: element.rarity,
              type: element.type
           }
           arr.push(object2)
         });
         var rows = response.data.data.daily.length+response.data.data.featured.length
          this.setState({shopRows: rows, shop: arr, loaded: true, vbucksIcon: response.data.data.daily[0].priceIconLink, shopDate: response.data.data.date})
          console.log(response)
      })
      .catch(e => {
          console.log('Error: ', e.response)
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
          var rarity = "card splash-card FortHover rarity-"+this.state.shop[image].rarity
          return (
            <div class="col-md-2 col-md-6">
            <div class ={rarity}>
              <img class="FortShop" 
              key={image} 
              src={this.state.shop[image].img}  style={{cursor: 'pointer'}} alt={this.state.shop[image].name}/>
               <div class="card-image-overlay">
               <div id ="itemdesc" class="card-body">
               <h4 class ="card-title itemname" style = {{color: "white", fontSize: 15, fontWeight: 300, fontFamily: "impact", lineHeight: 0.5}}>
               <span>{this.state.shop[image].name}</span>
               </h4>
               <p class="card-text itemprice" style = {{color: "white", fontSize: 15, fontWeight: 300, fontFamily: "impact", lineHeight: 2.8}}>
               <img src={this.state.vbucksIcon} style ={{width: 20, height: 20}}/>
                {this.state.shop[image].cost}
               </p>
               </div>
               </div>
            </div>
            </div>

            )
         });
      return( 
    <div >
    <div className="bg-image">
    <div class="col-md-6 col-md-6">
    <h1 class="badge badge-dark">Current Shop Rotation: {moment(this.state.shopDate).format('MMMM Do YYYY')}</h1>
    </div>
    <div class="col-md-6 col-md-6">
    <h1 class="badge2 badge-dark">New Items In: {timeLeftH}Hour(s) {timeLeftM}Minute(s)</h1>
    </div>

    {images}

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
<div className="bg-image">
{this.RenderPage()}
</div>
</div>
    );
  }
}
export default FortniteShop;