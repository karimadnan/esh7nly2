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
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import StarRatings from 'react-star-ratings';
import { withNamespaces } from 'react-i18next';
import SwipeableViews from 'react-swipeable-views';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import BackIcon from '@material-ui/icons/SkipPrevious';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import Timer from '@material-ui/icons/Timer';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import FortniteShop from '../containers/FortniteShop';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CategoryIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/SwapVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import Truck from '@material-ui/icons/AirportShuttle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../containers/loader';

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

const menuTheme = createMuiTheme({
    palette: {
        primary: { 500: '#fff' } // custom color in hex
    }
});

const productTheme = createMuiTheme({
    palette: {
        primary: { 500: '#212121' }, // custom color in hex
        secondary: { 'A400': '#3F51B5' } // custom color in hex
    }
});

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('lg')]: {
            maxWidth: 352
        }
      },
      input: {
        fontSize: 17,
        padding: 7,
        flex: 1,
        [theme.breakpoints.up('lg')]: {
        maxWidth: 352
        }
      },
      iconButton: {
        padding: 10,
      },
    fab: {
        margin: theme.spacing.unit,
        fontSize: 10,
        minWidth: 120,
        [theme.breakpoints.up('lg')]: {
          fontSize: 15,
        }
    },
    fabCategory: {
        fontSize: 8,
        margin: theme.spacing.unit,
        [theme.breakpoints.up('lg')]: {
          minWidth: 160,
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
    },
    grid: {
        margin: theme.spacing.unit * 2,
        color: 'white',
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 22,
        }
    },
    grid2: {
        margin: theme.spacing.unit,
        color: 'white',
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 22,
        }
    },
    descStyle: {
        fontSize: 12,
        [theme.breakpoints.up('sm')]: {
          fontSize: 15,
        }
    }
});


const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted black',
      color: state.isSelected ? 'white' : '#212121',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

class Market extends Component {

state = {
    url: this.props.server.main,
    value: 0,
    copied: false,
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
    quantity: 1,
    hasDiscount: false,
    filter: '',
    qName: '',
    qcategory: '',
    qskip: '0',
    qlimit: '15',
    qprice: 0,
    categories: ['all', 'merch', 'micro'],
    anchorEl: null,
    anchorEl2: null
}

componentWillUnmount() {
    clearInterval(this.interval);
    this.props.removePrevOptions()
}

componentDidMount(){
    this.props.removePrevOptions();
    this.getData();
}

getData(){
    this.props.fetchShopData({Name: this.state.qName, 
                              category: this.state.qcategory, 
                              price: this.state.qprice});
}
    
handleChange = (event, value) => {
    this.setState({ value });
};

handleClose = (state) => {
    this.setState({ [state]: null });
};

handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
};

handleClick2 = event => {
    this.setState({ anchorEl2: event.currentTarget });
};

handleChangeCategory(value) {
    this.setState({ qcategory: value === 'all' ? '' : value } ,() =>{
        this.handleClose('anchorEl');
        this.getData();
    }
    );
};

handleSortPrice(value) {
    this.setState({ qprice: value === '0' ? '' : value } ,() =>{
        this.handleClose('anchorEl2');
        this.getData();
    }
    );
};

searchEnter(e){
    if (e.key === "Enter"){
        if(this.state.qName){
            this.getData();
        }
    }
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
    autoClose: 1500,
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
        soldBy: item.soldBy,
        category: item.category,
        defaultImage: item.defaultImage
     }
     if (item.img){
        object["img"] = item.img;
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
const { classes } = this.props;
let counter = 0
if (this.state.view === "shop"){
    let shop = this.props.shop.items && this.props.shop.items.map((item) =>{
        var rarity = "card splash-cardTees "+item.rarity
        var key = item.Name + `-${counter}`

        var priceAfterDiscount = item.price - item.discount / 100 * item.price
        counter ++;
        if((item.discount || !this.state.hasDiscount)){
        return (
            <div className="col-xs-12 col-md-4 col-md-4" key={key} style={{cursor: 'pointer'}} onClick={() => {this.addItemToPrev(item), this.setState({view: 'item'})}}>
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
        )}
    })
    const anchorEl = this.state.anchorEl
    const anchorEl2 = this.state.anchorEl2
    let catergories = []

    for (const [index, value] of this.state.categories.entries()) {
        catergories.push(<MenuItem key={index} selected={value === this.state.qcategory} onClick={()=>{this.handleChangeCategory(value)}}><a style={{cursor: 'pointer', color: "black", fontSize: 15}} >{value}</a></MenuItem>)
    }
    
    return (
        <div className="container" style={{backgroundColor: "#121212", boxShadow: `1px 5px 5px #000000`}}>

            <div className="col-xs-12 col-md-12 col-lg-12">
                <div className="col-xs-12 col-md-12 col-lg-4" style={{padding: 0}}>  
                    <Paper className={classes.root} elevation={1}>
                        <InputBase onKeyPress={this.searchEnter.bind(this)} className={classes.input} value={this.state.qName} onChange={e => this.setState({qName: e.target.value})} placeholder="Search store" />
                        <IconButton className={classes.iconButton} aria-label="Search" onClick={() => {this.state.qName && this.getData()}}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    
                </div>
                <div className="col-xs-3 col-md-2 col-lg-2" style={{padding: 0}}>  
                <MuiThemeProvider theme={menuTheme}>
                    <Grid container justify="flex-start" alignItems="center">
                        <Fab onClick={this.handleClick} color="primary" variant="extended" aria-label="Next" className={classes.fabCategory} aria-owns={anchorEl ? 'simple-menu' : undefined}
                                            aria-haspopup="true">
                            <CategoryIcon className={classes.extendedIcon} />
                            {this.state.qcategory ?
                            this.state.qcategory
                            :
                            `${t('category')}`}
                        </Fab>
                    </Grid>
                    </MuiThemeProvider>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => {this.handleClose('anchorEl')}}
                    >
                    {catergories}
                    </Menu>
                </div>
                <div className="col-xs-3 col-md-2 col-lg-2" style={{padding: 0}}>  
                <MuiThemeProvider theme={menuTheme}>
                    <Grid container justify="flex-end" alignItems="center">
                        <Fab onClick={this.handleClick2} color="primary" variant="extended" aria-label="Sort" className={classes.fabCategory} aria-owns={anchorEl2 ? 'simple-menu' : undefined}
                                            aria-haspopup="true">
                            <SortIcon className={classes.extendedIcon} />
                            {this.state.qprice === 1 ?
                                "Low to high" : this.state.qprice === -1 ?
                                "High to low" 
                            : 
                            `${t('Sort by')}`}
                        </Fab>
                    </Grid>
                    </MuiThemeProvider>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl2}
                        open={Boolean(anchorEl2)}
                        onClose={() => {this.handleClose('anchorEl2')}}
                    >
                        <MenuItem selected={this.state.qprice === 0} onClick={()=>{this.handleSortPrice(0)}}><a style={{cursor: 'pointer', color: "black", fontSize: 15}} >Unsort</a></MenuItem>
                        <MenuItem selected={this.state.qprice === 1} onClick={()=>{this.handleSortPrice(1)}}><a style={{cursor: 'pointer', color: "black", fontSize: 15}} >Price: Low to high</a></MenuItem>
                        <MenuItem selected={this.state.qprice === -1} onClick={()=>{this.handleSortPrice(-1)}}><a style={{cursor: 'pointer', color: "black", fontSize: 15}} >Price: High to low</a></MenuItem>
                    </Menu>
                </div>
            </div>

            {this.props.shop.items ?
                shop
            :
            <Grid container justify="flex-start" alignItems="center" className={classes.grid}>
                    {t('No Matches Found')}
            </Grid>}

        </div>
    )
}
}

handleStepChange = activeStep => {
    this.setState({ activeStep });
};

current(){
const { t } = this.props;
const { classes } = this.props;
const prev = this.props.cart.itemPrev
if(this.state.value === 0){
        return(
            <div>
                { prev.desc.split(",").map((place, index) =>
                    <ListItem key={index} className={classes.descStyle}>
                        <ListItemIcon >{<DotIcon />}</ListItemIcon>
                        <ListItemText disableTypography primary={place} />
                    </ListItem>)}

                {prev.category !== 'micro' &&
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon >{<Truck />}</ListItemIcon>
                        <ListItemText disableTypography primary={t('freeShippingText', { freeShipPrice })} />
                    </ListItem>
                </div>}
            </div>
        )
    }
}

ViewProduct(){
const { t } = this.props;
const { classes } = this.props;
const prev = this.props.cart.itemPrev
if (this.state.view === "item"){
    if(prev.options && !this.state.optionsFetched){

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
    const { value } = this.state;

    return (
    <div className="container">
       {!this.state.fortniteShop ?
        <div className="BlackBG">
        
        <div className="col-xs-12 col-md-12 col-lg-12">
            <div className="col-xs-12 col-md-6 col-lg-6">
                <Grid  container justify={"flex-start"} alignItems="center">
                    <h1 style={{color: "white", fontWeight: "bold"}}>{prev.Name}</h1>
                </Grid>
                <Grid  container justify={"flex-start"} alignItems="center">
                    <h5 style={{color: "#3F51B5", fontWeight: "bold"}}>By: {prev.soldBy}</h5>
                </Grid>
            </div>
        </div>
 

        {/* SMALL IMAGES PREVIEW START*/}
        {prev.colors && prev.colors.length > 1 ?
         <div className="col-xs-3 col-md-1 col-lg-1">
            {prev.colors.map((item, index) =>{
                if(item.value){
                    return(
                        <div key={index} onClick={()=>{this.setState({activeStep: index})}} style={{cursor: "pointer", margin: 10}} className="col-xs-12 col-md-12 col-lg-12">
                            <div className ={this.state.activeStep === index ? "cardItemPrevSmall-active" : "cardItemPrevSmall"}>
                                <img src={item.value} className="splash-card-product-view" style={{cursor: "pointer", maxHeight: 53}}/>
                            </div>
                        </div>
                    )
                }
            })}
         </div>
         : prev.img && prev.img.length > 1 ?
            <div className="col-xs-3 col-md-1 col-lg-1">
                {prev.img.map((item, index) =>{
                    return(
                        <div key={index} onClick={()=>{this.setState({activeStep: index})}} style={{cursor: "pointer", margin: 10}} className="col-xs-12 col-md-12 col-lg-12">
                            <div className ={this.state.activeStep === index ? "cardItemPrevSmall-active" : "cardItemPrevSmall"}>
                                <img src={item} className="splash-card-product-view" style={{cursor: "pointer", maxHeight: 53}}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            :undefined}
        {/* SMALL IMAGES PREVIEW END*/}


        {/* MAIN IMAGE SLIDER START*/}
         <div className={prev.colors && prev.colors.length > 1 || prev.img && prev.img.length > 1 ?
            "col-xs-9 col-md-5 col-lg-5" : "col-xs-12 col-md-6 col-lg-6"}>
            <div className="cardItemPrev">
               {prev.colors && prev.colors.length > 1 ?
                    <SwipeableViews 
                            axis={'x'}
                            index={this.state.activeStep}
                            onChangeIndex={this.handleStepChange}
                            enableMouseEvents
                            >
                            {prev.colors.map((step, index) => (
                                <div key={index}>
                                {Math.abs(this.state.activeStep - index) <= 2 ? (
                                    <img src={step.value} className="splash-card-product-view" />
                                ) : null}
                                </div>
                            ))}
                    </SwipeableViews>
                : prev.img && prev.img.length > 1 ?
                <SwipeableViews 
                        axis={'x'}
                        index={this.state.activeStep}
                        onChangeIndex={this.handleStepChange}
                        enableMouseEvents
                        >
                        {prev.img.map((img, index) => (
                            <div key={index}>
                            {Math.abs(this.state.activeStep - index) <= 2 ? (
                                <img src={img} className="splash-card-product-view" />
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
        {/* MAIN IMAGE SLIDER END*/}



         <div className="col-xs-12 col-md-6 col-lg-6">
            <Grid className={classes.grid2} container justify={"flex-start"} alignItems="center">
                {prev.discount > 0 ? 
                        <div>
                            <h1 style={{color: "#3F51B5"}}>{<CurrencyFormat value={priceAfterDiscount.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h1>
                            <span style={{textDecoration: "line-through", color: "grey"}}>{<CurrencyFormat value={prev.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />}</span> <span style={{fontWeight: "normal"}}>- {t('youSave')} {<CurrencyFormat value={discount.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</span>
                        </div>
                    :
                        <h1 style={{color: "#3F51B5"}}>{<CurrencyFormat value={prev.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h1>
                }
            </Grid>
         </div>

         <div style={{color: "white", fontSize: 15}} className="col-xs-12 col-md-6 col-lg-6">
            {prev.id === "5cb82c254e1efafcd06dc1fa" &&
            <div>
                <Grid container justify="center" alignItems="center">
                    <Fab variant="extended" aria-label="Next" onClick={()=>{this.setState({fortniteShop: true}), this.interval = setInterval(() => this.tick(), 1000)}} className={classes.fab}>
                        <ViewIcon className={classes.extendedIcon2} />
                         {t('viewFortShop')}
                    </Fab>
                </Grid>
            </div>}

            {prev.colors && 
                <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
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
                    </div>
                </div>} 
                
                {prev.sizes && 
                <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
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
                    </div>
                </div>} 

                {prev.options && 
                <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
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

                <div className="col-xs-6 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Fab color="secondary" variant="extended" aria-label="Edit" onClick={()=>{this.goBack()}} className={classes.fab}>
                            <BackIcon className={classes.extendedIcon2} />
                            {t('backToShop')}
                        </Fab>
                    </Grid>
                </div>
                <div className="col-xs-6 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.addItemToCart(prev)}} className={classes.fab}>
                            <ShoppingCart className={classes.extendedIcon2} />
                            {t('addToCart')}
                        </Fab>
                    </Grid>
                </div>
                <div className="col-xs-6 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <Chip
                            label={t('productDetails')}
                            className={classes.chip}
                        />
                    </Grid>
                </div>
                <div className="col-xs-6 col-md-6 col-lg-6">
                    <Grid container justify="center" alignItems="center">
                        <CopyToClipboard text={`www.ggegypt.com/productpage/${prev.id}`}>
                            <Chip
                                onClick={()=>{this.setState({copied: true})}}
                                label={'Copy Link'}
                                className={classes.chip}
                            />
                        </CopyToClipboard>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={this.state.copied}
                        onClose={()=>{this.setState({ copied: false })}}
                        transitionDuration={500}
                        autoHideDuration={1000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<h4 id="message-id">Link copied</h4>}
                    />
                </div>
         </div>

         <MuiThemeProvider theme={productTheme}>
            <AppBar position="static" color="primary">
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="secondary"
                            textColor="secondary"
                        >
                            <Tab label={<h5 style={{color: "white"}}>{t('productDetails')}</h5>} />
                        </Tabs>
                </AppBar>
         </MuiThemeProvider>
            <div className="WhiteBG" style={{color: "black", margin: 2}}>
                {this.current()}
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
                <Loader />
                <Navbar page={1}/>
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


