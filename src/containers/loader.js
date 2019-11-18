import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    border-color: red;
    margin: 0 auto;
`;

class Loader extends Component {


render(){
    const { t } = this.props;
    return(
        <div className="container" style={{height: 300}}>
            <h1 style={{color: this.props.color || 'white', textAlign: "center"}}> {t('loading')}...</h1>
            <PacmanLoader
                css={override}
                sizeUnit={"px"}
                size={this.props.size || 100}
                color={'#FFFF00'}
                loading={true}/>
        </div>
    )
}


}

export default withNamespaces()(Loader);