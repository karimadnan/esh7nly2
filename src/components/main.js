import React, { Component } from 'react';
import Navbar from './navbar';
import ProductSlider from '../containers/product-slider';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';
import {Helmet} from "react-helmet";
import compose from 'recompose/compose';
import {connect} from 'react-redux';

class Main extends Component {

render(){

  const { t } = this.props;
if(this.props.settings.mode === 'dark'){
  return(
    <div className={"blackBackground"}>
        <Helmet>
            <title>{t('mainTitle')}</title>
            <meta name="description" content={t('mainTitle')} />
        </Helmet>
        <Navbar page={0}/>
            {i18next.language === "EN" ? 
            <div className="black-badge-logoEn"/>:
            <div className="black-badge-logoAr"/>}
        <ProductSlider />
    </div>
  )}
else{
  return(
    <div className={"whiteBackground"}>
        <Helmet>
            <title>{t('mainTitle')}</title>
            <meta name="description" content={t('mainTitle')} />
        </Helmet>
        <Navbar page={0}/>
            {i18next.language === "EN" ? 
            <div className="white-badge-logoEn"/>:
            <div className="white-badge-logoAr"/>}
        <ProductSlider />
    </div>
  )
}
}
}

function mapStateToProps(state){
  return {
      settings: state.settings
  }
}

export default compose(
  withNamespaces(),
  connect(mapStateToProps),
)(Main); 
