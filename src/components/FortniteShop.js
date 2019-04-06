import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import axios from 'axios';
import Navbar from './navbar';
import moment from 'moment';
import ReactRouter from 'flux-react-router';
import {connect} from 'react-redux';

class FortniteShop extends Component {

  state ={
    loaded: false,
    loaded2: false,
    shop: [],
    shopRows: '',
    shopDate: '',
    ShopChoseItem: '',
    ShopChoseItemId: '',
    ShopChoseItemImg: '',
    ShopChosenImg: '',
    ItemFontColor: '',
    vbucksIcon: '',
    timeLeft: '',
    ShopChose: false
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    componentDidMount(){
        this.interval = setInterval(() => this.tick(), 1000);
        this.getData(); 
    }
    
    updateState(key, value) {
      this.setState({ [key]: value });
    }
    
    getImage = (image) =>{
      if(image.img1){
        this.setState({ShopChosenImg: image.img1})
      }
      else if (image.img2){
        this.setState({ShopChosenImg: image.img2})
      }
      else if (image.img3){
        this.setState({ShopChosenImg: image.img3})
      }
    }
    
    getSingleItem = (name, type) =>{
        axios.get(`https://fnbr.co/api/images/`, 
        {
          headers: { 'x-api-key': 'b4d7cae7-7047-4a17-83f6-b4e62091d328'},
          params: { 'search': name, 'type': type}
        }
      )
        .then(response => {
          var data = response.data.data[0]
          let object = {
            name: data.name,
            cost: data.price,
            rarity: data.rarity,
            desc: data.description,
            type: data.type
          }
          let imgs = {
            img1: data.images.png,
            img2: data.images.featured,
            img3: data.images.icon
          }
          this.setState({ShopChoseItem: object, loaded2: true, ShopChoseItemImg: imgs})
          this.getFontColor(this.state.ShopChoseItem.rarity)
          this.getImage(this.state.ShopChoseItemImg)
          console.log(response)
        })
        .catch(e => {
          console.log('ErrorFFFFF: ', e.response)
      })

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
    
    tick() {
      const currentDate = moment();
      const future = moment("00:00 AM", ["h:mm A"]);
      let timeCount = moment(future.diff(currentDate))

      this.setState({timeLeft: timeCount - 1000})
    }

    RenderPage = () => {
      if(this.state.loaded){
        if(this.state.ShopChose === false){
        let array = [];
        for (var i = 0; i < this.state.shopRows; i++) {
          array.push(i)
        } 
        

        let images = array.map(image => {
          var rarity = "card splash-card FortHover rarity-"+this.state.shop[image].rarity
          return (
            <div class="col-md-3 col-md-6" key={image} >
            <div class ={rarity}>
              <img class="FortShop" 
              onClick={()=>{
                this.getSingleItem(this.state.shop[image].name, this.state.shop[image].type),
                this.updateState("ShopChose", true)}} 
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
    <div class="container">
    <br/>          <br/>               <br/>   
        <div class="col-md-6 col-md-6">
          <h1 class="badge badge-dark">Current Shop Rotation: {moment(this.state.shopDate).format('MMMM Do YYYY')}</h1>
        </div>
        <div class="col-md-6 col-md-6">
        <h1 class="badge2 badge-dark">New Items In {moment(this.state.timeLeft).format("HH")}Hour(s) - {moment(this.state.timeLeft).format("mm")}Minute(s) - {moment(this.state.timeLeft).format("ss")}Second(s) </h1>
        </div>
        {images}
    </div>
    )
    }
    else if(this.state.ShopChose === true){
    var rarity = "card splash-card2 rarity-"+this.state.ShopChoseItem.rarity

    return (
    
    <div>
    <div className="bg-image">
    <br/>    <br/>    <br/>

      <div class="col-xs-6 col-md-3 col-lg-3">
          <h1 class="badge badge-dark" style={{color : this.state.ItemFontColor}}>{this.state.ShopChoseItem.name}</h1>
      </div>
      <div class="col-xs-6 col-md-3 col-lg-3">
          <h1 class="badge badge-dark" style={{color : "white"}}>Price: {this.state.ShopChoseItem.cost}
          <img src={this.state.vbucksIcon} alt="V-Bucks"
           style={{width: 20, height: 20}}></img>
          </h1>
      </div>

      <div class="col-xs-6 col-md-3 col-lg-3">
          <h1 class="badge badge-dark" style={{textTransform: 'uppercase', color : this.state.ItemFontColor}}>{this.state.ShopChoseItem.rarity} {this.state.ShopChoseItem.type}</h1>
      </div>

      <div class="col-xs-6 col-md-3 col-lg-3">
          <button class="badge-dark btn btn-primary" onClick={()=> {this.updateState("ShopChose", false), this.updateState("ItemStored", false)}}>
             Back To Shop
          </button>
      </div>


    <div class="col-xs-12 col-md-12 col-lg-12">

    <div class="col-xs-12 col-md-6 col-lg-6">
    <div class ={rarity}>
    <img src={this.state.ShopChosenImg} style={{width: 400, height: 400}} alt=""/>
    <div class="card-image-overlay">
        <div id ="itemdesc" class="card-body">
            <h4 class ="card-title itemname" style = {{color: "white", fontSize: 25, fontWeight: 300, fontFamily: "impact", lineHeight: 2.5}}>
            <span>{this.state.ShopChoseItem.desc}</span>
            </h4>
        </div>
    </div>
    </div>
    </div>

    <div class="col-xs-12 col-md-6 col-lg-6">
    <div class ={rarity}>
    <img onClick={()=>{ReactRouter.goTo("/games")}} src={this.state.vbucksIcon} style={{cursor: 'pointer', width: 400, height: 400, }} alt=""/>
    <div class="card-image-overlay">
        <div id ="itemdesc" class="card-body">
            <h4 class ="card-title itemname" style = {{color: "white", fontSize: 25, fontWeight: 300, fontFamily: "impact", lineHeight: 2.5}}>
            <span>Buy V-BUCKS</span>
            </h4>
        </div>
    </div>
    </div>
    </div>

    </div>
    </div>

    </div>
    
      )
    }
    }
    }

  render() {
    return (

<div className="bg-image">


{this.RenderPage()}
<Navbar page={"FortniteShop"}/>

</div>

    );
  }
}

function mapStateToProps(state){
  return {
      fnCode: state.fnCode
  }
}

export default connect(mapStateToProps)(FortniteShop);