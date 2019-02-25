import React from 'react';
import ReactDOM from 'react-dom';
import Flux from 'flux-react-router';
import './index.css'

import Main from './components/main';
import SignUp from './components/SignUp';
import Market from './components/Games';
import Payment from './components/PaymentTutorial';
import Cart from './containers/cart-details';
import FortniteShop from './components/FortniteShop';
import Getlogin from './components/navbar';
import Admindashboard from './components/admindashboard';
import ContactUs from './components/ContactUs';
import Privacy from './components/privacypolicy';
import * as registerServiceWorker from './registerServiceWorker';

import {createStore} from 'redux';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import createEncryptor from 'redux-persist-transform-encrypt'

const key = "MyReduxSecretKeyPleaseKeepAway"
const encryptor = createEncryptor({
secretKey: key,
onError: function(error) {
console.log("ERROR",error)
}
})

const persistConfig = {
    key: 'root',
    storage,
    transforms: [encryptor]
  }

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
let persistor = persistStore(store)

// localStorage.setItem("Server","http://192.168.1.7:4000/server/")
localStorage.setItem("Server"," https://esh7ntest.herokuapp.com/server/")

Flux.createRoute('/',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Main /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/main',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Main /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/signup',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><SignUp /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/market',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Market /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Getlogin /></PersistGate></Provider>,document.getElementById('root'));
})


Flux.createRoute('/payment',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Payment /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/fortniteshop',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><FortniteShop /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/admindashboard',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Admindashboard /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/contactus',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><ContactUs /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/privacy',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Privacy /></PersistGate></Provider>,document.getElementById('root'));
})

// ReactDOM.render(   
// <Provider store={store} >
//     <Main />    
// </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA


registerServiceWorker.unregister();

Flux.init();
