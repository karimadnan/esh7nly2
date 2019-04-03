import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import ImageGallery from 'react-image-gallery';
import fortnite from '../Images/slider/fort.png';
import pubg from '../Images/slider/pubg.jpg';
import tibia from '../Images/slider/tibialanding.png';
import league from '../Images/slider/league.png';
import steam from '../Images/slider/steam.jpg';
import tshirts from '../Images/slider/tshirts.png';
import Footer from './footer';
import "../image-gallery.css";
import TypedJs from './Typer';
import {connect} from 'react-redux';

class Main extends Component {

  state = {
    images: [
      {
        original: tshirts,
        thumbnail: tshirts,
        originalTitle: this.props.lang.lang === "EN" ? "Gaming Merch" : "بضائع الالعاب",
        description: this.props.lang.lang === "EN" ? "High quality tshirts of your favorite games." : "تشيرتس عالية الجودة من ألعابك المفضلة"
      },
      {
        original: fortnite,
        thumbnail: fortnite,
        originalTitle: "Fortnite",
        description: this.props.lang.lang === "EN" ? "Purchase the cheapest v-bucks out there.." : "اشحن ارخص فى-بكس"
      },
      {
        original: league,
        thumbnail: league,
        originalTitle: "League of legends",
        description: this.props.lang.lang === "EN" ? "Get league of legends RP for the best price and the safest way.." : "اضمن و ارخص طريقة تشترى بيها ار بى"
      },
      {
        original: steam,
        thumbnail: steam,
        originalTitle: "Steam Store",
        description: this.props.lang.lang === "EN" ? "Buy steam credit to get any game you want we will direcly mail you a steam gift card after purchase.." : " اشحن ستيم كريدت و اشترى اى لعبة  "
      },
      {
        original: tibia,
        thumbnail: tibia,
        originalTitle: "Tibia MMORPG",
        description: "Get premium account fast/cheap, you can also buy ingame cash as cheap as 50 L.E per 1kk.."
      },
      {
        original: pubg,
        thumbnail: pubg,
        originalTitle: "Player Unknown Battlegrounds",
        description: "Pubg .."
      }
    ]
    
  }
  componentWillReceiveProps (newProps) {
    if( newProps.lang.lang !== this.props.lang.lang ){
      window.location.reload()
    }
  }

render(){
  const lang = this.props.lang.lang 
  return(
    <div>
      <div className="bg-image">
        <Getlogin page={"Main"}/>
        <div class="container" >
            <div class="badge-logo"/>
            <TypedJs  
              start={lang === "EN" ? "Why GGegypt?" : "ليه تشترى؟"}
              strings=
              {lang === "EN" ?
                [
                '<font color="green">Safe and secured transactions.</font>',
                '<font color="aqua">Easy place and track your orders.</font>',
                '<font color="red">Fast customer support and delivery.</font>']
                :
                [
                '<font color="green">شحن امن و مضمون</font>',
                '<font color="aqua">اطلب و تتبع الاوردر بسهولة</font>',
                '<font color="red">خدمة عملاء و توصيل سريع</font>']
                }/>
            <br/>  

                <br/>  
                  <div class="LightSlider">
                        <ImageGallery items={this.state.images} 
                                      autoPlay={true} 
                                      showFullscreenButton={false} 
                                      showPlayButton={true}
                                      showBullets={true}
                                      showThumbnails={false}
                                      slideInterval={6000}/>

                
                <br/>  
                </div>     
        </div>
        <br/>
        <Footer />
      </div>

    </div>
  )
}
}

function mapStateToProps(state){
  return {
      lang: state.lang
  }
}

export default connect(mapStateToProps)(Main);
