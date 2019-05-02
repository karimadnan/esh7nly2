import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import {
  BrowserView,
  MobileView,
} from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withNamespaces } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import compose from 'recompose/compose';
import Visibility from '@material-ui/icons/Visibility';
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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 16,
    },
}))(TableCell);

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
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
    card: {
        marginBottom: theme.spacing.unit,
        backgroundColor: fade('#3F51B5', 0.225),
        maxWidth: 'auto',
        '&:hover': {
            backgroundColor: fade('#3F51B5', 0.325),
          }
      },
      media: {
        height: 350,
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

render(){
  const { t } = this.props;
  const { classes } = this.props;

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
  
  if(this.state.loaded ){
    if (this.state.ordersData.length > 0 && !this.state.showRow){

        var pending = 0
        var onGoing = 0

        this.state.ordersData.map(row => {
          if (row.status === "pending"){
              pending ++;
          }
          else {
              onGoing ++;
          }
        })
            return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell align="center"><h4>{t('viewButton')}</h4></CustomTableCell>
                        <CustomTableCell align="center"><h4>{t('image')}</h4></CustomTableCell>
                        <CustomTableCell align="center"><h4>{t('date')}</h4></CustomTableCell>
                        <CustomTableCell align="center"><h4>{t('comment')}</h4></CustomTableCell>
                        <CustomTableCell align="center"><h4>{t('status')}</h4></CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>

                    {this.state.ordersData.map((row, index) => (
                        
                        <TableRow className={classes.row} key={index}>
                                            
                        <CustomTableCell align="center" >
                            <Tooltip title={<h6>{t('viewButton')}</h6>} aria-label={<h6>{t('viewButton')}</h6>} placement="bottom">
                                <Visibility className={classes.viewOrder} onClick={ () => {this.setState({MyRow: row, showRow: true})}}/>
                            </Tooltip>
                        </CustomTableCell>
                        <CustomTableCell component="th" scope="row">
                        {row.cart.map((imgs, index) => {
                        return(
                            <div class="col-xs-2 col-md-1 col-lg-1" key={index}>
                                <Avatar className={classes.Avatar} alt="PP" src={imgs.defaultImage}/>
                            </div>
                        )

                        })}
                        </CustomTableCell>
                        <CustomTableCell align="center" style={{color: "white",  whiteSpace: "normal", wordWrap: "break-word", fontWeight: "bold"}}>{moment(row.createdAt).format('LL')}</CustomTableCell>
                        <CustomTableCell align="center" style={{color: "white",  whiteSpace: "normal", wordWrap: "break-word", fontWeight: "bold"}}>{row.comment}</CustomTableCell>
                        <CustomTableCell align="center" style={{color: "white", fontWeight: "bold"}}>{row.status}</CustomTableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
          )
  }
  else if(this.state.showRow){
    var totalPrice = 0
    var steps = [`${t('orderPending')}`, `${t('orderOnGoing')}`, `${t('orderOnWay')}`];
    var step;

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

    this.state.MyRow.cart.map(row => {
            totalPrice = totalPrice + row.price
    })

    return(
    <div>
            <Fab variant="extended" aria-label="Delete" onClick={()=>{this.setState({showRow: false})}} className={classes.fab}>
                <BackIcon className={classes.extendedIcon} />
                    {t('back')}
            </Fab>
            {this.state.MyRow.status !== 'Failed' ?
            <Stepper activeStep={step} alternativeLabel>
            {steps.map(label => (
                <Step key={label}>
                <StepLabel>{<h4>{label}</h4>}</StepLabel>
                </Step>))}
            </Stepper>
            :undefined}

            <ListItem>
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
        {this.state.MyRow.cart.map(row => {
            return(
            <div className="col-xs-12 col-md-4 col-lg-4">
            <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={row.defaultImage}
                    title={row.Name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h2">
                        {row.Name}
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
        <div style={{color: "black"}}>
              <h1>{t('noOrdersText')}</h1>
              <p>{t('noOrdersText2')}</p>
        </div>
    )
  }
}
else{
  return(

        <div>
            <PacmanLoader
                css={override}
                sizeUnit={"px"}
                size={100}
                color={'#FFFF00'}
                loading={true}/>
            <h2 style={{color: "black"}}>{t('loading')}...</h2>
    </div>
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