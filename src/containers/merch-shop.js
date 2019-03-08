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
        const uniqueId = item.id+`-${this.props.cart.itemPrev.size}`+`-${this.props.cart.itemPrev.color}`
        var productImg;
        var discounted = item.discount / 100 * item.price

        switch(this.props.cart.itemPrev.color) {
            case "black":
              productImg = item.img.black
              break;
            case "white":
            productImg = item.img.white
              break;
            case "purple":
            productImg = item.img.purple
              break;
            case "petroleum":
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
            color: item.defaultColor,
            size: item.defaultSize,
            desc: item.desc,
            discount: item.discount,
            img: item.img
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
    
                return (
                    <div class="col-md-4 col-md-4" key={item.id} >
                    <div class ={rarity}>
                        <img class="merchShop"
                        onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}}
                        src={item.img.black}  style={{cursor: 'pointer'}} alt={item.id}/>
                       <div class="card-image-overlay">
                        <div id ="merchInfo" class="card-body">
                            <h4 class ="card-title itemname" style = {{color: "white", fontSize: 25, fontFamily: "impact", lineHeight: 0.3}}>
                              <span>• {item.Name} •</span>
                            </h4>
                        </div>
                       </div>
                       <div id ="merchPrice" class="card-body">
                            <span style={{fontSize: 15, lineHeight: 2.5}} class="label label-default">{item.discount > 0 ? "" : item.price} {item.discount > 0 ? item.price - discounted : ""} {this.props.lang.lang === "EN" ? "EGP" : "ج.م"}</span>
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
                        <span style={{fontSize: 15, lineHeight: 2.6, cursor: "pointer"}} class={this.state.category === "tshirts" ? "menuLabel-success" : "menuLabel-primary"}>T-shirts</span>
                    </div>
                    <div class="col-xs-4 col-md-2 col-lg-2">
                        <span style={{fontSize: 15, lineHeight: 2.6, cursor: "pointer"}} data-tip="Soon" class="menuLabel-primary">Accessories</span>
                    </div>
                    <div class="col-xs-4 col-md-offset-2 col-lg-offset-2">
                         <span style={{fontSize: 20, lineHeight: 1.6, cursor: "pointer"}} onClick={()=>{this.updateInput("view", "Cart"), this.updateInput("cartDirect", "shop")}} className="glyphicon glyphicon-shopping-cart"> <span class="label label-warning">{this.props.cartInfo.totalItems}</span></span>
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
                <div class="merchBg2">
                <div class="col-xs-12 col-md-12 col-lg-12">
                     <br/>
                   {prev.size !== 'n/f' && <div class="col-xs-12 col-md-5 col-lg-5">
                        <div style={{fontSize: 20, padding: 10}} class="badge-dark">
                            <span style={{fontWeight: "bold"}}>Size: </span>
                            <button type="button" onClick={()=>{this.props.updatePrev('small', 'size')}} class={prev.size === "small" ? 'btn btn-success btn-xs' : 'btn btn-primary btn-xs'}>Small</button>&nbsp;
                            <button type="button" onClick={()=>{this.props.updatePrev('medium', 'size')}} class={prev.size === "medium" ? 'btn btn-success btn-sm' : 'btn btn-primary btn-sm'}>Medium</button>&nbsp;
                            <button type="button" onClick={()=>{this.props.updatePrev('large', 'size')}} class={prev.size === "large" ? 'btn btn-success btn-md' : 'btn btn-primary btn-md'}>Large</button>&nbsp;
                            <button type="button" onClick={()=>{this.props.updatePrev('x-large', 'size')}} class={prev.size === "x-large" ? 'btn btn-success btn-lg' : 'btn btn-primary btn-lg'}>XLarge</button>
                        </div>
                        <br/>
                    </div>} 
                      { prev.color !== 'n/f' && <div  style={{fontSize: 20, padding: 10, marginBottom: 10}} class="badge-dark col-xs-12 col-md-5 col-lg-5">
                        <div class="col-xs-3 col-md-2 col-lg-2">
                            <span style={{fontWeight: "bold"}}>Color: </span>
                        </div>
                      { prev.img.black &&  <div class="col-xs-2 col-md-1 col-lg-1">
                                <div style={{cursor: "pointer"}} onClick={()=>{this.props.updatePrev('black', 'color')}} id={prev.color === "black" ? 'circleBactive' : 'circleB'}></div>
                        </div> }
                      { prev.img.white &&   <div class="col-xs-2 col-md-1 col-lg-1">       
                                <div style={{cursor: "pointer"}} onClick={()=>{this.props.updatePrev('white', 'color')}} id={prev.color === "white" ? 'circleWactive' : 'circleW'}></div>
                        </div>}
                      { prev.img.purple &&    <div class="col-xs-2 col-md-1 col-lg-1">          
                                <div style={{cursor: "pointer"}} onClick={()=>{this.props.updatePrev('purple', 'color')}} id={prev.color === "purple" ? 'circlePactive' : 'circleP'}></div>
                        </div> }
                      { prev.img.petro &&   <div class="col-xs-2 col-md-1 col-lg-1">
                                <div style={{cursor: "pointer"}} onClick={()=>{this.props.updatePrev('petroleum', 'color')}}id={prev.color === "petroleum" ? 'circleGactive' : 'circleG'}></div>
                        </div> }
                        <br/>
                    </div>}
                    <div class="col-xs-12 col-md-2 col-lg-2">
                        <div onClick={()=>{this.updateInput("view", "Cart"), this.updateInput("cartDirect", "prev")}} class="badge-dark" data-tip="Click to view your cart" style={{cursor: "pointer"}}>
                        <p style={{textAlign: "center", fontSize: 25, paddingBottom: 7}}> <span className="glyphicon glyphicon-shopping-cart">: <span class="label label-warning">{this.props.cartInfo.totalItems}</span></span> </p>
                        </div>
                    </div>
                 </div>
                 <div class="col-xs-12 col-md-6 col-lg-6">
                    <div class ="cardItemPrev splash-cardTeesView">
                       {prev.color === 'black' && <img class="merchShop" src={prev.img.black} alt={prev.id}/>}
                       {prev.color === 'white' && <img class="merchShop" src={prev.img.white} alt={prev.id}/>}
                       {prev.color === 'purple' && <img class="merchShop" src={prev.img.purple} alt={prev.id}/>}
                       {prev.color === 'petroleum' && <img class="merchShop" src={prev.img.petro} alt={prev.id}/>}
                       {prev.color === 'n/f' && <img class="merchShop" src={prev.img} alt={prev.id}/>}
                       <div id ="merchInfo" class="card-body">
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
                       <h1>Product details:</h1><p>• {prev.desc}</p><p>• Color: {prev.color.toUpperCase()}</p><p>• Size: {prev.size.toUpperCase()}</p>
                       <br/>
                       <div class="bordersep"/>
                       <br/>
                       <div class="col-xs-12 col-md-6 col-lg-6">
                            <button class="btn btn-danger" style={{color : "white", width: 250}} onClick={()=>{this.updateInput("view", "shop")}}>
                                Back to shop
                            </button>
                        </div>
                        <div class="col-xs-12 col-md-6 col-lg-6">
                            <button class="btn btn-success" style={{color : "white", width: 250}} onClick={()=>{this.addItemToArray(prev), this.notify(prev.Name), this.updateInfo(prev), console.log(this.props.cart.cart)}}>
                                Add to cart
                            </button>
                        </div>
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
              <div class ="merchBg">
                <br/>
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
                  Back
                </button>
              </div>
           { this.props.cart.cart.length > 0 && <div class="col-xs-12 col-md-6 col-lg-6">
                <button class="btn btn-success" style={{color : "white", width: 270}} onClick={()=>{this.updateInput("Type", "Merch")}}>
                  Checkout
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
        shop: state.shop,
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

export default connect(mapStateToProps, matchDispatchToProps)(MerchShop);