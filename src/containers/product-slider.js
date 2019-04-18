import "react-alice-carousel/lib/alice-carousel.css";
import '../Mycss.css';
import AliceCarousel from 'react-alice-carousel';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {isMobile} from 'react-device-detect';
import {fetchShopData} from '../actions/index';
import {bindActionCreators} from 'redux';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    border-color: red;
    margin: 0 auto;
`;

class NewProducts extends Component {

componentDidMount(){
this.props.fetchShopData();
}

Discounted(){
if(this.props.shop.fetched){
let outPut = []
this.props.shop.items.map((item) =>{
    var rarity = "card splash-cardTees rarity-"+item.rarity
    var counter = 0
    var key = item.Name + `-${counter}`
    var shopRandomize = item.img[Math.floor(Math.random() * item.img.length)]
    counter ++;
    if(item.discount){
        outPut.push(            
        <div key={key} className={rarity} style={{margin: 5}}>
            <img className="splash-card-product-view-constant" src={item.img[0]} alt={item.id}/>
        
            <div className="overlayHover" >
                <button className="btn btn-primary btn-block" style={{color : "white"}}>
                        View
                </button>

                {item.discount > 0 && 
                <div id ="merchDiscount" style={{width: isMobile && 60}}className="card-body">
                    <span style={{fontSize: isMobile ? 10 : 15, lineHeight: 2.5}} className="label label-danger">{item.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
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
if(this.props.shop.fetched){
let outPut = []
this.props.shop.items.map((item) =>{
    var rarity = "card splash-cardTees rarity-"+item.rarity
    var counter = 0
    var key = item.Name + `-${counter}`
    var shopRandomize = item.img[Math.floor(Math.random() * item.img.length)]
    counter ++;
        outPut.push(            
        <div key={key} className={rarity} style={{margin: 5}}>
            <img className="splash-card-product-view-constant" src={item.img[0]} alt={item.id}/>
        
            <div className="overlayHover" >
                <button className="btn btn-primary btn-block" style={{color : "white"}}>
                        View
                </button>

                {item.discount > 0 && 
                <div id ="merchDiscount" className="card-body">
                    <span style={{fontSize: 15, lineHeight: 2.5}} className="label label-danger">{item.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
                </div> 
                }
            </div>
        </div> 
        )
    })
    return outPut
}
}

responsive = {
    0: { items: 3 },
    1024: { items: 3 },
}

render(){
    if(!this.props.shop.fetched){
        return(
                <div>
                    <h1 style={{color: "white", textAlign: "center"}}> Loading...</h1>
                    <PacmanLoader
                    css={override}
                    sizeUnit={"px"}
                    size={100}
                    color={'#FFFF00'}
                    loading={true}/>
                </div>
        )
    }
    return(
    <div className="BlackBG">
        <h1 style={{color: "orange", textAlign: "center", fontWeight: "bold"}}>New Products</h1>
        <h3 style={{color: "white", textAlign: "center"}}>Take a look at our new arrivals</h3>
            <AliceCarousel
            items={this.New()}
            responsive={this.responsive}
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

        <h1 style={{color: "orange", textAlign: "center", fontWeight: "bold"}}>Discounts</h1>
        <h3 style={{color: "white", textAlign: "center"}}>Products that have a discount</h3>
            <AliceCarousel
            items={this.Discounted()}
            responsive={this.responsive}
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
        lang: state.lang
    }
  }

  const matchDispatchToProps = dispatch => bindActionCreators(
    {
        fetchShopData
    },
    dispatch,
)

  export default connect(mapStateToProps, matchDispatchToProps)(NewProducts);