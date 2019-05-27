import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../svg.css';
import '../flag-icon.css'
import i18n from '../i18n';
import i18next from 'i18next';
import Language from '@material-ui/icons/Language';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  },
}); 

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
}

class langIcon extends Component {

    state= {
        anchorEl: null,
        value: i18next.language === 'EN' ? 2 : i18next.language === 'EG' ? 0 : 1
    }


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
    
    setLanguage(lng, value){
      this.handleClose()
      changeLanguage(lng)
      this.setState({value: value})
    }

render(){
    const anchorEl = this.state.anchorEl

  return (

    <div>
    <React.Fragment>
        <Badge className={this.props.classes.margin} badgeContent={i18next.language} color="secondary">
        <Language fontSize="large" style={{cursor: "pointer"}}
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
        />
        </Badge>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
          <MenuItem selected={this.state.value === 0} onClick={()=>{this.setLanguage('EG', 0)}}><p style={{cursor: 'pointer', color: "black"}} ><span style={{cursor: 'pointer'}} className="flag-icon flag-icon-eg"></span> مصرى</p></MenuItem>
          <MenuItem selected={this.state.value === 1} onClick={()=>{this.setLanguage('AR', 1)}}><p style={{cursor: 'pointer', color: "black"}} ><span style={{cursor: 'pointer'}} className="flag-icon flag-icon-sa"></span> عربى</p></MenuItem>
          <MenuItem selected={this.state.value === 2} onClick={()=>{this.setLanguage('EN', 2)}}><p style={{cursor: 'pointer', color: "black"}} ><span style={{cursor: 'pointer'}} className="flag-icon flag-icon-gb"></span> English</p></MenuItem>
        </Menu>
    </React.Fragment>
    </div>
  );
}
}

langIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        cartInfo: state.updateCartInfo
    }
  }

export default withStyles(styles)(connect(mapStateToProps)(langIcon));