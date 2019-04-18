import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCartItem, updateCartInfo, addPrev, updatePrev, fetchShopData} from '../actions/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactTooltip from 'react-tooltip';
import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import CurrencyFormat from 'react-currency-format';
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import amumu from '../Images/amumusad.png';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import {Image} from 'cloudinary-react';
import StarRatings from 'react-star-ratings';
import {
    BrowserView,
    MobileView,
  } from "react-device-detect";
import {isMobile} from 'react-device-detect';

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

const override = css`
    display: block;
    border-color: red;
    margin: 0 auto;
`;

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted black',
      color: state.isSelected ? 'red' : 'blue',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

class Market extends Component {

state = {
    category: "all",
    condition: "new",
    sort: "",
    view: "shop",
    options: [],
    colors: [],
    selectedOpt: "",
    selectedColor: "",
    ErrorModal: false,
    ErrorMsg: "",
    quantity: 1
}

componentDidMount(){
this.props.fetchShopData();
}

notify = (msg) => toast.success(msg, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
});

onOpenModal = (type) => {
    this.setState({[type]: true });
};

onCloseModal = (type) => {
    this.setState({[type]: false });
};

addItemToCart(item){
    var prev = this.props.cart.itemPrev
    if(item.price > 0){
        this.addItemToArray(prev)
        this.updateInfo(prev)
        this.notify(`${prev.Name} added to cart`)
    }
    else{
        this.setState({
            ErrorModal: true,
            ErrorMsg: "Oops are you sure you filled all the info?!"
          })
    }
}

handleChangeOption(type, value) {
    this.setState({[type]: value}, () =>{
        this.props.updatePrev(this.state.selectedOpt.label, 'option')
        this.props.updatePrev(this.state.selectedOpt.value, 'price')
    });
}

handleChangeColor(type, value) {
    this.setState({[type]: value}, () =>{
        this.props.updatePrev(this.state.selectedColor.label, 'color')
        this.props.updatePrev(this.state.selectedColor.value, 'img')
    });
}

colorChange(){

}

updateInput(key, value) {
    this.setState({ [key]: value });
}

LoopIMGS(){
    let outPut = []
    var prev = this.props.cart.itemPrev
    const ConvertedIMGS = Object.values(prev.img)
    for (const img of ConvertedIMGS) {
        outPut.push( <div key={img} onClick={()=>{this.props.updatePrev(img, 'img')}} style={{cursor: "pointer", margin: 10}} className="col-xs-3 col-md-2 col-lg-2">
            <div className ={prev.defaultImage === img ? "cardItemPrevSmall-active" : "cardItemPrevSmall"}>
                <Image cloudName="dols73omt" publicId={img} className="splash-card-product-view" style={{cursor: "pointer", maxHeight: 53}}/>
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
    let uniqueId = item.id
    var discounted = item.discount / 100 * item.price

    let object = {
        Name: item.Name,
        price: item.discount > 0 ? item.price - discounted : item.price,
        rarity: item.rarity,
        info: item.info,
        quantity: this.state.quantity,
        defaultImage: item.defaultImage,
     }
     if (item.defaultOpt){
         object["option"] = item.defaultOpt;
         uniqueId = uniqueId + `-${this.props.cart.itemPrev.defaultOpt}`
         object["id"] = uniqueId
     }
     if (item.color){
         object["color"] = item.color;
         uniqueId = uniqueId + `-${this.props.cart.itemPrev.color}`
         object["id"] = uniqueId
     }
     if (item.size){
         object["size"] = item.size;
         uniqueId = uniqueId + `-${this.props.cart.itemPrev.size}`
         object["id"] = uniqueId
     }
     else if (!item.defaultOpt && !item.color && !item.size){
        object["id"] = uniqueId
     }

     this.props.addCartItem(object)
}

addItemToPrev(item){
    let object = {
        id: item._id,
        Name: item.Name,
        price: item.price,
        desc: item.desc,
        discount: item.discount,
        defaultImage: item.img[0],
        img: item.img
     }
     if (item.options){
        object["defaultOpt"] = item.options[0];
        object["options"] = item.options;
    }
    if (item.colors){
        object["color"] = item.colors[0].label;
        object["colors"] = item.colors;
    }
    if (item.sizes){
        object["sizes"] = item.sizes;
        object["size"] = item.sizes[0];
    }
     this.props.addPrev(object)
}

Market(){
let counter = 0
if (this.state.view === "shop"){
    let shop = this.props.shop.items.map((item) =>{
        var discounted = item.discount / 100 * item.price
        var rarity = "card splash-cardTees rarity-"+item.rarity
        var key = item.Name + `-${counter}`
        var randomImg = function (obj) {
            var keys = Object.keys(obj)
            return obj[keys[ keys.length * Math.random() << 0]];
        };
        var shopRandomize = randomImg(item.img)
        var priceAfterDiscount = item.price - item.discount / 100 * item.price
        counter ++;
        return (
            <div className="col-xs-12 col-md-4 col-md-4" key={key} style={{minHeight: !isMobile ? 400 : 0}}>
            <div className ={rarity}>
                <Image cloudName="dols73omt" publicId={item.defaultImage} className="splash-card-product-view-constant" />
            
                <div className="overlayHover" onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}}>
                    <button className="btn btn-primary btn-block" onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}} style={{color : "white"}}>
                            View
                    </button>

                    {item.discount > 0 && 
                    <div id ="merchDiscount" className="card-body">
                        <span style={{fontSize: 15, lineHeight: 2.5}} className="label label-danger">{item.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
                    </div> 
                    }
                </div>
                    <div className="marketInfoBox">
                        <span className="marketCardText">
                            <h4 className="marketCardTitle">{item.Name}</h4>
                        </span>
                        {item.price > 0 &&
                        <span>
                            {item.discount ?
                            <div>
                                <h4 className="marketCardTitle" style={{color: "orange", fontWeight: "bold"}}>{<CurrencyFormat value={priceAfterDiscount.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</h4>
                                <h5 className="marketCardTitle" style={{color: "grey", textDecoration: "line-through"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</h5>
                            </div>
                            :
                            <h4 className="marketCardTitle" style={{color: "orange", fontWeight: "bold"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</h4>}
                        </span>}
                        <span>
                           
                            <div>
                                {item.price > 400 && 
                                <h5 style={{color: "white", float: "left"}}>FREE Shipping </h5>}
                                <h6 style={{color: "white", float: "right"}}>Shop: <span style={{color: "orange"}}>{item.soldBy}</span></h6>
                            </div>
                        </span>

                    </div>
            </div>

        </div>
        )
    })
    return (
        <div className="container" style={{backgroundColor: "#121212", boxShadow: `1px 5px 5px #000000`}}>

            {/* <div className="col-xs-12 col-md-12 col-lg-12" style={{backgroundColor: "#222222", borderBottom: "1px solid black"}}>
                <div className="form-group has-feedback">
                        <div className="col-xs-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
                                <input style={{margin: 10}} className="form-control" type="text" placeholder="Search Store" required></input>
                        </div>
                </div>
            </div> */}

                {/* <div className="col-xs-12 col-md-2 col-lg-2" style={{backgroundColor: "#222222", marginTop: 10, borderRadius: 3}}>
                    <h2 style={{color: "grey", textAlign: "center"}}>Category</h2>
                        <h5 onClick={()=>{this.setState({category: "all"})}} style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "all" && "purple"}}>All (16)</h5>
                        <h5 onClick={()=>{this.setState({category: "merch"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "micro" && "purple"}}><span className="svg-icon svg-icon-thompson"></span> Microtransactions (3)</h5>
                        <h5 onClick={()=>{this.setState({category: "merch"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "merch" && "purple"}}><span className="svg-icon svg-icon-tshirt"></span> Merchandise (14)</h5>
                        <h5 onClick={()=>{this.setState({category: "gaming"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "gaming" && "purple"}}><span className="svg-icon svg-icon-keyboard"></span> Gaming Accessories (2)</h5>
                        <h5 onClick={()=>{this.setState({category: "consoles"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "consoles" && "purple"}}><span className="svg-icon svg-icon-psController"></span> Playstation (0)</h5>
                        <h5 onClick={()=>{this.setState({category: "pc"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "pc" && "purple"}}><span className="svg-icon svg-icon-pc"></span> PC (0)</h5>
                        <h5 onClick={()=>{this.setState({category: "laptop"})}}  style={{color: "white", textAlign: "center", cursor: "pointer", backgroundColor: this.state.category === "laptop" && "purple"}}><span className="svg-icon svg-icon-laptop"></span> Laptop (0)</h5>
                    <div style={{border: "0.5px dotted grey"}}/>
                    <h2 style={{color: "grey", textAlign: "center"}}>Condition</h2>
                        <h5 style={{color: "white", textAlign: "center"}}><span className="	glyphicon glyphicon-star"></span> New (16)</h5>
                        <h5 style={{color: "white", textAlign: "center"}}><span className="	glyphicon glyphicon-repeat"></span> Used (0)</h5>
                    <div style={{border: "0.5px dotted grey"}}/>
                    <h2 style={{color: "grey", textAlign: "center"}}>Sort By</h2>
                        <h5 style={{color: "white", textAlign: "center"}}><span className="glyphicon glyphicon-arrow-down"></span> Price from Low to High</h5>
                        <h5 style={{color: "white", textAlign: "center"}}><span className="glyphicon glyphicon-arrow-up"></span> Price from High to Low</h5>
                        <h5 style={{color: "white", textAlign: "center"}}><span className="glyphicon glyphicon-scissors"></span> Has Discount (3)</h5>
                </div> */}

                    {shop}
        </div>
    )
    }
}

ViewProduct(){
var prev = this.props.cart.itemPrev
if (this.state.view === "item"){

    if(prev.options && !this.state.options.length > 0){
        var arr = []
        prev.options.forEach(element => {
            let object = {
              label: element.option,
              value: element.price
            }
            arr.push(object)
          });
          this.setState({options: arr})  
    }
    else if (prev.colors && !this.state.colors.length > 0){
        var arr = []
        prev.colors.forEach(element => {
            let object = {
              label: element.label,
              value: element.value
            }
            arr.push(object)
          });
          this.setState({colors: arr})  
    }
    
    var discount = prev.discount / 100 * prev.price
    var priceAfterDiscount = prev.price - prev.discount / 100 * prev.price
    return (
    <div className="container">
        <div className="BlackBG">
        
         <div className="col-xs-12 col-md-8 col-lg-8">
            {prev.img.length > 1 && this.LoopIMGS()}
        </div>

         <div className="col-xs-12 col-md-6 col-lg-6">
            <div className ="cardItemPrev">
               <Image cloudName="dols73omt" publicId={prev.defaultImage} className="splash-card-product-view" />
               {prev.discount > 0 && <div id ="merchDiscount" className="card-body">
                    <span style={{fontSize: 15, lineHeight: 2.5}} className="label label-danger">{prev.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
               </div> }
            </div>
         </div>

         <div style={{color: "white", fontSize: 15}} className="col-xs-12 col-md-6 col-lg-6">
               <h1 style={{color: "white", textAlign: "center"}}>{prev.Name}</h1>

                {prev.discount > 0 ? 
                <div>
                    <h1 style={{color: "orange", fontWeight: "bold"}}>{<CurrencyFormat value={priceAfterDiscount.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</h1>
                    <h2><span style={{textDecoration: "line-through", color: "grey"}}>{<CurrencyFormat value={prev.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</span> <span>- You Save {<CurrencyFormat value={discount.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</span></h2>
                </div>
                :
                    <h1><span style={{color: "orange", fontWeight: "bold"}}>{<CurrencyFormat value={prev.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</span></h1>
                }

               <br/>
              {prev.sizes && 
                    <div>
                        <div className="col-xs-4 col-md-4 col-lg-4">
                            <h4>Size:</h4>
                        </div>
                        <div className="col-xs-8 col-md-8 col-lg-8">
                            <select className="form-control" id="size" style={{color: "blue", fontWeight: "bold"}} value={prev.size} onChange={e => this.props.updatePrev(e.target.value, 'size')}>
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
                    <div className="col-xs-4 col-md-4 col-lg-4">
                        <h4>Color:</h4>
                    </div>
                    <div className="col-xs-8 col-md-8 col-lg-8" style={{textAlign: "center"}}>
                            <Select
                                styles={customStyles}
                                value={this.state.selectedColor}
                                onChange={this.handleChangeColor.bind(this, 'selectedColor')}
                                options={this.state.colors} placeholder='Select Color'
                            /> 
                        <br/>
                    </div>
                </div>} 

                {prev.options && 
                <div>
                    <div className="col-xs-4 col-md-4 col-lg-4">
                        <h4>Options:</h4>
                    </div>
                    <div className="col-xs-8 col-md-8 col-lg-8" style={{textAlign: "center"}}>                       
                            <Select
                                styles={customStyles}
                                value={this.state.selectedOpt}
                                onChange={this.handleChangeOption.bind(this, 'selectedOpt')}
                                options={this.state.options} placeholder='Select Offer'
                            />     
                        <br/>
                    </div>
                </div>} 
                <div className="col-xs-6 col-md-6 col-lg-6">
                    <button className="btn btn-danger btn-block" style={{color : "white"}} onClick={()=>{this.setState({view: "shop", options: [], selectedOpt: "", selectedColor: "", colors: []})}}>
                        <span className="icon glyphicon glyphicon-arrow-left"></span>
                        <span className="text">Back to shop</span>
                    </button>
                </div>
                <div className="col-xs-6 col-md-6 col-lg-6">
                    <button className="btn btn-primary btn-block" style={{color : "white"}} onClick={()=>{this.addItemToCart(prev)}}>
                        <span className="icon glyphicon glyphicon-shopping-cart"></span>
                        <span className="text">Add to cart</span>
                    </button>
                    <br/>
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12" style={{border: "1px dotted grey"}}/>

               <div className="col-xs-12 col-md-12 col-lg-12">
               <h1 style={{textAlign: "center"}}>Product details</h1> { prev.desc.split(",").map(place => <p> • {place} </p>)} {prev.color && <p>• Color: {prev.color.toUpperCase()}</p>} {prev.size && <p>• Size: {prev.size.toUpperCase()}</p>}
               </div>
               <div className="col-xs-12 col-md-12 col-lg-12" style={{border: "1px dotted grey"}}/>
               <div className="col-xs-12 col-md-12 col-lg-12">
                    {this.props.lang.lang === "EN" ?  
                        <h2><strong style={{textDecoration: "underline"}}>Free shipping</strong> on orders over 300 EGP</h2>
                    :  <h2 style={{textAlign: "right"}}><strong style={{textDecoration: "underline"}}>شحن مجانى</strong> على الطلبات 300 جنيه و اكثر</h2>
                    }
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
    if(!this.props.shop.fetched){
        return(
            <div className="GG-BG-INVERSE">
                <div className="container" style={{backgroundColor: "#121212", boxShadow: `1px 5px 5px #000000`}}>
                    <h1 style={{color: "white", textAlign: "center"}}> Loading...</h1>
                    <PacmanLoader
                    css={override}
                    sizeUnit={"px"}
                    size={100}
                    color={'#FFFF00'}
                    loading={true}/>
                </div>
            </div>
        )
    }
    return(
        <div className="GG-BG-INVERSE">
                {this.Market()}
                {this.ViewProduct()}
            <Navbar page={"Offers"}/>
            <Modal 
                open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
                styles={ErrorStyle}>
                <h3 class="col-xs-6">{this.state.ErrorMsg}</h3>
                <img style ={{width: 150, height: 120}} class="col-xs-6" src={amumu} alt=""></img> 
            </Modal>
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
        updatePrev,
        fetchShopData
    },
    dispatch,
)


  export default connect(mapStateToProps, matchDispatchToProps)(Market);
  


