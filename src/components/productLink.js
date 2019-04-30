import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCartItem, updateCartInfo, addPrev, updatePrev, addPrevOptions, removePrevOptions} from '../actions/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../Mycss.css';
import '../Respcss.css';
import CurrencyFormat from 'react-currency-format';
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import amumu from '../Images/amumusad.png';
import Chip from '@material-ui/core/Chip';
import { withNamespaces } from 'react-i18next';
import SwipeableViews from 'react-swipeable-views';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import BackIcon from '@material-ui/icons/SkipPrevious';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import Timer from '@material-ui/icons/Timer';
import moment from 'moment';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import FortniteShop from './FortniteShop';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import Navbar from './navbar';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import ReactRouter from 'flux-react-router';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';

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

const productTheme = createMuiTheme({
    palette: {
        primary: { 500: '#212121' }, // custom color in hex
        secondary: { 'A400': '#3F51B5' } // custom color in hex
    }
});

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
        color: 'white',
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 22,
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

class ProductPage extends Component {

    state = {
        url: this.props.server.main,
        copied: false,
        value: 0,
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
        productLoaded: false,
        productError: false
    }

    componentDidMount(){
        var that = this
        if(!this.state.productLoaded){
            axios.get(this.state.url+`getProduct?id=${this.props.id}`, {headers: {'Content-Type': 'application/json'}})
              .then(function (response) {
                console.log(response, "RESPONSEEEEEE")
                that.addItemToPrev(response.data.data[0]) 
            })
              .catch(function (error) {
                console.log(error, "ERRORRR")
                that.setState({productError: true})
            });
        }
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

    addItemToPrev(item){
        let object = {
            id: item._id,
            Name: item.Name,
            price: item.price,
            desc: item.desc,
            discount: item.discount,
            defaultImage: item.img[0],
            soldBy: item.soldBy,
            category: item.category,
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
         this.setState({productLoaded: true})
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
            items: 1
         }
        this.props.updateCartInfo(object, 'add')
    }

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
    
    current(){
        const { t } = this.props;
        const { classes } = this.props;
        const prev = this.props.cart.itemPrev
        if(this.state.value === 0){
            return(
                <div>
                    { prev.desc.split(",").map((place, index) =>
                        <ListItem key={index} className={classes.descStyle}>
                            <ListItemIcon style={{color: 'white'}}>{<DotIcon />}</ListItemIcon>
                            <ListItemText disableTypography primary={place} />
                        </ListItem>)}
    
                    {prev.category !== 'micro' &&
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <h2>{t('freeShippingText', { freeShipPrice })}</h2>
                    </div>}
                </div>
            )
        }
    }

    goBack(){
        if(this.interval){
            clearInterval(this.interval)
        }
        ReactRouter.goTo("/market")
    }

    ViewProduct(){
        const { t } = this.props;
        const { classes } = this.props;
        const prev = this.props.cart.itemPrev
        if (this.state.productLoaded){
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
        
                {prev.colors && prev.colors.length > 1 &&
                 <div className="col-xs-3 col-md-1 col-lg-1">
                    {this.state.colors.map((item) =>{
                        if(item.value){
                            return(
                                <div key={item.index} onClick={()=>{this.setState({activeStep: item.index})}} style={{cursor: "pointer", margin: 10}} className="col-xs-12 col-md-12 col-lg-12">
                                    <div className ={this.state.activeStep === item.index ? "cardItemPrevSmall-active" : "cardItemPrevSmall"}>
                                        <img src={item.value} className="splash-card-product-view" style={{cursor: "pointer", maxHeight: 53}}/>
                                    </div>
                                </div>
                            )
                        }
                    })}
                 </div>}
        
                 <div className={prev.colors && prev.colors.length > 1 ? 
                    "col-xs-9 col-md-5 col-lg-5" : "col-xs-12 col-md-6 col-lg-6"}>
                    <div className="cardItemPrev">
                       {this.state.colors.length > 1 ?
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
                            <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.setState({fortniteShop: true}), this.interval = setInterval(() => this.tick(), 1000)}} className={classes.fab}>
                                <ViewIcon className={classes.extendedIcon2} />
                                <h6>{t('viewFortShop')}</h6>
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
                        <div className="col-xs-12 col-md-6 col-lg-6">
                            <Grid container justify="center" alignItems="center">
                                <Chip
                                    label={t('productDetails')}
                                    className={classes.chip}
                                />
                            </Grid>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-6">

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
                        {this.current()}
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
        else{
            return(
                <div className="GG-BG-INVERSE">
                    <div className="container" style={{height: 300}}>
                        <h1 style={{color: "white", textAlign: "center"}}> {t('loading')}...</h1>
                        <PacmanLoader
                        css={override}
                        sizeUnit={"px"}
                        size={100}
                        color={'#FFFF00'}
                        loading={true}/>
                    </div>
                <Navbar page={1}/>
            </div>
            )
        }
    }

    render(){
        const { t } = this.props;
        if(this.state.productError || !this.props.id){
            return(
                <div className ="GG-BG-INVERSE">
                    <div className="container">
                    <div className="WhiteBG" style={{color: "black"}}>
                        <h1>404 (Not found)</h1>
                        <p> {t('This link does not exist')}.</p>
                    </div>
                    </div>
                <Navbar page={1}/>
              </div>
            )
        }
        return(
        <div className="GG-BG-INVERSE">
                {this.ViewProduct()}
            <Navbar page={1}/>
            <Modal 
                open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
                styles={ErrorStyle}>
                <h3 className="col-xs-6">{this.state.ErrorMsg}</h3>
                <img style ={{width: 150, height: 120}} className="col-xs-6" src={amumu} alt=""></img> 
            </Modal>
        </div>
        )
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
        addPrevOptions,
        removePrevOptions
    },
    dispatch,
)

export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps, matchDispatchToProps),
)(ProductPage); 
