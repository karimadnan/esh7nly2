import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCartItem, updateCartInfo, addPrev, updatePrev, fetchShopData, addPrevOptions, removePrevOptions} from '../actions/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import CurrencyFormat from 'react-currency-format';
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import amumu from '../Images/amumusad.png';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import StarRatings from 'react-star-ratings';
import {
    BrowserView,
    MobileView,
  } from "react-device-detect";
import {isMobile} from 'react-device-detect';
import { withNamespaces } from 'react-i18next';
import SwipeableViews from 'react-swipeable-views';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import BackIcon from '@material-ui/icons/SkipPrevious';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import Timer from '@material-ui/icons/Timer';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import FortniteShop from './FortniteShop';

const freeShipPrice = 400
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

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        fontSize: 10,
        [theme.breakpoints.up('sm')]: {
          fontSize: 12,
        }
    },
    fabFort: {
        margin: theme.spacing.unit * 3,
    },
    extendedIcon2: {
        marginRight: theme.spacing.unit * 6,
    },
    chip: {
        margin: theme.spacing.unit,
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20,
        }
    }
});


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
    timeLeft: "",
    options: [],
    colors: [],
    sizes: [],
    selectedOpt: "",
    selectedColor: "",
    selectedSize: "",
    ErrorModal: false,
    ErrorMsg: "",
    activeStep: 0,
    optionsFetched: false,
    fortniteShop: false,
    quantity: 1
}

componentWillUnmount() {
    clearInterval(this.interval);
    this.props.removePrevOptions()
}

componentDidMount(){
    this.props.removePrevOptions()
    this.props.fetchShopData();
}

goBack(){
    if(this.interval){
        clearInterval(this.interval)
    }
    this.props.removePrevOptions()
    this.setState({view: "shop", 
                   optionsFetched: false, 
                   selectedOpt: "", 
                   selectedColor: "", 
                   colors: [], 
                   sizes: [], 
                   selectedSize: "",
                   activeStep: 0})
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
    const { t } = this.props;
    var prev = this.props.cart.itemPrev
    const itemName = prev.Name
    const msg = t('addedToCartMsg', {itemName})
    if(item.price > 0){
        this.addItemToArray(prev)
        this.updateInfo(prev)
        this.notify(msg)
    }
    else{
        this.setState({
            ErrorModal: true,
            ErrorMsg: `${t('marketOptionError')}`
          })
    }
}

handleChangeOption(type, value) {
    this.setState({[type]: value}, () =>{
        this.props.updatePrev(this.state.selectedOpt.label, 'option')
        this.props.updatePrev(this.state.selectedOpt.value, 'price')
        if(this.state.selectedOpt.img){
            this.props.updatePrev(this.state.selectedOpt.img, 'img')
        }
    });
}

handleChangeColor = selectedColor => {
    this.setState({selectedColor}, () =>{
        this.setState({activeStep: this.state.selectedColor.index})
        this.props.updatePrev(this.state.selectedColor.label, 'color')
        if(this.state.selectedColor.value){
            this.props.updatePrev(this.state.selectedColor.value, 'img')
        }
    });
}

handleChangeSize(type, value) {
    this.setState({[type]: value}, () =>{
        this.props.updatePrev(this.state.selectedSize.label, 'size')
    });
}

updateInput(key, value) {
    this.setState({ [key]: value });
}

tick() {
    const currentDate = moment();
    const future = moment("00:00 AM", ["h:mm A"]);
    let timeCount = moment(future.diff(currentDate))
    this.setState({timeLeft: timeCount - 1000})
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
const { t } = this.props;
let counter = 0
if (this.state.view === "shop"){
    let shop = this.props.shop.items.map((item) =>{
        var discounted = item.discount / 100 * item.price
        var rarity = "card splash-cardTees "+item.rarity
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
                <img src={item.defaultImage} className="splash-card-product-view-constant" />
                <div className="overlayHover" onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}}>

                    <button className="btn btn-primary btn-block" onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}} style={{color : "white"}}>
                        {t('viewButton')}
                    </button>

                    {item.discount > 0 && 
                    <div id ="merchDiscount" className="card-body">
                        <span style={{fontSize: 15, lineHeight: 2.5}} className="label label-danger">{item.discount}%  {t('discount')}</span>
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
                                <h4 className="marketCardTitle" style={{color: "orange", fontWeight: "bold"}}>{<CurrencyFormat value={priceAfterDiscount.toFixed(2)} displayType={'text'} thousandSeparator={true} />}  {t('currency')}</h4>
                                <h5 className="marketCardTitle" style={{color: "grey", textDecoration: "line-through"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />}  {t('currency')}</h5>
                            </div>
                            :
                            <h4 className="marketCardTitle" style={{color: "orange", fontWeight: "bold"}}>{<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />}  {t('currency')}</h4>}
                        </span>}
                        <span>
                           
                            <div>
                                {item.price > 400 && 
                                <h5 style={{color: "white", float: "left"}}>{t('freeShip')} </h5>}
                                <h6 style={{color: "white", float: "right"}}>{t('store')}: <span style={{color: "orange"}}>{item.soldBy}</span></h6>
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

handleStepChange = activeStep => {
    var prev = this.props.cart.itemPrev
    this.setState({ activeStep });
};


ViewProduct(){
const { t } = this.props;
const { classes } = this.props;
var prev = this.props.cart.itemPrev
if (this.state.view === "item"){
    if(prev.options && !this.state.optionsFetched){
        // if (prev.id === "5cb82c254e1efafcd06dc1fa") {

        //     this.interval = setInterval(() => this.tick(), 1000);
        //     const currentDate = moment();
        //     const future = moment("00:00 AM", ["h:mm A"]);
        //     let timeCount = moment(future.diff(currentDate))
            
        // if(moment(timeCount).hour() > 3){
        //     axios.get('https://fnbr.co/api/shop', 
        //     {headers: { 'x-api-key': 'b4d7cae7-7047-4a17-83f6-b4e62091d328' }})
        //     .then(response => {
        //     response.data.data.daily.forEach(element => {
        //         let object1 = {
        //         label: `${element.name} - ${element.type}`,
        //         value: parseFloat(element.price.replace(/,/g, ''))*0.19,
        //         img: element.images.icon
        //         }
        //         this.props.addPrevOptions(object1)
        //       });
        //       response.data.data.featured.forEach(element => {
        //         let object2 = {
        //         label: `${element.name} - ${element.type}`,
        //         value: parseFloat(element.price.replace(/,/g, ''))*0.19,
        //         img: element.images.icon
        //        }
        //        this.props.addPrevOptions(object2)
        //      });
        //      })
        //     }
        // }

    prev.options.forEach(element => {
        let object = {
            label: element.option,
            value: element.price
        };
        (element.img) ? object['img']=element.img : undefined;
            this.props.addPrevOptions(object)
        });
            this.setState({optionsFetched: true})
    }

    if(prev.colors && !this.state.colors.length > 0){
        var colors = []
        prev.colors.forEach((element, index) => {
            let object = {
            label: element.label,
            value: element.value,
            index: index
        }
            colors.push(object)
          });
          this.setState({colors: colors})  
    }

    if(prev.sizes && !this.state.sizes.length > 0){
        var sizes = []
        prev.sizes.forEach((entry, index) => {
            let objSize = {
                label: entry,
                value: index
            }
            sizes.push(objSize)
        })
        this.setState({sizes: sizes})  
    }

    var discount = prev.discount / 100 * prev.price
    var priceAfterDiscount = prev.price - prev.discount / 100 * prev.price
    
    const hours = moment(this.state.timeLeft).format("HH")
    const minutes = moment(this.state.timeLeft).format("mm")
    const seconds = moment(this.state.timeLeft).format("ss")

    return (
    <div className="container">
       {!this.state.fortniteShop ?
        <div className="BlackBG">
        
         <div className="col-xs-12 col-md-8 col-lg-8">
            {prev.colors && prev.colors.length > 1 &&
                this.state.colors.map((item) =>{
                return(
                    <div key={item.index} onClick={()=>{this.setState({activeStep: item.index})}} style={{cursor: "pointer", margin: 10}} className="col-xs-3 col-md-2 col-lg-2">
                        <div className ={this.state.activeStep === item.index ? "cardItemPrevSmall-active" : "cardItemPrevSmall"}>
                            <img src={item.value} className="splash-card-product-view" style={{cursor: "pointer", maxHeight: 53}}/>
                        </div>
                    </div>
                )
            })
            }
         </div>

         <div className="col-xs-12 col-md-6 col-lg-6">
            <div className="cardItemPrev">
               {prev.img.length > 1 ?
                    <SwipeableViews 
                            axis={'x'}
                            index={this.state.activeStep}
                            onChangeIndex={this.handleStepChange}
                            enableMouseEvents
                            >
                            {prev.img.map((step, index) => (
                                <div key={index}>
                                {Math.abs(this.state.activeStep - index) <= 2 ? (
                                    <img src={step} className="splash-card-product-view" />
                                ) : null}
                                </div>
                            ))}
                     </SwipeableViews>
                :
               <img src={prev.defaultImage} className="splash-card-product-view" />}
               {prev.discount > 0 && <div id ="merchDiscount" className="card-body">
                    <span style={{fontSize: 15, lineHeight: 2.5}} className="label label-danger">{prev.discount}% {t('discount')}</span>
               </div> }
            </div>
         </div>

         <div style={{color: "white", fontSize: 15}} className="col-xs-12 col-md-6 col-lg-6">
            {prev.id === "5cb82c254e1efafcd06dc1fa" &&
            <div>
                <Grid container justify="center" alignItems="center">
                    <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.setState({fortniteShop: true}), this.interval = setInterval(() => this.tick(), 1000)}} className={classes.fab}>
                        <ViewIcon className={classes.extendedIcon2} />
                        <h6>{t('viewFortShop')}</h6>
                    </Fab>
                </Grid>
            </div>}
                
            <h1 style={{color: "white", textAlign: "center", fontWeight: "bold"}}>{prev.Name}</h1>

            {prev.discount > 0 ? 
            <div>
                <h1 style={{color: "orange", fontWeight: "bold"}}>{<CurrencyFormat value={priceAfterDiscount.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h1>
                <h2><span style={{textDecoration: "line-through", color: "grey"}}>{<CurrencyFormat value={prev.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />}</span> <span>- {t('youSave')} {<CurrencyFormat value={discount.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</span></h2>
            </div>
            :
                <h1><span style={{color: "orange", fontWeight: "bold"}}>{<CurrencyFormat value={prev.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</span></h1>
            }

            <br/>
                {prev.sizes && 
                <div>
                    <div className="col-xs-4 col-md-4 col-lg-4">
                        <h4>{t('size')}:</h4>
                    </div>
                    <div className="col-xs-8 col-md-8 col-lg-8" style={{textAlign: "center"}}>
                            <Select
                                isSearchable={false}
                                isMulti={false}
                                styles={customStyles}
                                value={this.state.selectedSize}
                                onChange={this.handleChangeSize.bind(this, 'selectedSize')}
                                options={this.state.sizes} placeholder='Select Size'
                            /> 
                        <br/>
                    </div>
                </div>} 

                {prev.colors && 
                <div>
                    <div className="col-xs-4 col-md-4 col-lg-4">
                        <h4>{t('color')}:</h4>
                    </div>
                    <div className="col-xs-8 col-md-8 col-lg-8" style={{textAlign: "center"}}>
                            <Select
                                isSearchable={false}
                                isMulti={false}
                                styles={customStyles}
                                value={this.state.selectedColor}
                                onChange={this.handleChangeColor}
                                options={this.state.colors} placeholder='Select Color'
                            /> 
                        <br/>
                    </div>
                </div>} 

                {prev.options && 
                <div>
                    <div className="col-xs-4 col-md-4 col-lg-4">
                        <h4>{t('option')}:</h4>
                    </div>
                    <div className="col-xs-8 col-md-8 col-lg-8" style={{textAlign: "center"}}>                       
                            <Select
                                isSearchable={false}
                                isMulti={false}
                                styles={customStyles}
                                value={this.state.selectedOpt}
                                onChange={this.handleChangeOption.bind(this, 'selectedOpt')}
                                options={this.props.cart.prevOptions} placeholder='Select Offer'
                            />     
                        <br/>
                    </div>
                </div>} 
                <div className="col-xs-12 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Fab color="secondary" variant="extended" aria-label="Edit" onClick={()=>{this.goBack()}} className={classes.fab}>
                            <BackIcon className={classes.extendedIcon2} />
                            {t('backToShop')}
                        </Fab>
                    </Grid>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.addItemToCart(prev)}} className={classes.fab}>
                            <ShoppingCart className={classes.extendedIcon2} />
                            {t('addToCart')}
                        </Fab>
                    </Grid>
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12" style={{border: "1px dotted grey"}}/>

               <div className="col-xs-12 col-md-12 col-lg-12">
               <h1 style={{textAlign: "center"}}>{t('productDetails')}</h1> { prev.desc.split(",").map(place => <p key={place}> • {place} </p>)} {prev.color && <p>• {t('color')}: {prev.color.toUpperCase()}</p>} {prev.size && <p>• {t('size')}: {prev.size.toUpperCase()}</p>}
               </div>
               <div className="col-xs-12 col-md-12 col-lg-12" style={{border: "1px dotted grey"}}/>
               <div className="col-xs-12 col-md-12 col-lg-12">
                        <h2>{t('freeShippingText', { freeShipPrice })}</h2>
                </div>
               <br/>
         </div>
      </div>
      :
        <div>
            <Grid container justify="flex-start" alignItems="center">
                <Fab color="secondary" variant="extended" aria-label="Edit" onClick={()=>{this.setState({fortniteShop: false}), clearInterval(this.interval);}} className={classes.fabFort}>
                    <BackIcon className={classes.extendedIcon2} />
                    <h6>{t('backToShop')}</h6>
                </Fab>
            </Grid>
            <Grid container justify="center" alignItems="center">
               {this.state.timeLeft && 
               <Chip
                    icon={<Timer />}
                    label={`${t('fortniteShopTimerHours', {hours})}${t('fortniteShopTimerMinutes', {minutes})}${t('fortniteShopTimerSeconds', {seconds})}`}
                    className={classes.chip}
                    variant="outlined"
                    color="primary"
                />}
            </Grid>
            <FortniteShop />
        </div>
      }
    </div>
    )
}
}

render(){
    const { t } = this.props;
    if(!this.props.shop.fetched){
        return(
            <div className="GG-BG-INVERSE">
                <div className="container" style={{backgroundColor: "#121212", boxShadow: `1px 5px 5px #000000`, height: 300}}>
                    <h1 style={{color: "white", textAlign: "center"}}> {t('loading')}...</h1>
                    <PacmanLoader
                    css={override}
                    sizeUnit={"px"}
                    size={100}
                    color={'#FFFF00'}
                    loading={true}/>
                </div>
                <Navbar page={"Offers"}/>
            </div>
        )
    }
    return(
        <div className="GG-BG-INVERSE">
                {this.Market()}
                {this.ViewProduct()}
            <Navbar page={1}/>
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
        cartInfo: state.updateCartInfo
    }
  }
  
const matchDispatchToProps = dispatch => bindActionCreators(
    {
        addCartItem,
        updateCartInfo,
        addPrev,
        updatePrev,
        fetchShopData,
        addPrevOptions,
        removePrevOptions
    },
    dispatch,
)

export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps, matchDispatchToProps),
)(Market); 


