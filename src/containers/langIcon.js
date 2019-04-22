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

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  },
});


class langIcon extends Component {

    state= {
        anchorEl: null
    }


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
    
render(){
    const anchorEl = this.state.anchorEl
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    }
  return (

    <div>
    <React.Fragment>
        <Badge className={this.props.classes.margin} badgeContent={i18next.language} color="secondary">
        <span className="svg-icon svg-icon-globe" style={{cursor: "pointer"}}
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          >
        </span>
        </Badge>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
          <MenuItem onClick={()=>{this.handleClose, changeLanguage('AR')}}><a style={{cursor: 'pointer', color: "black"}} ><span style={{cursor: 'pointer'}} className="flag-icon flag-icon-eg"></span> عربى</a></MenuItem>
          <MenuItem onClick={()=>{this.handleClose, changeLanguage('EN')}}><a style={{cursor: 'pointer', color: "black"}} ><span style={{cursor: 'pointer'}} className="flag-icon flag-icon-gb"></span> English</a></MenuItem>
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