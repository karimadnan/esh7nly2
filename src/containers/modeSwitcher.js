import React from 'react';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {switchMode} from '../actions/index';
import { withNamespaces } from 'react-i18next';
import compose from 'recompose/compose';

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit ,
    },
  }); 

class Switches extends React.Component {

    changeMode(mode){
        this.props.switchMode(mode === 'dark' ? 'normal' : 'dark')
    }

  render() {
    return (
      <div>
        <Switch
          className={this.props.classes.margin}
          checked={this.props.settings.mode === "dark" ? true : false}
          onChange={()=>{this.changeMode(this.props.settings.mode)}}
          value={"checked"}
          color="secondary"
        />
      </div>
    );
  }
}


Switches.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state){
    return {
        settings: state.settings
    }
}
const matchDispatchToProps = dispatch => bindActionCreators(
    {
        switchMode
    },
    dispatch,
)
    
export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps, matchDispatchToProps),
)(Switches);