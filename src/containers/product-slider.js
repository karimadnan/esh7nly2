import "react-alice-carousel/lib/alice-carousel.css";
import '../Mycss.css';
import AliceCarousel from 'react-alice-carousel';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {isMobile} from 'react-device-detect';
import {fetchShopData} from '../actions/index';
import {bindActionCreators} from 'redux';
import { withNamespaces } from 'react-i18next';
import ReactRouter from 'flux-react-router';
import Loader from './loader';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    chipDiscount: {
        margin: theme.spacing.unit,
        fontSize: 10,
        [theme.breakpoints.up('sm')]: {
          fontSize: 17,
        }
    }
});

class NewProducts extends Component {

componentDidMount(){
    if(!this.props.shop.fetching){
        this.props.fetchShopData();
    }
}

Discounted(){
const { classes } = this.props;
const { t } = this.props;
if(this.props.shop.fetched){
let outPut = []
this.props.shop.items.map((item, index) =>{
    var rarity = "fortniteCard splash-cardTees rarity-"
    if(item.discount){
        outPut.push(            
        <div key={index} className={rarity} style={{margin: 5}} onClick={()=>{ReactRouter.goTo(`productpage/${item._id}`)}}>
            <img className="splash-card-product-view-constant" src={item.defaultImage} alt={item.id}/>
        
            <div className="overlayHover" >
                <button className="btn btn-primary btn-block" style={{color : "white"}}>
                    {t('viewButton')}
                </button>

                {item.discount > 0 && 
                <div id ="merchDiscount" className="card-body">
                    <Chip
                        label={`${item.discount}% ${t('discount')}`}
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
if(this.props.shop.fetched){
let outPut = []
this.props.shop.items.map((item, index) =>{
    var rarity = "fortniteCard splash-cardTees rarity-"
        outPut.push(            
        <div key={index} className={rarity} style={{margin: 5}} onClick={()=>{ReactRouter.goTo(`productpage/${item._id}`)}}>
            <img className="splash-card-product-view-constant" src={item.defaultImage} alt={item.id}/>
        
            <div className="overlayHover" >
                <button className="btn btn-primary btn-block" style={{color : "white"}}>
                    {t('viewButton')}
                </button>

            </div>
        </div> 
        )
    })
    return outPut
}
}

Micro(){
    const { t } = this.props;
    if(this.props.shop.fetched){
    let outPut = []
    this.props.shop.items.map((item, index) =>{
        var rarity = "fortniteCard splash-cardTees rarity-"
        if(item.category === 'micro'){
            outPut.push(            
            <div key={index} className={rarity} style={{margin: 5}} onClick={()=>{ReactRouter.goTo(`productpage/${item._id}`)}}>
                <img className="splash-card-product-view-constant" src={item.defaultImage} alt={item.id}/>
            
                <div className="overlayHover" >
                    <button className="btn btn-primary btn-block" style={{color : "white"}}>
                        {t('viewButton')}
                    </button>
    
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
    if(!this.props.shop.fetched){
        return(
            <div className="BlackBG" style={{margin: 10}}>
                <Loader />
            </div>
        )
    }
    return(
    <div className="BlackBG" style={{margin: 10}}>
        <h1 style={{color: "#3F51B5", textAlign: "center", fontWeight: "bold"}}>{t('micro')}</h1>
        <h3 style={{color: "white", textAlign: "center"}}>{t('microText')}</h3>
            <AliceCarousel
                items={this.Micro()}
                responsive={ {
                    0: { items: 1 },
                    1024: { items: 1 },
                }}
                autoPlayInterval={3000}
                autoPlayDirection="rtl"
                autoPlay={true}
                fadeOutAnimation={true}
                mouseDragEnabled={true}
                stopAutoPlayOnHover={true}
                dotsDisabled={true}
                buttonsDisabled={true}
                onSlideChange={this.onSlideChange}
                onSlideChanged={this.onSlideChanged}
            />

        <h1 style={{color: "#3F51B5", textAlign: "center", fontWeight: "bold"}}>{t('newProductsSlider')}</h1>
        <h3 style={{color: "white", textAlign: "center"}}>{t('newProductsSliderText')}</h3>
            <AliceCarousel
                items={this.New()}
                responsive={{
                    0: { items: 3 },
                    1024: { items: 3 },
                }
                }
                autoPlayInterval={3000}
                autoPlayDirection="rtl"
                autoPlay={true}
                fadeOutAnimation={true}
                mouseDragEnabled={true}
                stopAutoPlayOnHover={true}
                dotsDisabled={true}
                buttonsDisabled={true}
                onSlideChange={this.onSlideChange}
                onSlideChanged={this.onSlideChanged}
            />

        <h1 style={{color: "#3F51B5", textAlign: "center", fontWeight: "bold"}}>{t('discountsProductsSlider')}</h1>
        <h3 style={{color: "white", textAlign: "center"}}>{t('discountsProductsSliderText')}</h3>
            <AliceCarousel
                items={this.Discounted()}
                responsive={{
                    0: { items: 2 },
                    1024: { items: 2 },
                }
                }
                autoPlayInterval={5000}
                autoPlayDirection="rtl"
                autoPlay={true}
                fadeOutAnimation={true}
                mouseDragEnabled={true}
                stopAutoPlayOnHover={true}
                dotsDisabled={true}
                buttonsDisabled={true}
                onSlideChange={this.onSlideChange}
                onSlideChanged={this.onSlideChanged}
        />
    </div>
    )
}
}

function mapStateToProps(state){
    return {
        shop: state.shop,
    }
  }

  const matchDispatchToProps = dispatch => bindActionCreators(
    {
        fetchShopData
    },
    dispatch,
)

export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps, matchDispatchToProps),
)(NewProducts); 
