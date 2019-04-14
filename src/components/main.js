import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import Footer from './footer';
import "../image-gallery.css";
import {connect} from 'react-redux';
import ProductSlider from '../containers/product-slider';

class Main extends Component {

  componentWillReceiveProps (newProps) {
    if( newProps.lang.lang !== this.props.lang.lang ){
      window.location.reload()
    }
  }

render(){
  return(
    <div>
      <div className="bg-image">
        <Navbar page={"Main"}/>
        <div class="container" >
            <div class="badge-logo"/>
                  <ProductSlider />
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
