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

const images = [
  {
    original: tshirts,
    thumbnail: tshirts,
    originalTitle: "Gaming Merch",
    description: "High quality tshirts of your favorite games."
  },
  {
    original: fortnite,
    thumbnail: fortnite,
    originalTitle: "Fortnite",
    description: "Purchase the cheapest v-bucks out there.."
  },
  {
    original: league,
    thumbnail: league,
    originalTitle: "League of legends",
    description: "Get league of legends RP for the best price and the safest way.."
  },
  {
    original: steam,
    thumbnail: steam,
    originalTitle: "Steam Store",
    description: "Buy steam credit to get any game you want we will direcly mail you a steam gift card after purchase.."
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

class Main extends Component {


  // state = {
  //   News: [
  //     {date: "1/29/2019", title: "Testing title 1", content: "testing test testing test testing test."},
  //     {date: "1/28/2019", title: "Testing title 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque semper felis. Pellentesque faucibus congue molestie. In nec nisl ultricies, hendrerit urna eu, malesuada odio. Nam varius posuere purus vel molestie. Etiam nulla erat, vehicula vel tortor vitae, tempus hendrerit odio. Aliquam metus augue, condimentum a orci id, fermentum luctus tellus. Phasellus eget maximus libero. Morbi in ultrices magna. Suspendisse a ipsum sem. Sed id neque sed quam tristique iaculis quis eget felis. Phasellus vel vehicula dolor. Integer massa quam, pretium id metus nec, auctor bibendum enim. Nam in pretium augue. Maecenas maximus, nulla in facilisis gravida, lorem quam venenatis turpis, pulvinar ultricies justo enim vel orci. Maecenas ac tortor vel nunc lacinia posuere interdum sit amet nibh. Pellentesque volutpat nec nisl non tempus. Curabitur dignissim ipsum ac augue vestibulum, vel feugiat magna consequat. Nulla posuere ut lacus quis feugiat. Suspendisse fermentum viverra purus. Phasellus sagittis nunc iaculis lacus interdum lobortis. Suspendisse potenti. Proin accumsan erat tellus, sed tincidunt nunc efficitur id. Curabitur fringilla dapibus mattis. Donec ultrices porta pellentesque. Curabitur non ligula lacus."},

  //   ]
  //   }
  
  renderPage() {
  //   let array = [];
  //   for (var i = 0; i < this.state.News.length; i++) {
  //     array.push(i)
  //   } 
  //   let news = array.map(row => {
  //   let date = this.state.News[row].date

  //     return (
  //       <div key={row}>
  //         <div class="newsTitleBg">
  //             <div class="paraShit">
  //               <p>{moment(date).format('LL')}</p>
  //             </div>
  //             <div class="titleShit">
  //                 <h4>{this.state.News[row].title}</h4>
  //             </div>
  //         </div>

  //         <div style={{marginBottom: 10}} class ="newsContent">
  //           <p style={{fontSize: 16}}> {this.state.News[row].content}</p>
  //         </div>
  //      </div>             
  //       )
  // })

  return (
    
    <div class="container" >
        <br/>    <br/>     <br/>  
        <TypedJs  
          start={"Why Eshe7nly?"}
          strings={[
            '<font color="green">Safe and secured transactions.</font>',
            '<font color="aqua">Easy place and track your orders.</font>',
            '<font color="red">Fast customer support and delivery.</font>'
              ]}/>
        <br/>  
        <div class="badge-dark">
            <br/>  
              <div class="LightSlider">
                    <ImageGallery items={images} 
                                  autoPlay={true} 
                                  showFullscreenButton={false} 
                                  showPlayButton={true}
                                  showBullets={true}
                                  showThumbnails={false}
                                  slideInterval={6000}/>
            </div>
            
            <br/>  
            </div>     
    </div>
  )
}

  
render(){
  return(
    <div>
      <div className="bg-image">
        <Getlogin page={"Main"}/>
        {this.renderPage()}
        <br/>
        <Footer />
      </div>
    </div>
  )
}
}

export default Main;
