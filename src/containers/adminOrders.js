import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import { ToastContainer, toast, Flip } from 'react-toastify';
import Loader from '../containers/loader';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ViewOrder from '@material-ui/icons/ThumbUp';
import Chip from '@material-ui/core/Chip';
import BackIcon from '@material-ui/icons/SkipPrevious';
import Fab from '@material-ui/core/Fab';

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#3e2723' }, // custom color in hex
        secondary: { 'A400': '#ffab00' }
    }
});

const styles = theme => ({
    card: {
        minHeight: 350,
        maxHeight: 350,
        margin: theme.spacing.unit,
        backgroundColor: fade('#3e2723', 0.225),
      },
    divider:{
        margin: theme.spacing.unit
    },
    media: {
        height: 150,
        width: 120,
      },
    extendedIcon2: {
        marginRight: theme.spacing.unit * 6,
    },
    actions: {
        display: 'flex',
      },
    vodaAvatar: {
        margin: 10,
        width: 60,
        height: 60,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#b71c1c',
      },
    etisAvatar: {
        margin: 10,
        width: 60,
        height: 60,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#1b5e20',
      },
    fawryAvatar: {
        margin: 10,
        width: 60,
        height: 60,
        fontWeight: 'bold',
        color: '#0277bd',
        backgroundColor: '#fdd835',
      },
    cashAvatar: {
        margin: 10,
        width: 60,
        height: 60,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#ff9800',
      },
    chip: {
        margin: theme.spacing.unit,
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20,
        }
    },
});


class AdminOrders extends Component {

    state = {
        headers: {
        'Content-Type': 'application/json',
        'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        orders: [],
        openOrder: false,
        order: ''
    }

    componentDidMount(){
        var that = this
        axios.get(`${this.state.Url}getAdminOrders`, {headers: this.state.headers})
        .then(function (response) {
          that.setState({orders: response.data.data})
        })
        .catch(function (error) {
            // console.log(error)
        })
    }

    drawOrders(){
        const { classes } = this.props;
        return(
        <div>
            <MuiThemeProvider theme={theme}>
                <Grid container justify="center" alignItems="center">
                    <Chip
                        color="primary"
                        label={`Orders Picked (${this.state.orders.length})`}
                        className={classes.chip}
                    />
                </Grid>
            </MuiThemeProvider>
            {this.state.orders.map((order, index) =>{

                return(
                    <div className="col-xs-12 col-md-4 col-lg-4" key={index}>
                          <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    order.paymentMethod === 'Vodafone Cash' ?
                                    <Avatar className={classes.vodaAvatar}>Vodafone</Avatar>
                                :order.paymentMethod === 'Etisalat Cash' ?
                                    <Avatar className={classes.etisAvatar}>Etisalat</Avatar>               
                                :order.paymentMethod === 'Fawry' ?
                                    <Avatar className={classes.fawryAvatar}>Fawry</Avatar>                         
                                :           
                                    <Avatar className={classes.cashAvatar}>Cash</Avatar>} 
                                action={
                                    <IconButton onClick={()=>{this.setState({order: order, openOrder: true})}}> 
                                        <ViewOrder />
                                    </IconButton>
                                }
                                title={<h4>{order.user.Name}</h4>}
                                subheader={<h5>{moment(order.createdAt).format('LL')}</h5>}
                                />
                                <Grid container justify="center" alignItems="center">
                                    <p style={{color: 'brown'}}>{order.comment}</p>
                                </Grid>
                                <Divider variant="middle" className={classes.divider}/>
                                {order.cart.map((imgs, index) => {
                                    return(
                                    <div className="col-xs-2 col-md-2 col-lg-2" key={index}>
                                    <CardMedia
                                        className={classes.media}
                                        image={imgs.defaultImage}
                                        title="Order Images"
                                    />
                                    </div>
                                    )
                                })}
                                <CardContent>
                                </CardContent>
                                <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">

                                </IconButton>
                                <IconButton aria-label="Share">

                                </IconButton>
                                </CardActions>
                            </Card>
                    </div>
                )


            })
            
            
            
            }
        </div>
    )
    }

render(){
    const { classes } = this.props;
    if(this.state.openOrder){
        console.log(this.state.order, "ORDER")
        return(
        <div>
            <MuiThemeProvider theme={theme}>
                <Grid container justify="center" alignItems="center">
                    <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.setState({openOrder: false, order: ''})}} className={classes.fab}>
                        <BackIcon className={classes.extendedIcon2} />
                            Back
                    </Fab>
                </Grid>
            </MuiThemeProvider>
        </div>
        )
    }
    else{
        return(
            <div>
                {this.drawOrders()}
            </div>
        )
    }
    }
}

function mapStateToProps(state){
    return {
        loginData: state.loginSession,
        server: state.server
    }
  }

export default withStyles(styles)(connect(mapStateToProps)(AdminOrders));