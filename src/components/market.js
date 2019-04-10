import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCartItem, updateCartInfo, addPrev, updatePrev} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 
import ReactTooltip from 'react-tooltip'
import '../Mycss.css';
import '../games.css';
import '../Respcss.css';
import Navbar from './navbar';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import ReactRouter from 'flux-react-router';
import StarRatings from 'react-star-ratings';
import {
    BrowserView,
    MobileView,
  } from "react-device-detect";

class Market extends Component {

state = {
    category: "all",
    condition: "new",
    sort: "",
    view: "shop",
    options: "",
    quantity: 1
}

notify = (msg) => toast.success(msg, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
});

updateInput(key, value) {
    this.setState({ [key]: value });
}

LoopIMGS(){
    let outPut = []
    var prev = this.props.cart.itemPrev
    const ConvertedIMGS = Object.values(prev.img)
    for (const img of ConvertedIMGS) {
        outPut.push( <div key={img} onClick={()=>{this.props.updatePrev(img, 'img')}} style={{cursor: "pointer", margin: 10}} class="col-xs-3 col-md-2 col-lg-2">
            <div class ={prev.defaultImage === img ? "cardItemPrevSmall-active" : "cardItemPrevSmall"}>
                <img class="splash-card-product-view" src={img} style={{cursor: "pointer", maxHeight: 53}}/>
            </div>
        </div>)
}
    return outPut
}

updateInfo (data){
    var discounted = data.discount / 100 * data.price
    let object = {
        price: data.discount > 0 ? data.price - discounted : data.price,
        items: this.state.quantity
     }
    this.props.updateCartInfo(object, 'add')
}


addItemToArray(item){
    const uniqueId = item.Name+`-${this.props.cart.itemPrev.color}`
    var discounted = item.discount / 100 * item.price

    let object = {
        id: uniqueId,
        Name: item.Name,
        price: item.discount > 0 ? item.price - discounted : item.price,
        img: item.defaultImage,
        rarity: item.rarity,
        info: item.info,
        color: this.props.cart.itemPrev.color,
        size: this.props.cart.itemPrev.size,
        quantity: this.state.quantity
     }
     this.props.addCartItem(object)
}

addItemToPrev(item){
    let object = {
        id: item.id,
        Name: item.Name,
        price: item.price,
        color: item.colors && item.colors[0],
        size: item.sizes && item.sizes[0],
        desc: item.desc,
        discount: item.discount,
        img: item.img,
        defaultImage: item.defaultImage,
        sizes: item.sizes,
        options: item.options,
        defaultOpt: item.defaultOpt,
        colors: item.colors
     }
     this.props.addPrev(object)
}

Market(){
if (this.state.view === "shop"){
    let shop = this.props.shop.items.map((item) =>{
        var discounted = item.discount / 100 * item.price
        var rarity = "card splash-cardTees rarity-"+item.rarity
        var randomImg = function (obj) {
            var keys = Object.keys(obj)
            return obj[keys[ keys.length * Math.random() << 0]];
        };
        var shopRandomize = randomImg(item.img)
        return (
            <div class="col-xs-12 col-md-4 col-md-4" key={item}>
            <div class ={rarity}>
                <img class="splash-card-product-view-constant" src={item.img[0]} alt={item.id}/>
            
                <div class="overlayHover" onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}}>
                    <button class="btn btn-primary btn-block" onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}} style={{color : "white"}}>
                            View
                    </button>
                   {item.price > 0 &&
                     <div id ="merchPrice" class="card-body">
                        <span style={{fontSize: 15, lineHeight: 2.5}} class={item.discount > 0 ? "label label-success" : "label label-default"} >{item.discount > 0 ? "" : item.price} {item.discount > 0 ? item.price - discounted : ""} {this.props.lang.lang === "EN" ? "EGP" :  "ج.م"}</span>
                    </div>}
                    {item.discount > 0 && 
                    <div id ="merchDiscount" class="card-body">
                        <span style={{fontSize: 15, lineHeight: 2.5}} class="label label-danger">{item.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
                    </div> 
                    }
                </div>

            </div>
            <div class="marketInfoBox">
                <p style={{fontSize: 17, fontWeight: "bold"}}>{item.Name}</p>
                {item.price > 400 && <p style={{float: "left"}}>FREE Shipping</p>}
                <p style={{float: "right"}}>Soldby: <span onClick={()=>{ReactRouter.goTo("/main")}} style={{cursor: "pointer", color: "purple"}}>{item.soldBy}</span></p>
            </div>
        </div>
        )
    })
    return (
        <div>

            {/* <div class="col-xs-12 col-md-12 col-lg-12" style={{backgroundColor: "#222222", borderBottom: "1px solid black"}}>
                <div class="form-group has-feedback">
                        <div class="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <input style={{margin: 10}} class="form-control" type="text" placeholder="Search Store" required></input>
                        </div>
                </div>
            </div> */}
            <div class="row">
                <div class="col-xs-12 col-md-2 col-lg-2" style={{backgroundColor: "#222222", marginTop: 10, borderRadius: 3}}>
                    <h2 style={{color: "grey", textAlign: "center"}}>Category</h2>
                        <h5 onClick={()=>{this.setState({category: "all"})}} style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "all" && "purple"}}>All (16)</h5>
                        <h5 onClick={()=>{this.setState({category: "merch"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "merch" && "purple"}}><span class="svg-icon svg-icon-tshirt"></span> Merchandise (14)</h5>
                        <h5 onClick={()=>{this.setState({category: "gaming"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "gaming" && "purple"}}><span class="svg-icon svg-icon-keyboard"></span> Gaming Accessories (2)</h5>
                        <h5 onClick={()=>{this.setState({category: "consoles"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "consoles" && "purple"}}><span class="svg-icon svg-icon-psController"></span> Playstation (0)</h5>
                        <h5 onClick={()=>{this.setState({category: "pc"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "pc" && "purple"}}><span class="svg-icon svg-icon-pc"></span> PC (0)</h5>
                        <h5 onClick={()=>{this.setState({category: "laptop"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "laptop" && "purple"}}><span class="svg-icon svg-icon-laptop"></span> Laptop (0)</h5>
                    <div style={{border: "0.5px dotted grey"}}/>
                    <h2 style={{color: "grey", textAlign: "center"}}>Condition</h2>
                        <h5 style={{color: "white", textAlign: "center"}}><span class="	glyphicon glyphicon-star"></span> New (16)</h5>
                        <h5 style={{color: "white", textAlign: "center"}}><span class="	glyphicon glyphicon-repeat"></span> Used (0)</h5>
                    <div style={{border: "0.5px dotted grey"}}/>
                    <h2 style={{color: "grey", textAlign: "center"}}>Sort By</h2>
                        <h5 style={{color: "white", textAlign: "center"}}><span class="glyphicon glyphicon-arrow-down"></span> Price from Low to High</h5>
                        <h5 style={{color: "white", textAlign: "center"}}><span class="glyphicon glyphicon-arrow-up"></span> Price from High to Low</h5>
                        <h5 style={{color: "white", textAlign: "center"}}><span class="glyphicon glyphicon-scissors"></span> Has Discount (3)</h5>
                </div>

                    {shop}

            </div>
        </div>
    )
    }
}

ViewProduct(){

if (this.state.view === "item"){

    var prev = this.props.cart.itemPrev
    var discounted = prev.discount / 100 * prev.price
    return (
    <div class="container">
        <div class="BlackBG">
        
         <div class="col-xs-12 col-md-8 col-lg-8">
            {prev.img.length > 1 && this.LoopIMGS()}
        </div>
        
        <div class="col-xs-12 col-md-2 col-lg-2">
                <div onClick={()=>{this.updateInput("view", "Cart"), this.updateInput("cartDirect", "prev")}} class="badge-dark" data-tip="Click to view your cart" style={{cursor: "pointer"}}>
                    <p style={{textAlign: "center", fontSize: 25, paddingBottom: 7}}> <span className="glyphicon glyphicon-shopping-cart"> <span class="circleRed" style={{color: "white", fontSize: 20}}> {this.props.cartInfo.totalItems}</span></span> </p>
                </div>
        </div>

         <div class="col-xs-12 col-md-6 col-lg-6">
            <div class ="cardItemPrev">
               <img class="splash-card-product-view" src={prev.defaultImage} alt={prev.id}/>
               {prev.discount > 0 && <div id ="merchDiscount" class="card-body">
                    <span style={{fontSize: 15, lineHeight: 2.5}} class="label label-danger">{prev.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
               </div> }
            </div>
         </div>
         <div class="col-xs-6 col-md-3 col-lg-3">
                    <button class="btn btn-danger btn-block" style={{color : "white"}} onClick={()=>{this.setState({view: "shop"})}}>
                        <span className="icon glyphicon glyphicon-arrow-left"></span>
                        <span className="text">Back to shop</span>
                    </button>
                </div>
            <div class="col-xs-6 col-md-3 col-lg-3">
                <button class="btn btn-primary btn-block" style={{color : "white"}} onClick={()=>{this.addItemToArray(prev), this.updateInfo(prev), this.notify(`${prev.Name} added to cart`)}}>
                    <span className="icon glyphicon glyphicon-shopping-cart"></span>
                    <span className="text">Add to cart</span>
                </button>
            </div>
         <div style={{color: "white", fontSize: 15}} class="col-xs-12 col-md-6 col-lg-6">
               <h1 style={{color: "white", textAlign: "center"}}>{prev.Name}</h1>
              {prev.price > 0 && 
                  <h2>
                    <span style={{textDecoration: prev.discount > 0 ? "line-through" : ""}} class={prev.discount > 0 ? "label label-danger" : "label label-primary"}>{prev.price} {this.props.lang.lang === "EN" ? "EGP" : "ج.م"}</span>
                  </h2>
               }
               {prev.discount > 0 &&
                    <h2>
                        <span class="label label-primary">{prev.price - discounted} {this.props.lang.lang === "EN" ? "EGP" : "ج.م"}</span>
                    </h2>
                }
               <br/>
              {prev.sizes && 
                    <div>
                        <div class="col-xs-4 col-md-4 col-lg-4">
                            <h4>Size:</h4>
                        </div>
                        <div class="col-xs-8 col-md-8 col-lg-8">
                            <select class="form-control" id="size" style={{color: "blue", fontWeight: "bold"}} value={prev.size} onChange={e => this.props.updatePrev(e.target.value, 'size')}>
                                {prev.sizes.map((sizes) =>{
                                        return(
                                            <option>
                                                {sizes}
                                            </option>
                                            )
                                    })}
                            </select>
                            <br/>
                        </div>
                    </div>} 

                {prev.colors && 
                <div>
                    <div class="col-xs-4 col-md-4 col-lg-4">
                        <h4>Color:</h4>
                    </div>
                    <div class="col-xs-8 col-md-8 col-lg-8">
                        <select class="form-control" id="color" style={{color: "blue", fontWeight: "bold"}} value={prev.color} onChange={e => this.props.updatePrev(e.target.value, 'color')}>
                            {prev.colors.map((colors) =>{
                                    return(
                                        <option>
                                            {colors}
                                        </option>
                                        )
                                })}
                        </select>
                        <br/>
                    </div>
                </div>} 

                {prev.options && 
                <div>
                    <div class="col-xs-4 col-md-4 col-lg-4">
                        <h4>Options:</h4>
                    </div>
                    <div class="col-xs-8 col-md-8 col-lg-8">
                            <select class="form-control" id={prev.price} style={{color: "blue", fontWeight: "bold"}} value={prev.defaultOpt} onChange={e => {this.props.updatePrev(e.target.value, 'option')}}>
                            
                            {prev.options.map((options) =>{
                                    return(
                                        <option>
                                            {options}
                                        </option>
                                        )
                                })}
                        </select>
                        <br/>
                    </div>
                </div>} 

                <div class="col-xs-12 col-md-12 col-lg-12">
                    {this.props.lang.lang === "EN" ?  
                        <h2><strong style={{textDecoration: "underline"}}>Free shipping</strong> on orders over 300 EGP</h2>
                    :  <h2 style={{textAlign: "right"}}><strong style={{textDecoration: "underline"}}>شحن مجانى</strong> على الطلبات 300 جنيه و اكثر</h2>
                    }
                </div>
               <br/>
               <div class="col-xs-12 col-md-12 col-lg-12">
               <h1 style={{textAlign: "center"}}>Product details</h1> { prev.desc.split(",").map(place => <p> • {place} </p>)} {prev.color && <p>• Color: {prev.color.toUpperCase()}</p>} {prev.size && <p>• Size: {prev.size.toUpperCase()}</p>}
               </div>
               <br/>
         </div>
        <ReactTooltip place="bottom" type="dark" effect="solid"/>
      </div>
    </div>
    )
}
}

render(){
    return(
        <div class="bg-image"> 
                {this.Market()}
                {this.ViewProduct()}
            <Navbar page={"Offers"}/>
        </div>
    );
}

}

function mapStateToProps(state){
    return {
        cart: state.cartItems,
        shop: state.shop,
        loginData: state.loginSession,
        server: state.server,
        cartInfo: state.updateCartInfo,
        lang: state.lang
    }
  }
  
const matchDispatchToProps = dispatch => bindActionCreators(
    {
        addCartItem,
        updateCartInfo,
        addPrev,
        updatePrev
    },
    dispatch,
)


  export default connect(mapStateToProps, matchDispatchToProps)(Market);
  


