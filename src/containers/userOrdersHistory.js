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
import { fade } from '@material-ui/core/styles/colorManipulator';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const styles = theme => ({
  card:{
    backgroundColor: fade('#3F51B5', 0.225),
    margin: theme.spacing.unit
  },
  avatarPassed: {
    backgroundColor: fade('#4CAF50', 0.725),
    height: 60,
    width: 60,
  },
  avatarFailed: {
    backgroundColor: fade('#F44336', 0.725),
    height: 60,
    width: 60,
  },
  media: {
    height: 70,
  },
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
  chipView: {
    margin: theme.spacing.unit,
    fontSize: 11,
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
    }
},
statusFont: {
  fontSize: 13,
  color: 'white',
  [theme.breakpoints.up('sm')]: {
    fontSize: 16,
  }
},
headerFont: {
  fontSize: 10,
  color: '#212121',
  [theme.breakpoints.up('sm')]: {
    fontSize: 13,
  }
},
headerFont2: {
  fontSize: 10,
  color: '#212121',
  fontWeight: 'bold',
  [theme.breakpoints.up('sm')]: {
    fontSize: 13,
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
    done: false,
    slideIndex: 0
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
          return(
              <div key={index} className="col-xs-12 col-md-12 col-lg-12">
                <Card className={classes.card}>
                  <CardHeader
                      avatar={
                        <Avatar aria-label="Order" className={order.status === 'Passed' ? classes.avatarPassed : classes.avatarFailed}>
                          <Typography gutterBottom className={classes.statusFont}>
                            {order.status === 'Passed' ? "Passed" : "Failed"}
                          </Typography>
                        </Avatar>
                      }
                      title={
                        <Typography gutterBottom className={classes.headerFont2}>
                            Paid by: {order.paymentMethod}
                        </Typography>}
                      subheader={
                        <Typography gutterBottom className={classes.headerFont}>
                            Order Finished At {moment(order.enddedAt).format('LL')}
                        </Typography>}
                    />
                    <CardMedia image={'Null'}>
                    <AliceCarousel
                        items={order.cart.map((image, index)=>{
                          return(
                          <div key={index}>
                            <Grid container justify="center" alignItems="center">
                              <img src={image.defaultImage} alt={'Product'} className="userOrdersImages" />
                            </Grid>
                          </div>
                        )})}
                        responsive={ {
                            0: { items: 3 },
                            1024: { items: 3 },
                        }}
                        autoPlayInterval={3000}
                        autoPlayDirection="rtl"
                        autoPlay={order.cart && order.cart.length > 1 ? true : false}
                        fadeOutAnimation={true}
                        mouseDragEnabled={false}
                        stopAutoPlayOnHover={true}
                        dotsDisabled={true}
                        buttonsDisabled={order.cart && order.cart.length > 1 ? false : true}
                        onSlideChange={this.onSlideChange}
                        onSlideChanged={this.onSlideChanged}
                        showSlideInfo={order.cart && order.cart.length > 1 ? true : false}
                    />
                    </CardMedia>
                  <CardActionArea>
                    <CardContent>
                      <Typography className={classes.headerFont2}>
                        Last Comment:
                      </Typography>
                      <Typography className={classes.headerFont}>
                          {order.comment}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Grid container justify="center" alignItems="center">
                      <Chip
                            label={`Order ID: ${order._id}`}
                            className={classes.chipView}
                            color={'primary'}
                        />
                    </Grid>
                  </CardActions>
                </Card>
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