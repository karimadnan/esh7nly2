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

class NewProducts extends Component {

componentDidMount(){
    this.props.fetchShopData();
}

Discounted(){
const { t } = this.props;
if(this.props.shop.fetched){
let outPut = []
this.props.shop.items.map((item, index) =>{
    var rarity = "card splash-cardTees rarity-"+item.rarity
    if(item.discount){
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

New(){
const { t } = this.props;
if(this.props.shop.fetched){
let outPut = []
this.props.shop.items.map((item, index) =>{
    var rarity = "card splash-cardTees rarity-"+item.rarity
        outPut.push(            
        <div key={index} className={rarity} style={{margin: 5}} onClick={()=>{ReactRouter.goTo(`productpage/${item._id}`)}}>
            <img className="splash-card-product-view-constant" src={item.defaultImage} alt={item.id}/>
        
            <div className="overlayHover" >
                <button className="btn btn-primary btn-block" style={{color : "white"}}>
                    {t('viewButton')}
                </button>

                {item.discount > 0 && 
                <div id ="merchDiscount" className="card-body">
                    <span style={{fontSize: 15, lineHeight: 2.5}} className="label label-danger">{item.discount}% {t('discount')}</span>
                </div> 
                }
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
        var rarity = "card splash-cardTees rarity-"+item.rarity
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
            <div className="BlackBG">
                <Loader />
            </div>
        )
    }
    return(
    <div className="BlackBG">
        <h1 style={{color: "orange", textAlign: "center", fontWeight: "bold"}}>{t('micro')}</h1>
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

        <h1 style={{color: "orange", textAlign: "center", fontWeight: "bold"}}>{t('newProductsSlider')}</h1>
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

        <h1 style={{color: "orange", textAlign: "center", fontWeight: "bold"}}>{t('discountsProductsSlider')}</h1>
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

  export default withNamespaces()(connect(mapStateToProps, matchDispatchToProps)(NewProducts));