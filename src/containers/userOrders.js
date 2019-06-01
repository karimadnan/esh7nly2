import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import compose from 'recompose/compose';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Tooltip from '@material-ui/core/Tooltip';
import BackIcon from '@material-ui/icons/SkipPrevious';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Euro from '@material-ui/icons/EuroSymbol';
import OrderStatus from '@material-ui/icons/WatchLater';
import OrderComment from '@material-ui/icons/SpeakerNotes';
import CurrencyFormat from 'react-currency-format';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import i18next from 'i18next';
import Loader from '../containers/loader';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = theme => ({
    cardEN:{
        backgroundColor: fade('#3F51B5', 0.225),
        margin: theme.spacing.unit,
        minHeight: 350,
        maxHeight: 350,
        maxWidth: 'auto',
        borderLeft: '3px solid #3F51B5',
        '&:hover': {
            backgroundColor: fade('#3F51B5', 0.325),
          }
      },
    cardAR:{
        backgroundColor: fade('#3F51B5', 0.225),
        margin: theme.spacing.unit,
        minHeight: 350,
        maxHeight: 350,
        maxWidth: 'auto',
        borderRight: '3px solid #3F51B5',
        '&:hover': {
            backgroundColor: fade('#3F51B5', 0.325),
          }
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
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    mediaCard: {
        height: 150,
        width: 120,
      },
    firstComment: {
        margin: theme.spacing.unit,
        fontSize: 11,
        color: '#3F51B5',
        [theme.breakpoints.up('sm')]: {
          fontSize: 15,
        }
    },
    pending: {
        margin: 10,
        width: 60,
        height: 60,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: fade('#ff9800', 0.825),
      },
    ongoing: {
        margin: 10,
        width: 60,
        height: 60,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#3f51b5',
      },
    fab: {
        margin: theme.spacing.unit,
      },
      extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    Avatar: {
        margin: 10,
    },
    headerFont2: {
        fontSize: 10,
        color: '#212121',
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
          fontSize: 15,
        }
    },
    card: {
        minHeight: 350,
        maxHeight: 350,
        marginBottom: theme.spacing.unit,
        backgroundColor: fade('#3F51B5', 0.225),
        maxWidth: 'auto',
        '&:hover': {
            backgroundColor: fade('#3F51B5', 0.325),
          }
      },
    viewOrder: {
          color: '#fff',
          cursor: 'pointer',
        '&:hover': {
          color: fade('#3F51B5', 0.53),
        },
      },

    row: {
        backgroundColor: fade('#3F51B5', 0.525),
      '&:nth-of-type(odd)': {
        backgroundColor: fade('#3F51B5', 0.325),
      },
    },
});

class UserOrders extends Component {

state = {
headers: {
  'Content-Type': 'application/json',
  'authorization': this.props.loginData.token},
Url: this.props.server.main,
ordersData: {},
MyRow:'',
showRow:false,
loaded: false
}

componentDidMount(){
    this.loadOrderData();
}

loadOrderData(){
if (!this.state.loaded){
    var that = this
    axios.get(`${this.state.Url}getOrderForuser`, {headers: this.state.headers})
    .then(function (response) {
        that.setState({ordersData: response.data.data, loaded: true})
    })
    .catch(function (error) {
        that.setState({loaded: true})
    })
    }
}

drawOrderCards(){
    const { classes } = this.props;
    const { t } = this.props; 
    if(i18next.language === "EN"){
        return (
            this.state.ordersData.map((row, index) => (
                <div key={index}>
                    <Tooltip title={<h6>{t('View')}</h6>} aria-label={'View'} placement="top">
                        <div className="col-xs-12 col-md-4 col-lg-4" key={index}>
                            <Card className={classes.cardEN} onClick={ () => {this.setState({MyRow: row, showRow: true})}} style={{cursor: 'pointer'}}>
                            <CardHeader
                                avatar={
                                    row.status === 'pending' ?
                                    <Avatar className={classes.pending}>{t('statusPending')}</Avatar>
                                :row.status === 'onGoing' ?
                                    <Avatar className={classes.ongoing}>{t('statusOngoing')}</Avatar>              
                                :undefined}

                                title={                        
                                    <Typography gutterBottom className={classes.headerFont2}>
                                       {t('orderPaymentMethod')}: {row.paymentMethod} 
                                    </Typography>}
                                subheader={<h5>{moment(row.createdAt).format('LL')}</h5>}
                                />
                                <Grid container justify="center" alignItems="center">
                                    <Typography className={classes.firstComment}>
                                        {row.comment.length > 40 ? (((row.comment).substring(0,40-3)) + '...') : row.comment}
                                    </Typography>
                                </Grid>
                                <Divider variant="middle" className={classes.divider}/>
                                <CardMedia image={'null'}>
                                <AliceCarousel
                                    items={row.cart.map((image, index)=>{
                                    return(
                                    <div key={index}>
                                        <Grid container justify="center" alignItems="center">
                                            <img src={image.defaultImage} alt={'Product'} className="userOrdersImages" />
                                        </Grid>
                                    </div>
                                    )})}
                                    responsive={ {
                                        0: { items: 1 },
                                        1024: { items: 1 },
                                    }}
                                    autoPlayInterval={3000}
                                    autoPlayDirection="rtl"
                                    autoPlay={row.cart && row.cart.length > 1 ? true : false}
                                    fadeOutAnimation={true}
                                    mouseDragEnabled={false}
                                    stopAutoPlayOnHover={true}
                                    dotsDisabled={true}
                                    buttonsDisabled={true}
                                    onSlideChange={this.onSlideChange}
                                    onSlideChanged={this.onSlideChanged}
                                    showSlideInfo={row.cart && row.cart.length > 1 ? true : false}
                                />
                                </CardMedia>
                            </Card>
                        </div>
                    </Tooltip>
                </div>)
                )
            )
    }
    else{
        return (
            this.state.ordersData.map((row, index) => (
                <div key={index} style={{textAlign: 'right'}}>
                    <Tooltip title={<h6>{t('View')}</h6>} aria-label={'View'} placement="top">
                        <div className="col-xs-12 col-md-4 col-lg-4" key={index}>
                            <Card className={classes.cardAR} onClick={ () => {this.setState({MyRow: row, showRow: true})}} style={{cursor: 'pointer'}}>
                            <CardHeader
                                avatar={
                                    row.status === 'pending' ?
                                    <Avatar className={classes.pending}>{t('statusPending')}</Avatar>
                                :row.status === 'onGoing' ?
                                    <Avatar className={classes.ongoing}>{t('statusOngoing')}</Avatar>               
                                :undefined}

                                title={                        
                                <Typography gutterBottom className={classes.headerFont2}>
                                    {row.paymentMethod} :{t('orderPaymentMethod')} 
                                </Typography>}
                                subheader={<h5>{moment(row.createdAt).format('LL')}</h5>}
                                />
                                <Grid container justify="center" alignItems="center">
                                    <Typography className={classes.firstComment}>
                                        {row.comment.length > 40 ? (((row.comment).substring(0,40-3)) + '...') : row.comment}
                                    </Typography>
                                </Grid>
                                <Divider variant="middle" className={classes.divider}/>
                                <CardMedia image={'null'}>
                                <AliceCarousel
                                    items={row.cart.map((image, index)=>{
                                    return(
                                    <div key={index}>
                                        <Grid container justify="center" alignItems="center">
                                            <img src={image.defaultImage} alt={'Product'} className="userOrdersImages" />
                                        </Grid>
                                    </div>
                                    )})}
                                    responsive={ {
                                        0: { items: 1 },
                                        1024: { items: 1 },
                                    }}
                                    autoPlayInterval={3000}
                                    autoPlayDirection="rtl"
                                    autoPlay={row.cart && row.cart.length > 1 ? true : false}
                                    fadeOutAnimation={true}
                                    mouseDragEnabled={false}
                                    stopAutoPlayOnHover={true}
                                    dotsDisabled={true}
                                    buttonsDisabled={true}
                                    onSlideChange={this.onSlideChange}
                                    onSlideChanged={this.onSlideChanged}
                                    showSlideInfo={row.cart && row.cart.length > 1 ? true : false}
                                />
                                </CardMedia>
                            </Card>
                        </div>
                    </Tooltip>
                </div>)
                )
            )        
    }
}

orderOpen(){
    const { t } = this.props;
    const { classes } = this.props; 
    var steps = [`${t('orderPending')}`, `${t('orderOnGoing')}`, `${t('orderOnWay')}`];
    var step;
    const totalPrice = Number(this.state.MyRow.totalPrice) + Number(this.state.MyRow.shipPrice)

    switch(this.state.MyRow.status){
        case 'pending':
            step = 0
        break;
        case 'onGoing':
            step = 1
        break;
        case 'Passed':
            step = 2
        break;
    }
if(i18next.language === "EN" ){
    return(
    <div>
            <Fab variant="extended" aria-label="Delete" onClick={()=>{this.setState({showRow: false})}} className={classes.fab}>
                <BackIcon className={classes.extendedIcon} />
                    {t('back')}
            </Fab>
            {this.state.MyRow.status !== 'Failed' ?
            <Stepper activeStep={step} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                <StepLabel>{<h4>{label}</h4>}</StepLabel>
                </Step>))}
            </Stepper>
            :undefined}

            <ListItem classes={classes.listItem}>
                <ListItemIcon>{<Euro />}</ListItemIcon>
                <ListItemText primary={<h3>{t('totalPrice')}: {<CurrencyFormat value={totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h3>} />
            </ListItem>
            <Divider/>
            <ListItem>
                <ListItemIcon>{<OrderStatus />}</ListItemIcon>
                <ListItemText primary={<h3>{t('orderStatus')}: {this.state.MyRow.status}</h3>} />
            </ListItem>
            <Divider/>
            <ListItem>
                <ListItemIcon>{<OrderComment />}</ListItemIcon>
                <ListItemText primary={<h3>{t('orderComment')}: {this.state.MyRow.comment}</h3>} />
            </ListItem>
            {this.state.MyRow.cart.map((row, index) => {
                return(
                <div className="col-xs-12 col-md-4 col-lg-4" key={index}>
                <Card className={classes.card}>
                    <CardActionArea>
                    <CardMedia image={'null'}>
                        <img src={row.defaultImage} alt={'Product'} className="userOrdersImages" />
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            {row.Name.length > 20 ? (((row.Name).substring(0,20-3)) + '...') : row.Name}
                        </Typography> 
                        <Typography variant="h5" color="textSecondary">
                            <CurrencyFormat value={row.price.toFixed(2)} displayType={'text'} thousandSeparator={true} /> {t('currency')}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {t('quantity')}: x{row.quantity}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {row.size && `${t('size')}: ${row.size}` }
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {row.info && `Type: ${row.info}`}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {row.color && `${t('color')}: ${row.color}`}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {row.option && `${t('option')}: ${row.option}`}
                        </Typography>
                    </CardContent>

                    </CardActionArea>
                </Card>
                </div>)
            })}
    </div>
    )
}
else{
    return(
    <div>
    <Fab variant="extended" aria-label="Delete" onClick={()=>{this.setState({showRow: false})}} className={classes.fab}>
        <BackIcon className={classes.extendedIcon} />
            {t('back')}
    </Fab>
    {this.state.MyRow.status !== 'Failed' ?
    <Stepper activeStep={step} alternativeLabel>
    {steps.map((label, index) => (
        <Step key={index}>
        <StepLabel>{<h4>{label}</h4>}</StepLabel>
        </Step>))}
    </Stepper>
    :undefined}

    <ListItem classes={classes.listItem}>
        <ListItemText style={{textAlign: "right"}} primary={<h3>{t('totalPrice')}: {<CurrencyFormat value={totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />} {t('currency')}</h3>} />
        <ListItemIcon>{<Euro />}</ListItemIcon>
    </ListItem>
    <Divider/>
    <ListItem>
        <ListItemText style={{textAlign: "right"}} primary={<h3>{this.state.MyRow.status} :{t('orderStatus')}</h3>} />
        <ListItemIcon>{<OrderStatus />}</ListItemIcon>
    </ListItem>
    <Divider/>
    <ListItem>
        <ListItemText style={{textAlign: "right"}} primary={<h3>{this.state.MyRow.comment} :{t('orderComment')}</h3>} />
        <ListItemIcon>{<OrderComment />}</ListItemIcon>
    </ListItem>
    {this.state.MyRow.cart.map((row, index) => {
    return(
    <div className="col-xs-12 col-md-4 col-lg-4" key={index}>
    <Card className={classes.card}>
        <CardActionArea>
        <CardMedia image={'null'}>
            <img src={row.defaultImage} alt={'Product'} className="userOrdersImages" />
        </CardMedia>
        <CardContent style={{textAlign: 'right'}}>
            <Typography gutterBottom variant="h3" component="h2">
                {row.Name}
            </Typography>
            <Typography variant="h5" color="textSecondary">
                    {t('currency')} <CurrencyFormat value={row.price.toFixed(2)} displayType={'text'} thousandSeparator={true} /> 
            </Typography>
            <Typography variant="h5" color="textSecondary">
                {row.quantity}x : {t('quantity')}
            </Typography>
            <Typography variant="h5" color="textSecondary">
                {row.size && `${row.size} :${t('size')}` }
            </Typography>
            <Typography variant="h5" color="textSecondary" >
                {row.color && `${row.color} :${t('color')}`}
            </Typography>
            <Typography variant="h5" color="textSecondary">
                {row.option && `${row.option} :${t('optionSelected')}`}
            </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    </div>)
    })}
    </div>
    )
}
}

render(){
  const { t } = this.props;
  const { classes } = this.props;

  if(this.state.loaded){
    if (this.state.ordersData.length > 0){
        if(!this.state.showRow){
            return(
                <div>
                    {this.drawOrderCards()}
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.orderOpen()}
                </div>
            )
      }
  }
  else{
    return(
        <div style={{textAlign: i18next.language === "EN" ? "left" : "right"}}>
            <Typography gutterBottom className={classes.typo1}>
                {t('noOrdersText')}
            </Typography>
            <Typography gutterBottom className={classes.typo2}>
                {t('noOrdersText2')}
            </Typography>
      </div>
    )
  }
}
else{
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
  )(UserOrders);