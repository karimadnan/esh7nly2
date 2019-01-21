import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Flux from 'flux-react-router';


import App from './App';
import Main from './components/main';
import SignUp from './components/SignUp';
import Games from './components/Games';
import Payment from './components/PaymentTutorial';
import Checkout from './components/Checkout';
import * as registerServiceWorker from './registerServiceWorker';

// localStorage.setItem("Server","http://192.168.1.6:5000/")
localStorage.setItem("Server","https://esh7nlytest.herokuapp.com/")


Flux.createRoute('/',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Main />,document.getElementById('root'));
})

Flux.createRoute('/Main',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Main />,document.getElementById('root'));
})

Flux.createRoute('/SignUp',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<SignUp />,document.getElementById('root'));
})

Flux.createRoute('/Games',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Games />,document.getElementById('root'));
})

Flux.createRoute('/Payment',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Payment />,document.getElementById('root'));
})

Flux.createRoute('/Checkout/{Price}/{Game}',function(p){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Checkout Value={p.Price} Game={p.Game}/>,document.getElementById('root'));
})

// ReactDOM.render(<Main />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker.unregister();

Flux.init();