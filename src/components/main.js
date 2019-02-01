import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import Getlogin from './navbar';
import { Slide } from 'react-slideshow-image';
import moment from 'moment';
import crossfire from '../Images/crossfirepayment.png';
import fortnite from '../Images/917873.png';
import pubg from '../Images/pubg.jpg';
import tibia from '../Images/tibialanding.png';
import league from '../Images/leagueoffers.jpg';
import steam from '../Images/steampayment.jpg';
import { FacebookProvider, Page } from 'react-facebook';

const FB = window.FB;

class Main extends Component {

  state = {
    News: [
      {date: "1/29/2019", title: "Testing title 1", content: "testing test testing test testing test."},
      {date: "1/28/2019", title: "Testing title 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque semper felis. Pellentesque faucibus congue molestie. In nec nisl ultricies, hendrerit urna eu, malesuada odio. Nam varius posuere purus vel molestie. Etiam nulla erat, vehicula vel tortor vitae, tempus hendrerit odio. Aliquam metus augue, condimentum a orci id, fermentum luctus tellus. Phasellus eget maximus libero. Morbi in ultrices magna. Suspendisse a ipsum sem. Sed id neque sed quam tristique iaculis quis eget felis. Phasellus vel vehicula dolor. Integer massa quam, pretium id metus nec, auctor bibendum enim. Nam in pretium augue. Maecenas maximus, nulla in facilisis gravida, lorem quam venenatis turpis, pulvinar ultricies justo enim vel orci. Maecenas ac tortor vel nunc lacinia posuere interdum sit amet nibh. Pellentesque volutpat nec nisl non tempus. Curabitur dignissim ipsum ac augue vestibulum, vel feugiat magna consequat. Nulla posuere ut lacus quis feugiat. Suspendisse fermentum viverra purus. Phasellus sagittis nunc iaculis lacus interdum lobortis. Suspendisse potenti. Proin accumsan erat tellus, sed tincidunt nunc efficitur id. Curabitur fringilla dapibus mattis. Donec ultrices porta pellentesque. Curabitur non ligula lacus."},

    ]
    }

  
  Slideshow = () => {

     
    const properties = {
      duration: 2000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: false
    }
      return (
        <Slide {...properties}>

          <div className="each-slide">
          <img style ={{width: 350, height: 130}} class="col-lg-6" src={fortnite} alt=""></img>
            <div class="card-image-overlay">
                <div id ="slidedesc" class="card-body">
                    <h4 class ="card-title itemname" style = {{color: "white", fontSize: 20, fontWeight: 100, fontFamily: "impact", lineHeight: 0.5}}>
                       <span>Fortnite</span>
                    </h4>
                </div>
            </div>
          </div>
          
          <div className="each-slide">
          <img style ={{width: 350, height: 130}} class="col-xs-6" src={crossfire} alt=""></img>
          <div class="card-image-overlay">
                <div id ="slidedesc" class="card-body">
                    <h4 class ="card-title itemname" style = {{color: "white", fontSize: 20, fontWeight: 100, fontFamily: "impact", lineHeight: 0.5}}>
                       <span>Crossfire</span>
                    </h4>
                </div>
            </div>
          </div>
          <div className="each-slide">
          <img style ={{width: 350, height: 130}} class="col-xs-6" src={pubg} alt=""></img>
          <div class="card-image-overlay">
                <div id ="slidedesc" class="card-body">
                    <h4 class ="card-title itemname" style = {{color: "white", fontSize: 20, fontWeight: 100, fontFamily: "impact", lineHeight: 0.5}}>
                       <span>Pubg</span>
                    </h4>
                </div>
            </div>
          </div>
          <div className="each-slide">
          <img style ={{width: 350, height: 130}} class="col-xs-6" src={tibia} alt=""></img>
          <div class="card-image-overlay">
                <div id ="slidedesc" class="card-body">
                    <h4 class ="card-title itemname" style = {{color: "white", fontSize: 20, fontWeight: 100, fontFamily: "impact", lineHeight: 0.5}}>
                       <span>Tibia</span>
                    </h4>
                </div>
            </div>
          </div>
          <div className="each-slide">
          <img style ={{width: 350, height: 130}} class="col-xs-6" src={league} alt=""></img>
          <div class="card-image-overlay">
                <div id ="slidedesc" class="card-body">
                    <h4 class ="card-title itemname" style = {{color: "white", fontSize: 20, fontWeight: 100, fontFamily: "impact", lineHeight: 0.5}}>
                       <span>League of legends</span>
                    </h4>
                </div>
            </div>
          </div>
          <div className="each-slide">
          <img style ={{width: 350, height: 130}} class="col-xs-6" src={steam} alt=""></img>
          <div class="card-image-overlay">
                <div id ="slidedesc" class="card-body">
                    <h4 class ="card-title itemname" style = {{color: "white", fontSize: 20, fontWeight: 100, fontFamily: "impact", lineHeight: 0.5}}>
                       <span>Steam Games</span>
                    </h4>
                </div>
            </div>
          </div>
        </Slide>
      )}

  renderPage() {
    let array = [];
    for (var i = 0; i < this.state.News.length; i++) {
      array.push(i)
    } 
    let news = array.map(row => {
    let date = this.state.News[row].date

      return (
        <div>
          <div class="newsTitleBg">
              <div class="paraShit">
                <p>{moment(date).format('LL')}</p>
              </div>
              <div class="titleShit">
                  <h4>{this.state.News[row].title}</h4>
              </div>
          </div>

          <div class ="newsContent">
            <p style={{fontSize: 16}}> {this.state.News[row].content}</p>
          </div>
       </div>             
        )
  })

  return (
    
    <div >
              <div class="newsBody col-md-6 col-lg-6 col-xs-6">
                        {news}
              </div>
              <div class="col-md-offset-6 col-lg-offset-6 col-xs-offset-6">
                      <div class ="panelGames">
                        <div class="slideShit">
                        {this.Slideshow()}
                        </div>
                      </div>
              </div>
              <div class="col-md-offset-6 col-lg-offset-6 col-xs-offset-6 ">
                  <div class ="panelFb" >
                      <div class="fbShit">
                      <FacebookProvider appId="1984023341904164">
                      <Page style={{width: 317}}  showFacepile="false" href="https://www.facebook.com/EgyptianObama/" />
                    </FacebookProvider> 
              </div>
              </div>
              </div>
              <div class="col-md-offset-6 col-lg-offset-6 col-xs-offset-6">
                      <div class ="panelAds">
                      </div>
              </div>              
    </div>
  )
}

  
render(){
  return(
    <div>
      <Getlogin />
      <div className="bg-image">
      {this.renderPage()}
      </div>
    </div>
  )
}
}
export default Main;
