import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addCartItem, updateCartInfo, addPrev, updatePrev} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip'
import CartDetails from '../containers/cart-details';
import ReactRouter from 'flux-react-router';
import {
    BrowserView,
    MobileView,
  } from "react-device-detect";
import '../Mycss.css';
import '../games.css';
import '../Respcss.css';
import amumu from '../Images/amumusad.png';
import fortniteDab from '../Images/fortnitedab.png';
import Modal from 'react-responsive-modal';

const ErrorStyle = {
overlay: {
    background: "transparent"
},
modal: {
    backgroundColor: 'rgba(219, 105, 105, 0.9)',
    color: "white",
    borderRadius: '10px',
},
}

const SuccessStyle = {
overlay: {
    background: "transparent"
},
modal: {
    backgroundColor: 'rgba(124, 214, 105, 0.9)',
    color: "white",
    borderRadius: '10px',
},
}

class MerchShop extends Component {

    state = {
        quantity: 1,
        view: 'shop',
        category: 'tshirts',
        selectedCategory: '',
        cartDirect: '',
        categoryOps: [
        {value: "tshirts", label: "Tshirts"},
        {value: "Hoodies", label: "Hoodies"}
        ],
        ErrorModal: false,
        ErrorMsg: '',
        SuccessModal: false,
        SuccessMsg: ''
    }

    updateInput(key, value) {
        this.setState({ [key]: value });
    }

    handleChange(type, value) {
        this.setState({[type]: value}, () =>{
        });
      }

    onOpenModal = (type) => {
    this.setState({[type]: true });
    };
    
    onCloseModal = (type) => {
    this.setState({[type]: false });
    };

    goToCheckout(){
        if(this.props.loginData.loggedState){
            ReactRouter.goTo("/checkout")
        }
        else{
            this.setState({ErrorModal: true, ErrorMsg: "Please login first to checkout"})
        }
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
        const uniqueId = item.Name+`-${this.props.cart.itemPrev.size}`+`-${this.props.cart.itemPrev.color}`
        var productImg;
        var discounted = item.discount / 100 * item.price

        switch(this.props.cart.itemPrev.color) {
            case "Black":
              productImg = item.img.black
              break;
            case "White":
            productImg = item.img.white
              break;
            case "Purple":
            productImg = item.img.purple
              break;
            case "Petroleum":
            productImg = item.img.petro
              break;
            default:
          }

        let object = {
            id: uniqueId,
            Name: item.Name,
            price: item.discount > 0 ? item.price - discounted : item.price,
            img: productImg,
            rarity: item.rarity,
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
            color: "Black",
            size: "Small",
            desc: item.desc,
            discount: item.discount,
            img: item.img,
            sizes: item.sizes,
            colors: item.colors
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

    render(){
        if (this.state.view === 'shop'){
            let shop =  this.props.shop.tshirts.map((item) =>{
                var discounted = item.discount / 100 * item.price
                var rarity = "card splash-cardTees FortHover rarity-"+item.rarity
                var randomImg = function (obj) {
                    var keys = Object.keys(obj)
                    return obj[keys[ keys.length * Math.random() << 0]];
                };
                var shopRandomize = randomImg(item.img)
                return (
                    <div class="col-md-4 col-md-4" key={item} >
                    <div class ={rarity}>
                        <img class="splash-card-product-view"
                        onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}}
                        src={item.img.black} style={{cursor: 'pointer'}} alt={item.id}/>
                       <div class="card-image-overlay">
                        <div id ="merchInfo" class="card-body">
                            <h4 class ="itemname" style = {{color: "white", fontSize: 20, fontFamily: "arial", fontWeight: "bold", lineHeight: 0.3}}>
                              <span>• {item.Name} •</span>
                            </h4>
                        </div>
                       </div>
                       <div id ="merchPrice" class="card-body">
                            <span style={{fontSize: 15, lineHeight: 2.5}} class={item.discount > 0 ? "label label-success" : "label label-default"} >{item.discount > 0 ? "" : item.price} {item.discount > 0 ? item.price - discounted : ""} {this.props.lang.lang === "EN" ? "EGP" : "ج.م"}</span>
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
                <br/>
                <div style={{padding: 5}} class="badge-dark col-xs-12 col-md-7 col-lg-7">
                    <div class="col-xs-1 col-md-1 col-lg-1">
                        <span style={{fontSize: 35, cursor: "pointer"}} onClick={()=>{ReactRouter.goTo("/market")}} data-tip="Back" class="glyphicon glyphicon-triangle-left"></span>
                    </div> 
                    <div class="col-xs-4 col-md-2 col-lg-2">
                        <span style={{fontSize: 15, lineHeight: 2.6, cursor: "pointer"}} class={this.state.category === "tshirts" ? "menuLabel menuLabel-success" : "menuLabel menuLabel-primary"}><span class="svg-icon svg-icon-tshirt"></span></span>
                    </div>
                    <div class="col-xs-4 col-md-2 col-lg-2">
                        <span style={{fontSize: 15, lineHeight: 2.6, cursor: "pointer"}} data-tip="Soon" class="menuLabel menuLabel-primary"><span class="svg-icon svg-icon-ak47"></span></span>
                    </div>
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
                <div class="BlackBG">


                {/* Product Options */}
                <div class="col-xs-12 col-md-12 col-lg-12">
                     <br/>
                   {prev.sizes && 
                    <div class="col-xs-6 col-md-3 col-lg-3">
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
                    </div>} 

                    {prev.colors && 
                    <div class="col-xs-6 col-md-3 col-lg-3">
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
                    </div>} 

                    <div class="col-xs-12 col-md-6 col-lg-6">
                        <div class="badge-dark" onClick={()=>{this.updateInput("view", "Cart"), this.updateInput("cartDirect", "prev")}} data-tip="Click to view your cart" style={{cursor: "pointer"}}>
                        <p style={{textAlign: "center", fontSize: 25, paddingBottom: 7, color: "white"}}> <span className="glyphicon glyphicon-shopping-cart"> <span class="circleRed" style={{color: "white", fontSize: 20}}> {this.props.cartInfo.totalItems}</span></span> </p>
                        </div>
                    </div>
                 </div>
                {/* Product Options END */}

                 <div class="col-xs-12 col-md-6 col-lg-6">

                    <div class ="cardItemPrev">

                       {prev.color === 'Black' && <img class="splash-card-product-view" src={prev.img.black} alt={prev.id}/>}
                       {prev.color === 'White' && <img class="splash-card-product-view" src={prev.img.white} alt={prev.id}/>}
                       {prev.color === 'Purple' && <img class="splash-card-product-view" src={prev.img.purple} alt={prev.id}/>}
                       {prev.color === 'Petroleum' && <img class="splash-card-product-view" src={prev.img.petro} alt={prev.id}/>}
                       {prev.color === 'n/f' && <img class="splash-card-product-view" src={prev.img} alt={prev.id}/>}
                       {prev.discount > 0 && <div id ="merchDiscount" class="card-body">
                            <span style={{fontSize: 15, lineHeight: 2.5}} class="label label-danger">{prev.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
                       </div> }
                    </div>
                 </div>

                <div class="col-xs-6 col-md-3 col-lg-3">
                    <button class="btn btn-danger btn-block" style={{color : "white"}} onClick={()=>{this.updateInput("view", "shop")}}>
                        <span className="icon glyphicon glyphicon-arrow-left"></span>
                        <span className="text">Back to shop</span>
                    </button>
                </div>
                <div class="col-xs-6 col-md-3 col-lg-3">
                    <button class="btn btn-primary btn-block" style={{color : "white"}} onClick={()=>{this.addItemToArray(prev), this.notify(prev.Name), this.updateInfo(prev), console.log(this.props.cart.cart)}}>
                        <span className="icon glyphicon glyphicon-shopping-cart"></span>
                        <span className="text">Add to cart</span>
                    </button>
                </div>

                 <div style={{color: "white", fontSize: 15}} class="col-xs-12 col-md-6 col-lg-6">
                       <h1 style={{color: "white", textAlign: "center"}}>• {prev.Name} •</h1>
                       <h1><span style={{textDecoration: prev.discount > 0 ? "line-through" : ""}} class={prev.discount > 0 ? "label label-danger" : "label label-primary"}>{prev.price} {this.props.lang.lang === "EN" ? "EGP" : "ج.م"}</span></h1>{prev.discount > 0 ? <h1><span class="label label-primary">{prev.price - discounted} {this.props.lang.lang === "EN" ? "EGP" : "ج.م"}</span></h1> : <p/>}
                {this.props.lang.lang === "EN" ?  
                        <h2><strong style={{textDecoration: "underline"}}>Free shipping</strong> on orders over 300 EGP</h2>
                    :  
                        <h2 style={{textAlign: "right"}}><strong style={{textDecoration: "underline"}}>شحن مجانى</strong> على الطلبات 300 جنيه و اكثر</h2>
                }
                       <br/>
                       <div class="bordersep"/>
                       <h1>Product details:</h1>{prev.desc.split(",").map(place => <p> • {place} </p>)}<p>• Color: {prev.color.toUpperCase()} .</p> <p>• Size: {prev.size.toUpperCase()} .</p>

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
              <div class ="BlackBG">
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
                <button class="btn btn-success" style={{color : "white", width: 270}} onClick={()=>{this.goToCheckout()}}>
                    <span className="icon glyphicon glyphicon-shopping-cart"></span>
                    <span className="text">Proceed to checkout</span>
                </button>
              </div> } 
              </div>
              <br/>
              <div class="bordersep"/>
              <Modal open={this.state.SuccessModal} onClose={this.onCloseModal.bind(this,'SuccessModal')} center
                    styles={SuccessStyle}>
                    <h3 class="col-xs-6">{this.state.SuccessMsg}</h3>
                    <img style ={{width: 150, height: 120}} class="col-xs-6" src={fortniteDab} alt=""></img>
                </Modal>
                <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
                    styles={ErrorStyle}>
                    <h3 class="col-xs-6">{this.state.ErrorMsg}</h3>
                    <img style ={{width: 150, height: 120}} class="col-xs-6" src={amumu} alt=""></img> 
                </Modal>
                <CartDetails/>
              </div>
            )
          }
    }
}

function mapStateToProps(state){
    return {
        shop: state.shop,
        cart: state.cartItems,
        cartInfo: state.updateCartInfo,
        loginData: state.loginSession,
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

export default connect(mapStateToProps, matchDispatchToProps)(MerchShop);