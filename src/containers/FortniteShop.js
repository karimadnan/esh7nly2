import React, { Component } from 'react';
import axios from 'axios';
import { css } from '@emotion/core';
import { withNamespaces } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Loader from './loader';

const override = css`
    display: block;
    border-color: red;
    margin: 0 auto;
`;

class FortniteShop extends Component {

  state ={
    loaded: false,
    loaded2: false,
    shop: [],
    shopRows: '',
    shopDate: '',
    ShopChoseItem: '',
    ShopChoseItemId: '',
    ShopChoseItemImg: '',
    ShopChosenImg: '',
    ItemFontColor: '',
    vbucksIcon: '',
    timeLeft: '',
    ShopChose: false
    }

    componentDidMount(){
        this.getData(); 
    }
    
    updateState(key, value) {
      this.setState({ [key]: value });
    }
    
    getData=() =>{
      if (!this.state.loaded) {
        axios.get('https://fnbr.co/api/shop', 
        {headers: { 'x-api-key': 'b4d7cae7-7047-4a17-83f6-b4e62091d328'}})
      .then(response => {
        var arr = []
        response.data.data.daily.forEach(element => {
             let object1 = {
              name: element.name,
              cost: element.price,
              img: element.images.icon,
              rarity: element.rarity,
              type: element.type
            }
            arr.push(object1)
          });
        response.data.data.featured.forEach(element => {
            let object2 = {
              name: element.name,
              cost: element.price,
              img: element.images.icon,
              rarity: element.rarity,
              type: element.type
           }
           arr.push(object2)
         });
         var rows = response.data.data.daily.length+response.data.data.featured.length
          this.setState({shopRows: rows, shop: arr, loaded: true, vbucksIcon: response.data.data.daily[0].priceIconLink, shopDate: response.data.data.date})
      })
      .catch(e => {
          console.log('Error: ', e.response)
      })
    }
    }

    RenderPage = () => {
      if(!this.state.loaded){
        return(
          <Loader color={'white'} />
        )
    }
    else{
      let shop = this.state.shop.map((image, index) => {
          var rarity = "fortniteCard splash-card rarity-"+image.rarity
          return (
            <div className="col-xs-12 col-md-3" key={index} >
              <Grid container justify="center" alignItems="center">
                <div className ={rarity} style={{color: "white"}}>
                  <img className="FortShop" src={image.img} alt={image.name}/>
                    <div className="card-image-overlay">
                        <div id ="itemdesc" className="card-body">
                            <h4 className ="card-title itemname">{image.name}</h4>
                            <p className="card-text itemprice">
                            <img src={this.state.vbucksIcon} alt={"VBucksIcon"} style ={{width: 20, height: 20}}/>{image.cost}</p>
                        </div>
                      </div>
                  </div>
                </Grid>
              </div>
          
            )
         });
         return(
            shop
         )
    }
    }

  render() {
    return (
      <span>
          {this.RenderPage()}
      </span>
    );
  }
}

export default withNamespaces()(FortniteShop);