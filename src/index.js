import React from 'react';
import ReactDOM from 'react-dom';
import Flux from 'flux-react-router';
import './index.css'

import Main from './components/main';
import SignUp from './components/SignUp';
import Games from './components/Games';
import Payment from './components/PaymentTutorial';
import Checkout from './components/Checkout';
import FortniteShop from './components/FortniteShop';
import Admindashboard from './components/admindashboard';
import ContactUs from './components/ContactUs';
import Privacy from './components/privacypolicy';
import * as registerServiceWorker from './registerServiceWorker';

// localStorage.setItem("Server","http://192.168.1.7:4000/server/")
localStorage.setItem("Server"," https://esh7ntest.herokuapp.com/server/")

Flux.createRoute('/',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Main />,document.getElementById('root'));
})

Flux.createRoute('/main',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Main />,document.getElementById('root'));
})

Flux.createRoute('/signup',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<SignUp />,document.getElementById('root'));
})

Flux.createRoute('/games',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Games />,document.getElementById('root'));
})

Flux.createRoute('/payment',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Payment />,document.getElementById('root'));
})

Flux.createRoute('/fortniteshop',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<FortniteShop />,document.getElementById('root'));
})

Flux.createRoute('/admindashboard',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Admindashboard />,document.getElementById('root'));
})

Flux.createRoute('/contactus',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<ContactUs />,document.getElementById('root'));
})

Flux.createRoute('/privacy',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Privacy />,document.getElementById('root'));
})

Flux.createRoute('/checkout/{Price}/{Game}',function(p){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Checkout Value={p.Price} Game={p.Game}/>,document.getElementById('root'));
})

// ReactDOM.render(<Main />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker.unregister();

Flux.init();