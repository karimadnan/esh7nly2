import "react-alice-carousel/lib/alice-carousel.css";
import '../Mycss.css';
import AliceCarousel from 'react-alice-carousel';
import React, { Component } from 'react';
import {connect} from 'react-redux';

class NewProducts extends Component {

Discounted(){
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
                <div id ="merchDiscount" className="card-body">
                    <span style={{fontSize: 15, lineHeight: 2.5}} className="label label-danger">{item.discount}% {this.props.lang.lang === "EN" ? "off" : "خصم"}</span>
                </div> 
                }
            </div>
        </div> 
        )
        }
    })
    return outPut
}

New(){
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

responsive = {
    0: { items: 1 },
    1024: { items: 3 },
}

render(){
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
            showSlideInfo={true}
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
            showSlideInfo={true}
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

  

  export default connect(mapStateToProps)(NewProducts);