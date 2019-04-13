import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import {connect} from 'react-redux';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  },
});

function BadgeCart(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Badge className={classes.margin} badgeContent={props.cartInfo.totalItems} color="primary">
        <span className="glyphicon glyphicon-shopping-cart" style={{fontSize: 22, color: "white"}} ></span>
      </Badge>
    </React.Fragment>
  );
}

BadgeCart.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        cartInfo: state.updateCartInfo,
    }
  }

  export default withStyles(styles)(connect(mapStateToProps)(BadgeCart));