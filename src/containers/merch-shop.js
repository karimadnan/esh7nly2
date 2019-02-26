import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addCartItem} from '../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import '../Mycss.css';
import '../games.css';
import '../Respcss.css';

class MerchShop extends Component {

    state = {
        size: 'S',
        color: 'b'
    }

    updateInput(key, value) {
        this.setState({ [key]: value });
    }

    notify = (id) => toast.success(`${id} added to cart!`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        });
    
    addItemToArray(item){
        let object = {
            id: item.id,
            Name: item.Name,
            price: item.price,
            img: item.img,
            rarity: item.rarity,
            size: this.state.size,
            quantity: 1
         }
         this.props.addCartItem(object)
    }

    createListItems(){

        return this.props.shop.map((item) =>{
            var rarity = "card splash-cardTees FortHover rarity-"+item.rarity

            return (
                <div class="col-md-6 col-md-6" key={item.id} >
                <div class ={rarity}>
                    <img class="FortShop"
                    onClick={() => {this.addItemToArray(item), this.notify(item.Name)}}
                    src={item.img}  style={{cursor: 'pointer'}} alt={item.id}/>
                   <div class="card-image-overlay">
                    <div id ="merchInfo" class="card-body">
                        <h4 class ="card-title itemname" style = {{color: "white", fontSize: 15, fontWeight: 300, fontFamily: "impact", lineHeight: 0.5}}>
                          <span>"{item.Name}"</span>
                        </h4>
                    </div>
                   </div>
                   <div id ="merchPrice" class="card-body">
                      <p style = {{color: "white", fontSize: 15, fontWeight: 300, fontFamily: "impact", lineHeight: 2.8}}>Price: {item.price} EGP</p>
                   </div>
                   <div id ="merchiDesc" class="card-body">
                      <p style = {{color: "white", fontSize: 15, fontWeight: 300, fontFamily: "impact", lineHeight: 2.8}}>ID: #{item.id}</p>
                   </div>
                </div>
            </div>
            )
        })
    }

    render(){
        return (
            <div>
            <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange={false}
                draggable={false}
                pauseOnHover={false}
              />
              <div class="container">
                <div style={{fontSize: 20, padding: 10}} class="badge-dark col-xs-12 col-md-4 col-lg-4">
                    <span style={{fontWeight: "bold"}}>Size: </span>
                    <button type="button" onClick={()=>{this.updateInput("size", "S")}} class={this.state.size === "S" ? 'btn btn-success btn-xs' : 'btn btn-primary btn-xs'}>Small</button>&nbsp;
                    <button type="button" onClick={()=>{this.updateInput("size", "M")}} class={this.state.size === "M" ? 'btn btn-success btn-sm' : 'btn btn-primary btn-sm'}>Medium</button>&nbsp;
                    <button type="button" onClick={()=>{this.updateInput("size", "L")}} class={this.state.size === "L" ? 'btn btn-success btn-md' : 'btn btn-primary btn-md'}>Large</button>&nbsp;
                    <button type="button" onClick={()=>{this.updateInput("size", "XL")}} class={this.state.size === "XL" ? 'btn btn-success btn-lg' : 'btn btn-primary btn-lg'}>XLarge</button>
                 </div>
              </div>
            <br/> <br/>
            <div class="col-xs-12 col-md-12 col-lg-12">
                <ul>
                    {this.createListItems()}
                </ul>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        shop: state.shop
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addCartItem: addCartItem}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(MerchShop);