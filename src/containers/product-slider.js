import AliceCarousel from 'react-alice-carousel';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {isMobile} from 'react-device-detect';
import { withNamespaces } from 'react-i18next';
import ReactRouter from 'flux-react-router';
import Loader from './loader';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LeftArrow from '@material-ui/icons/ArrowBackIos';
import RightArrow from '@material-ui/icons/ArrowForwardIos';
import i18next from 'i18next';
import amumu from '../Images/amumusad.png';

const styles = theme => ({
    slideNav:{
        marginTop: theme.spacing.unit * 6,
        cursor: 'pointer',
        '&:hover': {
            color: '#3F51B5',
          },
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing.unit * 15
          }
    },
    titleFont: {
        fontFamily: 'arial',
        margin: 5,
        fontSize: 25,
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
          fontSize: 30,
        }
    },
    chipDiscount: {
        margin: theme.spacing.unit,
        backgroundColor: '#F44336',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
        maxHeight: 15,
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
});

class NewProducts extends Component {

    state ={
        fetchingShop: false,
        fetchedShop: false,
        errorFetchingShop: false,
        shopData: [],
        url: this.props.server.main,
        headers: {
            'Content-Type': 'application/json'}
    }

componentDidMount(){
    this.fetchShop();
}

fetchShop(){
    let query = {}
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

CalcDiscount(product){
    const { t } = this.props
    var discount = ''
    if(product.discount === '%'){
        discount = `${product.price / product.oldPrice * 100}%`
    }
    else if (product.discount === 'EGP'){
        discount = `${t('currency')} ${product.oldPrice - product.price} `
    }
    return discount
}

Discounted(){
const { classes } = this.props;
const { t } = this.props;

if(this.state.shopData){
let outPut = []
this.state.shopData.map((item, index) =>{
    var rarity = "fortniteCard splash-cardTees"
    if(item.oldPrice){
        outPut.push(            
        <div key={index} className={rarity} style={{margin: 5}} onClick={()=>{ReactRouter.goTo(`productpage/${item._id}`)}}>
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
                        label={`${this.CalcDiscount(item)} ${t('discount')}`}
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

New(){
const { t } = this.props;
const { classes } = this.props;

if(this.state.shopData){
let outPut = []
this.state.shopData.map((item, index) =>{
    var rarity = "fortniteCard splash-cardTees rarity-"
    if(item.category !== 'micro'){
        outPut.push(            
        <div key={index} className={rarity} style={{margin: 5}} onClick={()=>{ReactRouter.goTo(`productpage/${item._id}`)}}>
            <img className="splash-card-product-view-constant" src={item.defaultImage} alt={item.id}/>
        
            <div className="overlayHover" >

                <div id="ViewButton">
                    <Chip
                        label={t('viewButton')}
                        className={classes.chipView}
                        color={'default'}
                    />
                </div>

            </div>
        </div> 
        )
    }
    })
    return outPut
}
}

Micro(){
    const { t } = this.props;
    const { classes } = this.props;

    if(this.state.shopData){
    let outPut = []
    this.state.shopData.map((item, index) =>{
        var rarity = "fortniteCard splash-cardTees"
        if(item.category === 'games'){
            outPut.push(            
            <div key={index} className={rarity} style={{margin: 5}} onClick={()=>{ReactRouter.goTo(`productpage/${item._id}`)}}>
                <img className="splash-card-product-view-constant" src={item.defaultImage} alt={item.id}/>
            
                <div className="overlayHover" >

                    <div id="ViewButton">
                        <Chip
                            label={t('viewButton')}
                            className={classes.chipView}
                            color={'default'}
                        />
                    </div>
    
                    {item.discount > 0 && 
                    <div id ="merchDiscount" style={{width: isMobile && 60}}className="card-body">
                        <span style={{fontSize: isMobile ? 10 : 15, lineHeight: 2.5}} className="label label-danger">{item.discount}% {t('discount')}</span>
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



render(){
    const { t } = this.props;
    const { classes } = this.props;

    if(this.state.errorFetchingShop){
        return(
        <Grid container justify="center" alignItems="center">
            <h1 style={{textAlign: "center"}}> {t('403')} :(</h1>
            <img style ={{width: 150, height: 120}} src={amumu} alt=""/>
        </Grid>
        )
    }

    return( 
    <div className="container">

            <div className="col-xs-12 col-md-12 col-lg-12">
                <div className={i18next.language === "EN" ? "textBackgroundEng" : "textBackgroundAr"}>
                    <Grid container justify={i18next.language === "EN" ? "flex-start" : "flex-end"}>
                            <Typography className={classes.titleFont} style={{color: this.props.settings.mode === "dark" ? "#c5c5cc" : "#212121"}}>
                                {t('micro')}
                            </Typography>
                    </Grid>
                </div>
            </div>

            {this.state.fetchingShop ?
                <Loader size={60}/>
            : 
            <div className="col-xs-12 col-md-12 col-lg-12">
                {!isMobile && <div className="col-xs-2 col-md-1 col-lg-1">
                    <Grid container justify="center" alignItems="center">
                        <LeftArrow className={classes.slideNav} fontSize="large" onClick={() => this.Games.slidePrev()}/>
                    </Grid>
                </div>}
                <div className={!isMobile ? "col-xs-8 col-md-10 col-lg-10" : "col-xs-12 col-md-12 col-lg-12" }>
                    <AliceCarousel
                        items={this.Micro()}
                        responsive={ {
                            0: { items: 1 },
                            1024: { items: 1 },
                        }}
                        autoPlayInterval={5000}
                        autoPlayDirection="ltr"
                        autoPlay={false}
                        mouseDragEnabled={false}
                        stopAutoPlayOnHover={true}
                        dotsDisabled={false}
                        buttonsDisabled={true}
                        ref={(el) => (this.Games = el)}
                    />
                </div>
                {!isMobile && <div className="col-xs-2 col-md-1 col-lg-1">
                    <Grid container justify="center" alignItems="center">
                        <RightArrow className={classes.slideNav} fontSize="large" onClick={() => this.Games.slideNext()}/>
                    </Grid>
                </div>}
            </div>}

            <div className="col-xs-12 col-md-12 col-lg-12">
                <div className={i18next.language === "EN" ? "textBackgroundEng" : "textBackgroundAr"}>
                    <Grid container justify={i18next.language === "EN" ? "flex-start" : "flex-end"}>
                            <Typography className={classes.titleFont} style={{color: this.props.settings.mode === "dark" ? "#c5c5cc" : "#212121"}}>
                                {t('discountsProductsSlider')}
                            </Typography>
                    </Grid>
                </div>
            </div>
            
            {this.state.fetchingShop  ?
                <Loader size={60}/>
            :
            <div className="col-xs-12 col-md-12 col-lg-12">
                {!isMobile && <div className="col-xs-2 col-md-1 col-lg-1">
                    <LeftArrow className={classes.slideNav} fontSize="large" onClick={() => this.Discounts.slidePrev()}/>
                </div>}
                <div className={!isMobile ? "col-xs-8 col-md-10 col-lg-10" : "col-xs-12 col-md-12 col-lg-12" }>
                <AliceCarousel
                    items={this.Discounted()}
                    responsive={{
                        0: { items: 2 },
                        1024: { items: 2 },
                    }
                    }
                    autoPlayInterval={5000}
                    autoPlayDirection="ltr"
                    autoPlay={false}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    stopAutoPlayOnHover={true}
                    dotsDisabled={false}
                    buttonsDisabled={true}
                    ref={(el) => (this.Discounts = el)}
                />
                </div>
                {!isMobile && <div className="col-xs-2 col-md-1 col-lg-1">
                    <RightArrow className={classes.slideNav} fontSize="large" onClick={() => this.Discounts.slideNext()}/>
                </div>}
            </div>}

    </div>
    )
}
}

function mapStateToProps(state){
    return {
        server: state.server,
        settings: state.settings
    }
  }

export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps),
)(NewProducts); 
