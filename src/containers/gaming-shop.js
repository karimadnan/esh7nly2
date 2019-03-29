import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addCartItem, updateCartInfo, addPrev, updatePrev} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip'
import CartDetails from '../containers/cart-details';
import ReactRouter from 'flux-react-router';
import '../Mycss.css';
import '../games.css';
import '../Respcss.css';

class GamingShop extends Component {

    state = {
        quantity: 1,
        view: 'shop',
        category: 'all',
        selectedCategory: '',
        cartDirect: '',
    }

    updateInput(key, value) {
        this.setState({ [key]: value });
    }
    handleChange(type, value) {
        this.setState({[type]: value}, () =>{
        });
      }
    notify = (id) => toast.success(`${id} added to cart!`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
    });
    
    addItemToArray(item){
        const uniqueId = item.Name+`-${this.props.cart.itemPrev.color}`
        var discounted = item.discount / 100 * item.price

        let object = {
            id: uniqueId,
            Name: item.Name,
            price: item.discount > 0 ? item.price - discounted : item.price,
            img: item.img,
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
            color: item.color,
            desc: item.desc,
            info: item.info,
            imgs: item.imgs,
            discount: item.discount,
            img: item.defaultImage
         }
         this.props.addPrev(object)
    }

    updateInfo (data){
        var discounted = data.discount / 100 * data.price
        let object = {
            price: data.discount > 0 ? data.price - discounted : data.price,
            items: this.state.quantity
         }
        this.props.updateCartInfo(object, 'add')
    }

    LoopIMGS(){
        let outPut = []
        var prev = this.props.cart.itemPrev
        const ConvertedIMGS = Object.values(prev.imgs)
        for (const img of ConvertedIMGS) {
            outPut.push( <div key={img} class="col-xs-3 col-md-2 col-lg-2">
                <div class ="cardItemPrevSmall splash-cardGamingViewSmall">
                    <img onClick={()=>{this.props.updatePrev(img, 'img')}} class="merchShop" src={img} style={{height: 50, width: 50, cursor: "pointer"}}/>
                </div>
            </div>)
    }
        return outPut
    }

    render(){
        if (this.state.view === 'shop'){
            let shop =  this.props.shop.map((item) =>{
                var discounted = item.discount / 100 * item.price
                var rarity = "card splash-cardGaming FortHover rarity-"+item.rarity
                return (
                    <div class="col-md-4 col-md-4" key={item.id} >
                    <div class ={rarity}>
                        <img class="merchShop"
                        onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}}
                        src={item.defaultImage}  style={{cursor: 'pointer'}} alt={item.id}/>
                       <div class="card-image-overlay">
                        <div id ="merchInfoGaming" class="card-body">
                            <h4 class ="card-title itemname" style = {{color: "white", fontSize: 25, fontFamily: "impact"}}>
                              <span>• {item.Name} •</span>
                            </h4>
                        </div>
                       </div>
                       <div id ="merchPrice" class="card-body">
                            <span style={{fontSize: 15, lineHeight: 2.5, color: "white", fontWeight: "bold"}} class="label label-default">{item.discount > 0 ? "" : item.price} {item.discount > 0 ? item.price - discounted : ""} {this.props.lang.lang === "EN" ? "EGP" : "ج.م"}</span>
                       </div>
                       {item.discount > 0 && <div id ="merchDiscount" class="card-body">
                            <span style={{fontSize: 15, lineHeight: 2.5}} class="label label-danger">{item.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
                       </div> }
                    </div>
                </div>
                )
            })
            return (
                <div>
                <br/> <br/> <br/> <br/>
                <div style={{padding: 5}} class="badge-dark col-xs-12 col-md-6 col-lg-6">
                    <div class="col-xs-3 col-md-2 col-lg-2">
                        <span style={{fontSize: 35, cursor: "pointer"}} onClick={()=>{ReactRouter.goTo("/market")}} data-tip="Back" class="glyphicon glyphicon-triangle-left"></span>
                    </div>
                    <div class="col-xs-3 col-md-2 col-lg-2">
                        <span style={{fontSize: 15, lineHeight: 2.6, cursor: "pointer"}}  class={this.state.category === "mouses" ? "menuLabel menuLabel-success" : "menuLabel menuLabel-primary"}><span class="svg-icon svg-icon-mouse"></span></span>
                    </div>
                    <div class="col-xs-3 col-md-2 col-lg-2">
                        <span style={{fontSize: 15, lineHeight: 2.6, cursor: "pointer"}}  class={this.state.category === "keyboards" ? "menuLabel menuLabel-success" : "menuLabel menuLabel-primary"}><span class="svg-icon svg-icon-keyboard"></span></span>
                    </div>
                    <div class="col-xs-3 col-md-2 col-lg-2">
                        <span style={{fontSize: 15, lineHeight: 2.6, cursor: "pointer"}}  class={this.state.category === "headset" ? "menuLabel menuLabel-success" : "menuLabel menuLabel-primary"}><span class="svg-icon svg-icon-headphones"></span></span>
                    </div>
                </div>
                <div style={{padding: 10, marginLeft: 10}} class="badge-dark col-xs-4 col-md-1 col-lg-1">
                &nbsp;<span style={{fontSize: 20, lineHeight: 1, cursor: "pointer"}} onClick={()=>{this.updateInput("view", "Cart"), this.updateInput("cartDirect", "shop")}} className="glyphicon glyphicon-shopping-cart"> <span class="label label-warning">{this.props.cartInfo.totalItems}</span></span>
                </div>
                <br/> <br/> <br/> <br/>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    {shop}
                </div>
                <ReactTooltip place="bottom" type="dark" effect="solid"/>
                </div>
            )
        }
        else if (this.state.view === 'item'){
            var prev = this.props.cart.itemPrev
            var discounted = prev.discount / 100 * prev.price


            return (
                <div class="merchBg2">
                <br/><br/><br/>
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <br/>
                    <div class="col-xs-12 col-md-5 col-lg-5">
                            <button class="btn btn-danger" style={{color : "white", width: 250}} onClick={()=>{this.updateInput("view", "shop")}}>
                                <span className="icon glyphicon glyphicon-arrow-left"></span>
                                <span className="text">Back to shop</span>
                            </button>
                        </div>
                    <div class="col-xs-12 col-md-5 col-lg-5">
                        <button class="btn btn-success" style={{color : "white", width: 250}} onClick={()=>{this.addItemToArray(prev), this.notify(prev.Name), this.updateInfo(prev), console.log(this.props.cart.cart)}}>
                            <span className="icon glyphicon glyphicon-shopping-cart"></span>
                            <span className="text">Add to cart</span>
                        </button>
                    </div>
                    <div class="col-xs-12 col-md-2 col-lg-2">
                        <div onClick={()=>{this.updateInput("view", "Cart"), this.updateInput("cartDirect", "prev")}} class="badge-dark" data-tip="Click to view your cart" style={{cursor: "pointer"}}>
                            <p style={{textAlign: "center", fontSize: 25, paddingBottom: 7}}> <span className="glyphicon glyphicon-shopping-cart">: <span class="label label-warning">{this.props.cartInfo.totalItems}</span></span> </p>
                        </div>
                    </div>
                 </div>
                 <div class="col-xs-12 col-md-8 col-lg-8">
                            {this.LoopIMGS()}
                </div>
                 <div class="col-xs-12 col-md-6 col-lg-6">
                    <div class ="cardItemPrev splash-cardGamingView">
                       <img class="merchShop" src={prev.img} alt={prev.id} style={{marginTop: 20}}/>
                       <div id ="merchInfoGaming" class="card-body">
                            <h4 class ="card-title itemname" style = {{color: "white", fontSize: 25, fontWeight: 300, fontFamily: "impact", lineHeight: 0.5}}>
                              <span>{prev.Name}</span>
                            </h4>
                        </div>
                       {prev.discount > 0 && <div id ="merchDiscount" class="card-body">
                            <span style={{fontSize: 15, lineHeight: 2.5}} class="label label-danger">{prev.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
                       </div> }
                    </div>
                 </div>
                 <div style={{color: "white", fontSize: 15}} class="col-xs-12 col-md-6 col-lg-6">
                       <h1><span style={{textDecoration: prev.discount > 0 ? "line-through" : ""}} class={prev.discount > 0 ? "label label-danger" : "label label-primary"}>{prev.price} {this.props.lang.lang === "EN" ? "EGP" : "ج.م"}</span></h1>{prev.discount > 0 ? <h1><span class="label label-primary">{prev.price - discounted} {this.props.lang.lang === "EN" ? "EGP" : "ج.م"}</span></h1> : <p/>}
                     {this.props.lang.lang === "EN" ?  
                         <h2><strong style={{textDecoration: "underline"}}>Free shipping</strong> on orders over 300 EGP</h2>
                      :  <h2 style={{textAlign: "right"}}><strong style={{textDecoration: "underline"}}>شحن مجانى</strong> على الطلبات 300 جنيه و اكثر</h2>
                     }
                       <br/>
                       <div class="bordersep"/>
                       <h1>Product details:</h1> { prev.desc.split(",").map(place => <p> • {place} </p>)} {prev.color ? <p>• Color: {prev.color.toUpperCase()}</p> : "" }
                       <br/>
                 </div>
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
                <ReactTooltip place="bottom" type="dark" effect="solid"/>
              </div>
            )
        }
        else if (this.state.view === "Cart"){
            return (
              <div class ="merchBg2">
                <br/><br/><br/>
                &nbsp;&nbsp;
              <div class="container">
              <div class="col-xs-12 col-md-6 col-lg-6">
                <button class="btn btn-danger" style={{color : "white", width: 270}} onClick={()=>
                    {
                        this.state.cartDirect === 'prev' ? 
                        this.updateInput("view", "item")
                        :
                        this.updateInput("view", "shop")
                    }
                    }>
                 <span className="icon glyphicon glyphicon-arrow-left"></span>
                 <span className="text">Back</span>
                </button>
              </div>
           { this.props.cart.cart.length > 0 && <div class="col-xs-12 col-md-6 col-lg-6">
                <button class="btn btn-success" style={{color : "white", width: 270}} onClick={()=>{ReactRouter.goTo("/checkout")}}>
                    <span className="icon glyphicon glyphicon-shopping-cart"></span>
                    <span className="text">Proceed to checkout</span>
                </button>
              </div> } 
              </div>
              <br/>
              <div class="bordersep"/>
                <CartDetails/>
              </div>
            )
          }
    }
}

function mapStateToProps(state){
    return {
        shop: state.shop.gGear,
        cart: state.cartItems,
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

export default connect(mapStateToProps, matchDispatchToProps)(GamingShop);