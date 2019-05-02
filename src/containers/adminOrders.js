import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import VodafoneCashLogo from '../Images/Vodacash.png';
import EtisalatCashLogo from '../Images/Etiscash.png';
import FawryLogo from '../Images/fawrypaymenttest.png';
import CashOnDeliveryLogo from '../Images/cash-on-delivery.png';
import { ToastContainer, toast, Flip } from 'react-toastify';
import Loader from '../containers/loader';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit,
      overflowX: 'auto',
    }
});

class AdminOrders extends Component {

    state = {
        headers: {
        'Content-Type': 'application/json',
        'authorization': this.props.loginData.token},
        Url: this.props.server.main
    }

    componentDidMount(){
        var that = this
        axios.get(`${this.state.Url}getAdminOrders`, {headers: this.state.headers})
        .then(function (response) {
          console.log(response, "ORDERS")
        })
        .catch(function (error) {
            // console.log(error)
        })
    }

    render(){
        return(
            <h1>Admin Orders</h1>
        )
    }
}

function mapStateToProps(state){
    return {
        loginData: state.loginSession,
        server: state.server
    }
  }

export default withStyles(styles)(connect(mapStateToProps)(AdminOrders));