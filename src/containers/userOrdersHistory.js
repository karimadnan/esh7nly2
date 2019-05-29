import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import Loader from '../containers/loader';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import i18next from 'i18next';

const styles = theme => ({
  typo1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    [theme.breakpoints.up('sm')]: {
      fontSize: 22,
    }
  },
  typo2: {
    fontSize: 16,
    color: '#212121',
    [theme.breakpoints.up('sm')]: {
      fontSize: 17,
    }
  },
});

class userOrdersHistory extends Component {

state = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': this.props.loginData.token},
    Url: this.props.server.main,
    ordersData: {},
    loaded: false,
    done: false
}

componentDidMount(){
  this.getUserOrderHistory();
}

getUserOrderHistory(){
    var that = this
    axios.get(`${this.state.Url}getUserHistory`, {headers: this.state.headers})
    .then(function (response) {
      that.setState({ordersData: response.data.data, loaded: true, done: true})
    })
    .catch(function (error) {
      that.setState({done: true})
    })
}

render(){
const { t } = this.props;
const { classes } = this.props;
if(this.state.done){
    if(this.state.loaded){
        if(this.state.ordersData){
          console.log(this.state.ordersData, "History")
        let history =  this.state.ordersData.map((order, index) =>{
            console.log(order, "Order")
          return(
              <div key={index}>
                <h1>test</h1>
              </div>
          )
        })
        return(
          <div>
            {history}
          </div>
        )
        }
        else{
          return(
            <div style={{textAlign: i18next.language === "EN" ? "left" : "right"}}>
              <Typography gutterBottom className={classes.typo1}>
                  {t('noOrderHistory1')}
              </Typography>
              <Typography gutterBottom className={classes.typo2}>
                  {t('noOrderHistory2')}
              </Typography>
            </div>
          )
        }
    }
    else{
      return(
        <Typography gutterBottom className={classes.typo1}>
            {t('HistoryError')}
        </Typography>
      )
    }
}
else {
  return(
        <Loader color={'black'}/>
  )
}
}
}

function mapStateToProps(state){
  return {
      loginData: state.loginSession,
      server: state.server,
  }
}

export default compose(
  withStyles(styles),
  withNamespaces(),
  connect(mapStateToProps),
)(userOrdersHistory);