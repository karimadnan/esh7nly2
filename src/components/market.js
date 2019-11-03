import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCartItem} from '../actions/index';
import { toast } from 'react-toastify';
import Navbar from './navbar';
import CurrencyFormat from 'react-currency-format';
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
import i18next from 'i18next';
import {Helmet} from "react-helmet";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {isMobile} from 'react-device-detect';
import AliceCarousel from 'react-alice-carousel';

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

const chipTheme = createMuiTheme({
    palette: {
        primary: { 500: '#3F51B5' }, // custom color in hex
        secondary: { 'A400': '#d3d3d3' } // custom color in hex
    }
});

const productTheme = createMuiTheme({
    palette: {
        primary: { 500: '#212121' }, // custom color in hex
        secondary: { 'A400': '#3F51B5' } // custom color in hex
    }
});

const styles = theme => ({
    titleFont: {
        fontFamily: 'arial black',
        fontSize: 25,
        fontWeight: 'bold',

        [theme.breakpoints.up('sm')]: {
          fontSize: 70,
        }
    },
    priceFont: {
        margin: theme.spacing.unit,
        fontWeight: 'bold',
        fontFamily: 'arial',
        color: fade('#9da6d7', 1.725),
        fontSize: 12,
        [theme.breakpoints.up('sm')]: {
          fontSize: 18,
        }
    },
    discountedFont: {
        margin: theme.spacing.unit,
        fontFamily: 'arial',
        textDecoration: 'line-through',
        color: 'grey',
        fontSize: 13,
        [theme.breakpoints.up('sm')]: {
          fontSize: 15,
        }
    },
    cardName: {
        margin: theme.spacing.unit,
        color: 'white',
        fontFamily: 'arial',
        wordBreak: 'break-word',
        fontSize: 12,
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
          fontSize: 14,
        }
    },
    progress: {
        margin: theme.spacing.unit * 2,
      },
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
    backFab: {
        margin: theme.spacing.unit,
        backgroundColor: fade('#F44336', 0.625),
        fontSize: 10,
        minWidth: 120,
        [theme.breakpoints.up('lg')]: {
          fontSize: 15,
        },
        '&:hover': {
            backgroundColor: fade('#F44336', 0.425),
          },
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
        fontSize: 10,
        fontWeight: 'bold',
        minWidth: 90,
        margin: theme.spacing.unit,
        [theme.breakpoints.up('lg')]: {
          minWidth: 170,
          fontSize: 15,
        }
    },
    fabFort: {
        margin: theme.spacing.unit * 3,
    },
    extendedIcon2: {
        marginRight: theme.spacing.unit * 6,
    },
    chipCopy: {
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20,
        }
    },
    chip: {
        margin: theme.spacing.unit,
        fontSize: 11,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20,
        }
    },
    chipDiscount: {
        margin: theme.spacing.unit,
        backgroundColor: fade('#F44336', 0.625),
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
        [theme.breakpoints.up('sm')]: {
          fontSize: 14,
          maxHeight: 30,
        }
    },
    chipView: {
        margin: theme.spacing.unit,
        minWidth: 100,
        fontSize: 15,
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
          fontSize: 19,
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

class Market extends Component {

        constructor(props) {
            super(props)
            this.state = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.props.loginData.token},
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
                fortniteShop: false,
                quantity: 1,
                hasDiscount: false,
                filter: '',
                qName: '',
                qcategory: '',
                qskip: '0',
                qlimit: '15',
                qprice: 0,
                categories: ['all', 'apparel', 'games'],
                anchorEl: null,
                anchorEl2: null,
                fetchingShop: false,
                fetchedShop: false,
                errorFetchingShop: false,
                shopData: [],
                prevPro: '',
                defaultOptAdded: false
            }
        }



componentWillUnmount() {
    clearInterval(this.interval);
}

componentDidMount(){
    this.fetchShop();
}

fetchShop(){
    let query = {
        Name: this.state.qName, 
        category: this.state.qcategory, 
        price: this.state.qprice
    }

    var that = this
    this.setState({fetchingShop: true})
    axios.post(this.state.url+"fetchShop", query, {headers: this.state.headers})

    .then(function (response) {
        that.setState({fetchingShop: false, fetchedShop: true, errorFetchingShop: false, shopData: response.data.data})
    })
    .catch(function (error) {
        that.setState({fetchingShop: false, errorFetchingShop: true})
    })
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
        this.fetchShop();
    }
    );
};

handleSortPrice(value) {
    this.setState({ qprice: value === '0' ? '' : value } ,() =>{
        this.handleClose('anchorEl2');
        this.fetchShop();
    }
    );
};

searchEnter(e){
    if (e.key === "Enter"){
        if(this.state.qName){
            this.fetchShop();
        }
    }
}

notify = (msg) => toast.success(msg, {
    position: "top-right",
    autoClose: 3500,
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
    const itemName = item.Name
    const msg = item.defaultOpt ? `${item.defaultOpt}  ${t('addedToCartMsg', {itemName})}` : t('addedToCartMsg', {itemName})
    let uniqueId = item._id

    let object = {
        Name: item.Name,
        price: item.price,
        info: item.info,
        soldBy: item.soldBy,
        quantity: this.state.quantity,
        defaultImage: item.defaultImage,
     }

    if (item.oldPrice){
        object["oldPrice"] = item.oldPrice;
    }
    if (item.defaultOpt){
        object["option"] = item.defaultOpt;
        uniqueId = uniqueId + `-${this.state.prevPro.defaultOpt}`
        object["id"] = uniqueId
    }
    if (item.color){
        object["color"] = item.color;
        uniqueId = uniqueId + `-${this.state.prevPro.color}`
        object["id"] = uniqueId
    }
    if (item.size){
        object["size"] = item.size;
        uniqueId = uniqueId + `-${this.state.prevPro.size}`
        object["id"] = uniqueId
    }
    else if (!item.defaultOpt && !item.color && !item.size){
        object["id"] = uniqueId
     }

    if(item.options){
        if(item.defaultOpt !== ''){
            this.props.addCartItem(object)
            this.notify(msg)
        }
        else{
            this.setState({
                ErrorModal: true,
                ErrorMsg: `${t('marketOptionError')}`
            })
        }
    }
    else{
        this.props.addCartItem(object)
        this.notify(msg)
    }
}

selectChange(type, value){
    this.setState({[type]: value}, () =>{
        if(type === 'selectedOpt'){
            this.setState({
                prevPro: {
                  ...this.state.prevPro,
                  defaultOpt: value.label,
                  price: value.value,
                  defaultImage: value.img ? value.img : this.state.prevPro.defaultImage
                }
              })
        }
        if(type === 'selectedColor'){
            this.setState({
                prevPro: {
                  ...this.state.prevPro,
                  color: value.label,
                  defaultImage: value.value,
                },
                activeStep: value.index
              })
        }
        if(type === 'selectedSize'){
            this.setState({
                prevPro: {
                  ...this.state.prevPro,
                  size: value.label
                }
              })
        }
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

CalcDiscount(product){
    const { t } = this.props
    const price = product.oldPrice - product.price
    var discount = ''
    if(product.discount === '%'){
        discount = `${product.price / product.oldPrice * 100}% ${t('discount')}`
    }
    else if (product.discount === 'EGP'){
        discount = `${t('EGPdiscount', {price})}`
    }
    return discount
}

Discounted(){
    const { classes } = this.props;
    const { t } = this.props;
    
    if(this.state.shopData){
    let outPut = []
    this.state.shopData.map((item, index) =>{
        var rarity = "splash-cardTees"
        if(item.oldPrice){
            outPut.push(            
            <div key={index} className={rarity} style={{margin: 5}} onClick={() => {this.setState({view: 'item', prevPro: item})}} 
                onMouseEnter={() => this.Offers._pause()}
                onMouseLeave={() => this.Offers._play()}>
                <img className="splash-card-product-view-constant" src={item.defaultImage} alt={item.id}/>
            
                <div className="overlayHover">
    
                    <div id="ViewButton">
                        <Chip
                            label={t('viewButton')}
                            className={classes.chipView}
                            color={'default'}
                        />
                    </div>
    
                    {item.oldPrice && 
                    <div id ="merchDiscount" className="card-body">
                        <Chip
                            label={`${this.CalcDiscount(item)}`}
                            className={classes.chipDiscount}
                            color={'secondary'}
                        />
                    </div> 
                    }
                </div>
            </div> 
            )
            }
        })
        return outPut
    }
    }

Market(){
const { t } = this.props;
const { classes } = this.props;
if (this.state.view === "shop"){
    let shop = this.state.shopData && this.state.shopData.map((item, index) =>{
        var rarity = "card splash-cardTees"

        return (
        <div className="col-xs-12 col-md-4 col-md-4" key={index} style={{cursor: 'pointer'}} onClick={() => {this.setState({view: 'item', prevPro: item})}}>
            <div className ={rarity}>
                    <img src={item.defaultImage} alt={item.Name} className="splash-card-product-view-constant" />
                    <div className="overlayHover">
                        <div id="ViewButton">
                            <Chip
                                label={t('viewButton')}
                                className={classes.chipView}
                                color={'default'}
                            />
                        </div>

                        {item.discount && 
                        <div id ="merchDiscount" className="card-body">
                            <Chip
                                label={`${this.CalcDiscount(item)}`}
                                className={classes.chipDiscount}
                                color={'secondary'}
                            />
                        </div> }
                    </div>

                    <div className="marketInfoBox">
                        <div className="marketCardText">
                            <Typography className={classes.cardName}>
                                {item.Name.length > 55 ? (((item.Name).substring(0,55-3))  + '...' ) : item.Name}
                            </Typography>
                        </div>
                        {item.price > 0 &&
                        <div>
                            {item.oldPrice ?
                            <div>
                                <Typography className={classes.priceFont}>
                                    {<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />}  {t('currency')}
                                </Typography>
                                <Typography className={classes.discountedFont}>
                                    {<CurrencyFormat value={item.oldPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />}  {t('currency')}
                                </Typography>
                            </div>
                            :
                                <Typography className={classes.priceFont}>
                                    {<CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />}  {t('currency')}
                                </Typography>}
                        </div>}
                    </div>
            </div>

        </div>
        )
    })
    const anchorEl = this.state.anchorEl
    const anchorEl2 = this.state.anchorEl2
    let catergories = []

    for (const [index, value] of this.state.categories.entries()) {
        catergories.push(<MenuItem key={index} selected={value === this.state.qcategory} onClick={()=>{this.handleChangeCategory(value)}}><p style={{cursor: 'pointer', color: "black", fontSize: 15}} >{value}</p></MenuItem>)
    }
    
    return (
        <div className="container">
            <div className="BlackBG">
                <div className="col-xs-6 col-md-6 col-lg-6">
                    <div id="gradi">
                        <Typography className={classes.titleFont}>
                            PRE-SALE
                        </Typography>
                        <Typography className={classes.titleFont}>
                            50% OFF!
                        </Typography>
                    </div>
                </div>
                <div className="col-xs-6 col-md-6 col-lg-6">
                <AliceCarousel
                        items={this.Discounted()}
                        responsive={ {
                            0: { items: 1 },
                            1024: { items: 1 },
                        }}
                        autoPlayInterval={5000}
                        autoPlayDirection="ltr"
                        autoPlay={true}
                        mouseDragEnabled={false}
                        stopAutoPlayOnHover={true}
                        dotsDisabled={true}
                        buttonsDisabled={true}
                        ref={(el) => (this.Offers = el)}
                    />
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12">
                <div id="gradi">
                <Typography className={classes.priceFont}>
                            *PRESALE - Will be shipped the 20th of july
                        </Typography>
                </div>
                </div>
            </div>
            <div className="col-xs-12 col-md-12 col-lg-12">
                <div className="col-xs-12 col-md-12 col-lg-4" style={{padding: 0}}>  
                    <Paper className={classes.root} elevation={1}>
                        <InputBase onKeyPress={this.searchEnter.bind(this)} className={classes.input} value={this.state.qName} onChange={e => this.setState({qName: e.target.value})} placeholder="Search store" />
                        <IconButton className={classes.iconButton} aria-label="Search" onClick={() => {this.state.qName && this.fetchShop()}}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    
                </div>
                <div className="col-xs-4 col-md-2 col-lg-2" style={{padding: 0}}>  
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
                <div className="col-xs-4 col-md-2 col-lg-2" style={{padding: 0}}>  
                <MuiThemeProvider theme={menuTheme}>
                    <Grid container justify="flex-end" alignItems="center">
                        <Fab onClick={this.handleClick2} color="primary" variant="extended" aria-label="Sort" className={classes.fabCategory} aria-owns={anchorEl2 ? 'simple-menu' : undefined}
                                            aria-haspopup="true">
                            <SortIcon className={classes.extendedIcon} />
                            {this.state.qprice === 1 ?
                                "Low to high" : this.state.qprice === -1 ?
                                "High to low" 
                            : 
                            `${t('Sortby')}`}
                        </Fab>
                    </Grid>
                    </MuiThemeProvider>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl2}
                        open={Boolean(anchorEl2)}
                        onClose={() => {this.handleClose('anchorEl2')}}
                    >
                        <MenuItem selected={this.state.qprice === 0} onClick={()=>{this.handleSortPrice(0)}}><p style={{cursor: 'pointer', color: "black", fontSize: 15}} >Unsort</p></MenuItem>
                        <MenuItem selected={this.state.qprice === 1} onClick={()=>{this.handleSortPrice(1)}}><p style={{cursor: 'pointer', color: "black", fontSize: 15}} >Price: Low to high</p></MenuItem>
                        <MenuItem selected={this.state.qprice === -1} onClick={()=>{this.handleSortPrice(-1)}}><p style={{cursor: 'pointer', color: "black", fontSize: 15}} >Price: High to low</p></MenuItem>
                    </Menu>
                </div>
            </div>

            {this.state.shopData.length > 0 ?
                shop
            :
            <Grid container justify="flex-start" alignItems="center" className={classes.grid}>
                    {t('No Products Found')}
            </Grid>}

        </div>
    )
}
}

handleStepChange = activeStep => {
    this.setState({ activeStep });
};

openFortniteShop(){
    this.setState({fortniteShop: true})
    this.interval = setInterval(() => this.tick(), 1000)
}

closeFortniteShop(){
    this.setState({fortniteShop: false})
    clearInterval(this.interval)
}

current(){
const { t } = this.props;
const { classes } = this.props;
const prev = this.state.prevPro
if(this.state.value === 0){
        return(
            <div>
                {prev.desc.split(",").map((place, index) =>
                    <div style={{backgroundColor: index % 2 === 0 ? '#fff' : '#f7f9fe'}} key={index}>
                        <ListItem key={index} className={classes.descStyle}>
                            <ListItemIcon>{<DotIcon />}</ListItemIcon>
                            <ListItemText disableTypography primary={place} />
                        </ListItem>
                    </div>
                )}

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
const prev = this.state.prevPro
let opts = []
let colors = []
let sizes = []
let flexPrev = {...this.state.prevPro}

if (this.state.view === "item"){

    if(prev.options && !this.state.options.length > 0){
        prev.options.forEach(element => {
        let object = {
            label: element.option,
            value: element.price
        };
        if(element.img) {object['img']=element.img}
            opts.push(object)
        });
            this.setState({options: opts})
    }

    if(prev.colors && !this.state.colors.length > 0){
        prev.colors.forEach((element, index) => {
            let object = {
                label: element.label,
                value: element.value, 
                index: index
            }
            colors.push(object)
          });
          flexPrev['color'] = colors[0].label
          this.setState({colors: colors, selectedColor: colors[0]})
    }

    if(prev.sizes && !this.state.sizes.length > 0){
        prev.sizes.forEach((entry, index) => {
            let objSize = {
                label: entry,
                value: index
            }
            sizes.push(objSize)
        })
        flexPrev['size'] = sizes[0].label
        this.setState({sizes: sizes, selectedSize: sizes[0]})  
    }

    if(!this.state.defaultOptAdded){
        this.setState({prevPro: flexPrev, defaultOptAdded: true})
    }

    var discount = prev.discount
    var discounted = prev.oldPrice - prev.price
    
    const hours = moment(this.state.timeLeft).format("HH")
    const minutes = moment(this.state.timeLeft).format("mm")
    const seconds = moment(this.state.timeLeft).format("ss")
    const { value } = this.state;

    if(this.state.fortniteShop){
        return (
            <div>
                <Grid container justify="flex-start" alignItems="center">
                    <Fab color="secondary" variant="extended" aria-label="Edit" onClick={()=>{this.closeFortniteShop()}} className={classes.fabFort}>
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
                        variant="contained"
                        color="primary"
                    />}
                </Grid>
                <FortniteShop />
            </div>
        )
    }

    return (
    <div className="row">
        <Helmet>
            <title>{prev.Name} | {prev.category} | {prev.soldBy}</title>
            <meta name="description" content={`${prev.Name} | ${prev.category} | ${prev.soldBy}`} />
        </Helmet>
        <div className="BlackBG">

        {/* SMALL IMAGES PREVIEW START*/}
        {!isMobile ?
        <div>
        {prev.colors && prev.colors.length > 1 ?
        <div className="col-md-1 col-lg-1">
            {prev.colors.map((item, index) =>{
                if(item.value){
                    return(
                        <div key={index} onClick={()=>{this.setState({activeStep: index})}} style={{cursor: "pointer", margin: 5}} className="col-md-12 col-lg-12">
                            <div className ={this.state.activeStep === index ? "cardItemPrevSmall-active" : "cardItemPrevSmall"}>
                                <img src={item.value} alt={item.label} className="splash-card-product-view" style={{cursor: "pointer", maxHeight: 50}}/>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
         : prev.img && prev.img.length > 1 ?
         <div className="col-md-1 col-lg-1">
                {prev.img.map((item, index) =>{
                    return(
                        <div key={index} onClick={()=>{this.setState({activeStep: index})}} style={{cursor: "pointer", margin: 5}} className="col-md-12 col-lg-12">
                            <div className ={this.state.activeStep === index ? "cardItemPrevSmall-active" : "cardItemPrevSmall"}>
                                <img src={item} alt={'Product'} className="splash-card-product-view" style={{cursor: "pointer"}}/>
                            </div>
                        </div>
                    )
                })}
         </div>
            :undefined}
        {/* SMALL IMAGES PREVIEW END*/}
        </div>
        :undefined}

        {/* MAIN IMAGE SLIDER START*/}
         <div className="col-xs-12 col-md-5 col-lg-5">
            <div className="cardItemPrev">
               {prev.colors && prev.colors.length > 1 ?
                    <div>
                        <SwipeableViews 
                                axis={'x'}
                                index={this.state.activeStep}
                                onChangeIndex={this.handleStepChange}
                                enableMouseEvents
                                >
                                {prev.colors.map((step, index) => (
                                    <div key={index}>
                                    {Math.abs(this.state.activeStep - index) <= 2 ? (
                                        <img src={step.value} alt={'Step'} className="splash-card-product-view" />
                                    ) : null}
                                    </div>
                                ))}
                        </SwipeableViews>
                        {isMobile && 
                        <Grid  container justify={"center"} alignItems="center">
                            {prev.colors.map((dots, index) =>{
                                return(
                                    <DotIcon onClick={()=>{this.setState({activeStep: index})}} color={this.state.activeStep === index ? 'primary' : 'default'}/>
                                )
                            })}
                        </Grid>}
                    </div>
                : prev.img && prev.img.length > 1 ?
                <div>
                    <SwipeableViews 
                            axis={'x'}
                            index={this.state.activeStep}
                            onChangeIndex={this.handleStepChange}
                            enableMouseEvents
                            >
                            {prev.img.map((img, index) => (
                                <div key={index}>
                                {Math.abs(this.state.activeStep - index) <= 2 ? (
                                    <img src={img} alt={'Product'} className="splash-card-product-view" />
                                ) : null}
                                </div>
                            ))}
                    </SwipeableViews>
                    {isMobile && 
                        <Grid container justify={"center"} alignItems="center">
                            {prev.colors && prev.colors.map((dots, index) =>{
                                return(
                                    <DotIcon onClick={()=>{this.setState({activeStep: index})}} color={this.state.activeStep === index ? 'primary' : 'default'}/>
                                )
                            })}
                            {prev.img && prev.img.map((dots, index) =>{
                                return(
                                    <DotIcon onClick={()=>{this.setState({activeStep: index})}} color={this.state.activeStep === index ? 'primary' : 'default'}/>
                                )
                            })}
                        </Grid>}
                </div>
                :
               <img src={prev.defaultImage} alt={'Product'} className="splash-card-product-view" />}
               {prev.oldPrice && 
                <div id ="merchDiscount" className="card-body">
                <Chip
                    label={`${this.CalcDiscount(prev)}`}
                    className={classes.chipDiscount}
                    color={'secondary'}
                />
               </div>}
            </div>
         </div>
        {/* MAIN IMAGE SLIDER END*/}

        <div className="col-xs-12 col-md-6 col-lg-6">
                <Grid  container justify={"center"} alignItems="center">
                    <h1 style={{color: "white", wordBreak: 'break-word', fontFamily: 'arial'}}>{prev.Name}</h1>
                </Grid>
                <Grid  container justify={"center"} alignItems="center">
                        <CopyToClipboard text={`www.ggegypt.com/productpage/${prev._id}`}>
                            <Chip
                                onClick={()=>{this.setState({copied: true})}}
                                label={t('copylink')}
                                className={classes.chipCopy}
                            />
                        </CopyToClipboard>
                </Grid>
        </div>

         {/* START OF PRODUCT PRICE */}
         <div className="col-xs-12 col-md-6 col-lg-6">
            <Grid className={classes.grid2} container justify={"flex-start"} alignItems="center">
                {prev.oldPrice ? 
                        <div>
                            <h1 style={{color: "#3F51B5", fontFamily: 'arial', fontWeight: "bold"}}>{<CurrencyFormat value={prev.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h1>
                            <span style={{textDecoration: "line-through", color: "grey"}}>{<CurrencyFormat value={prev.oldPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />}</span> <span style={{fontWeight: "normal"}}>- {t('youSave')} {<CurrencyFormat value={discounted.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</span>
                        </div>
                    :
                        <h1 style={{color: "#3F51B5"}}>{<CurrencyFormat value={prev.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h1>
                }
            </Grid>
         </div>
         {/* END OF PRODUCT PRICE */}

         {/* START OF BUTTONS */}
         <div className="col-xs-12 col-md-6 col-lg-6">
            <div className="col-xs-6 col-md-6 col-lg-6">
                <Grid container justify="center" alignItems="center">
                    <Fab color="secondary" variant="extended" aria-label="Edit" onClick={()=>{
                        this.setState({view: "shop", 
                        selectedOpt: "", 
                        selectedColor: "", 
                        colors: [], 
                        sizes: [], 
                        options: [],
                        selectedSize: "",
                        activeStep: 0,
                        defaultOptAdded: false})}} 
                        className={classes.backFab}>
                        <BackIcon className={classes.extendedIcon2} />
                        {t('backToShop')}
                    </Fab>
                </Grid>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-6">
                <Grid container justify="center" alignItems="center">
                {this.props.cart.updatingCart ? 
                    <CircularProgress className={classes.progress} />
                :
                <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.addItemToCart(prev)}} className={classes.fab}>
                        <ShoppingCart className={classes.extendedIcon2} />
                        {t('addToCart')}
                    </Fab>}
                </Grid>
            </div>
        </div>
        {/* END OF BUTTONS */}

         <div style={{color: "white", fontSize: 15}} className="col-xs-12 col-md-6 col-lg-6">
            {prev._id === "5cb82c254e1efafcd06dc1fa" &&
            <div>
                <Grid container justify="center" alignItems="center">
                    <Fab variant="extended" aria-label="Next" onClick={()=>{this.openFortniteShop()}} className={classes.fab}>
                        <ViewIcon className={classes.extendedIcon2} />
                         {t('viewFortShop')}
                    </Fab>
                </Grid>
            </div>}

            {prev.colors && 
                i18next.language === 'EN' ? 
                <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <h4>{t('color')}:</h4>
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                            {this.state.colors.map((payload, index) => (
                                <MuiThemeProvider theme={chipTheme} key={index}>
                                    <Chip
                                        onClick={()=>{this.selectChange('selectedColor', payload)}}
                                        label={payload.label}
                                        className={classes.chip}
                                        variant={this.state.selectedColor === payload ? 'default' : 'outlined'}
                                        color={this.state.selectedColor === payload ? 'primary' : 'secondary'}
                                    />
                                </MuiThemeProvider>
                            ))}
                    </div>
                </div>
                :prev.colors && 
                i18next.language !== 'EN' ?
                <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <h4 style={{textAlign: 'right'}}>:{t('color')}</h4>
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                    <Grid container justify="flex-end" alignItems="flex-end">
                        {this.state.colors.map((payload, index) => (
                            <MuiThemeProvider theme={chipTheme} key={index}>
                                    <Chip
                                        onClick={()=>{this.selectChange('selectedColor', payload)}}
                                        label={payload.label}
                                        className={classes.chip}
                                        variant={this.state.selectedColor === payload ? 'default' : 'outlined'}
                                        color={this.state.selectedColor === payload ? 'primary' : 'secondary'}
                                    />
                            </MuiThemeProvider>
                        ))}
                    </Grid>
                    </div>
                </div>:undefined} 
                
                {prev.sizes && 
                i18next.language === 'EN' ?
                <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <h4>{t('size')}:</h4>
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        {this.state.sizes.map((payload, index) => (
                            <MuiThemeProvider theme={chipTheme} key={index}>
                                <Chip
                                    onClick={()=>{this.selectChange('selectedSize', payload)}}
                                    label={payload.label}
                                    className={classes.chip}
                                    variant={this.state.selectedSize === payload ? 'default' : 'outlined'}
                                    color={this.state.selectedSize === payload ? 'primary' : 'secondary'}
                                />
                            </MuiThemeProvider>
                        ))}
                    </div>
                </div>:
                prev.sizes && 
                i18next.language !== 'EN' ?
                <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <h4 style={{textAlign: 'right'}}>:{t('size')}</h4>
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                    <Grid container justify="flex-end" alignItems="flex-end">
                        {this.state.sizes.map((payload, index) => (
                            <MuiThemeProvider theme={chipTheme} key={index}>
                                <Chip
                                    onClick={()=>{this.selectChange('selectedSize', payload)}}
                                    label={payload.label}
                                    className={classes.chip}
                                    variant={this.state.selectedSize === payload ? 'default' : 'outlined'}
                                    color={this.state.selectedSize === payload ? 'primary' : 'secondary'}
                                />
                            </MuiThemeProvider>
                        ))}
                    </Grid>
                    </div>
                </div>:undefined} 

                {prev.options && i18next.language === 'EN' ?
                <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <h4>{t('option')}:</h4>
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        {this.state.options.map((payload, index) => (
                            <MuiThemeProvider theme={chipTheme} key={index}>
                                <Chip
                                    onClick={()=>{this.selectChange('selectedOpt', payload)}}
                                    label={payload.label}
                                    className={classes.chip}
                                    variant={this.state.selectedOpt === payload ? 'default' : 'outlined'}
                                    color={this.state.selectedOpt === payload ? 'primary' : 'secondary'}
                                />
                            </MuiThemeProvider>
                        ))}
                    </div>
                </div>:prev.options && i18next.language !== 'EN' ?
                <div className="col-xs-12 col-md-12 col-lg-12" style={{margin: 10}}>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <h4 style={{textAlign: 'right'}}>:{t('option')}</h4>
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <Grid container justify="flex-end" alignItems="flex-end">
                            {this.state.options.map((payload, index) => (
                                <MuiThemeProvider theme={chipTheme} key={index}>
                                    <Chip
                                        onClick={()=>{this.selectChange('selectedOpt', payload)}}
                                        label={payload.label}
                                        className={classes.chip}
                                        variant={this.state.selectedOpt === payload ? 'default' : 'outlined'}
                                        color={this.state.selectedOpt === payload ? 'primary' : 'secondary'}
                                    />
                                </MuiThemeProvider>
                            ))}
                        </Grid>
                    </div>  
                </div>:undefined} 
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={this.state.copied}
                    onClose={()=>{this.setState({ copied: false })}}
                    transitionDuration={500}
                    autoHideDuration={1000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<h4 id="message-id">{t('linkCopied')}</h4>}
                />
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
    </div>
    )
}
}

render(){
    const { t } = this.props;
    if(this.state.fetchingShop){
        return(
            <div className="GG-BG-INVERSE">
                <Loader />
                <Navbar page={1}/>
            </div>
        )
    }
    return(
        <div className="GG-BG-INVERSE">
            <Helmet>
                <title>{t('marketTitle')}</title>
                <meta name="description" content={t('marketTitle')} />
            </Helmet>
                {this.Market()}
                {this.ViewProduct()}
            <Navbar page={1}/>
            <Modal 
                open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
                styles={ErrorStyle}>
                <h3 className="col-xs-6">{this.state.ErrorMsg}</h3>
                <img style ={{width: 150, height: 120}} className="col-xs-6" src={amumu} alt=""></img> 
            </Modal>
        </div>
    );
}

}

function mapStateToProps(state){
    return {
        loginData: state.loginSession,
        cart: state.cartItems,
        server: state.server
    }
  }
  
const matchDispatchToProps = dispatch => bindActionCreators(
    {
        addCartItem
    },
    dispatch,
)

export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps, matchDispatchToProps),
)(Market);