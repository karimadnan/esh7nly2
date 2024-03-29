import React from 'react';
import ReactDOM from 'react-dom';
import Flux from 'flux-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import './Mycss.css';
import './svg.css';
import './flag-icon.css';
import 'react-toastify/dist/ReactToastify.min.css';
import "react-alice-carousel/lib/alice-carousel.css";

import Main from './components/main';
import SignUp from './components/SignUp';
import Market from './components/market';
import FortniteShop from './containers/FortniteShop';
import ContactUs from './components/ContactUs';
import Privacy from './components/privacypolicy';
import Account from './components/account';
import AgentDashboard from './components/agentDashboard';
import CheckOut from './components/checkout';
import Login from './components/login';
import ProductPage from './components/productLink';

// import TestPage from './components/testPage';
import * as registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createEncryptor from 'redux-persist-transform-encrypt';
import './i18n';

const key = "MyReduxSecretKeyPleaseKeepAway"
const encryptor = createEncryptor({
secretKey: key,
onError: function(error) {
console.log("ERROR",error)
}
})

const persistConfig = {
    key: 'session',
    storage,
    transforms: [encryptor]
  }

const persistedReducer = persistReducer(persistConfig, allReducers)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));
let persistor = persistStore(store)

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

Flux.createRoute('/fortniteshop',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><FortniteShop /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/contactus',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><ContactUs /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/account',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Account /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/privacy',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Privacy /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/agentdashboard',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><AgentDashboard /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/checkout',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><CheckOut /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/login',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><Login /></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/productpage/{id}',function(params){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><ProductPage id={params.id}/></PersistGate></Provider>,document.getElementById('root'));
})

Flux.createRoute('/productpage',function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><ProductPage /></PersistGate></Provider>,document.getElementById('root'));
})

// Flux.createRoute('/testpage',function(){
//     ReactDOM.unmountComponentAtNode(document.getElementById('root'));
//     ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><TestPage /></PersistGate></Provider>,document.getElementById('root'));
// })

registerServiceWorker.unregister();

Flux.init();
