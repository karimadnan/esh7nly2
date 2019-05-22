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
import Chip from '@material-ui/core/Chip';
import BackIcon from '@material-ui/icons/SkipPrevious';
import Fab from '@material-ui/core/Fab';
import Euro from '@material-ui/icons/EuroSymbol';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CurrencyFormat from 'react-currency-format';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Timer from '@material-ui/icons/Timer';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderComment from '@material-ui/icons/SpeakerNotes';
import TextField from '@material-ui/core/TextField';
import NextIcon from '@material-ui/icons/Done';
import Motorcycle from '@material-ui/icons/Motorcycle';
import Failed from '@material-ui/icons/ReportProblem';
import Fake from '@material-ui/icons/ThumbDown';

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#3e2723' }, // custom color in hex
        secondary: { 'A400': '#ffab00' }
    }
});

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 280,
        [theme.breakpoints.up('sm')]: {
            width: 420,
          }
    },
    fab:{
        margin: theme.spacing.unit
    },
    panel:{
        margin: theme.spacing.unit,
        backgroundColor: fade('#3e2723', 0.725),
    },
    heading: {
        fontSize: theme.typography.pxToRem(25),
        fontWeight: theme.typography.fontWeightRegular,
        color: 'white'
      },
    card: {
        minHeight: 350,
        maxHeight: 350,
        maxWidth: 'auto',
        margin: theme.spacing.unit,
        backgroundColor: fade('#3e2723', 0.225),
        '&:hover': {
            backgroundColor: fade('#3e2723', 0.325),
          }
      },
      card2: {
        margin: theme.spacing.unit,
        backgroundColor: fade('#3e2723', 0.225),
        '&:hover': {
            backgroundColor: fade('#3e2723', 0.325),
          }
      },
    divider:{
        margin: theme.spacing.unit
    },
    media: {
        height: 150,
        width: 120,
      },
    media2: {
        margin: '0 auto',
        height: 250,
        width: 250
    },
    extendedIcon1: {
        marginRight: theme.spacing.unit * 2,
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
        order: '',
        comment: '',
        updateComment: ''
    }

    componentDidMount(){
        this.getOrders();
    }

    getOrders(){
        var that = this
        axios.get(`${this.state.Url}getAdminOrders`, {headers: this.state.headers})
        .then(function (response) {
          that.setState({orders: response.data.data})
        })
        .catch(function (error) {
            // console.log(error)
        })
    }

    Error = (msg) => toast.error(`${msg}`, {
        position: "top-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
    });
    
    Success = (msg) => toast.success(`${msg}`, {
        position: "top-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
    });

    drawOrders(){
        const { classes } = this.props;
        const orders = this.state.orders ? this.state.orders.length : 0
        return(
        <div>
            <MuiThemeProvider theme={theme}>
                <Grid container justify="center" alignItems="center">
                    <Chip
                        color="primary"
                        label={`Orders Picked (${orders})`}
                        className={classes.chip}
                    />
                </Grid>
            </MuiThemeProvider>
            {this.state.orders.map((order, index) =>{
                return(
                    <div className="col-xs-12 col-md-4 col-lg-4" style={{cursor: 'pointer'}} key={index} onClick={()=>{this.setState({order: order, openOrder: true, comment: order.comment})}}>
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

    endOrder(status){
        var data = {orderID: this.state.order._id, status: status}
        var that = this
        axios.post(this.state.Url+"endOrder", data, {headers: this.state.headers})
        .then(function (response) {
            that.setState({openOrder: false, order: ''});
            that.getOrders();
            that.Success(response.data.message);
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    updateComment(comment){
        if(comment){
        var data = {orderID: this.state.order._id, comment: comment}
        var that = this
        axios.post(this.state.Url+"updateComment", data, {headers: this.state.headers})
        .then(function (response) {
            that.setState({comment: comment})
            that.Success(response.data.message);
            that.getOrders();
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    }

render(){
    const { classes } = this.props;

    if(this.state.openOrder){
        let totalPrice = 0;
    
        this.state.order.cart.map(row => {
            totalPrice = totalPrice + row.price
        })
        console.log(this.state.order, "RODERAS")
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
            
            <div className="col-xs-12 col-md-7 col-lg-7">
                <MuiThemeProvider theme={theme}>
                    <ExpansionPanel className={classes.panel}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>User Info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.heading}>
                            <Grid container justify="flex-start" alignItems="center">
                            Name: {this.state.order.user.Name}
                            </Grid>
                            <Grid container justify="flex-start" alignItems="center">
                            Phone: {this.state.order.user.Phone}
                            </Grid>
                            <Grid container justify="flex-start" alignItems="center">
                            Shipping Data: 
                            </Grid>
                            {this.state.order.user.ShippingData.Area}
                            {this.state.order.user.ShippingData.City}
                            {this.state.order.user.ShippingData.locationType}
                            {this.state.order.user.ShippingData.StreetNameNo}
                            {this.state.order.user.ShippingData.ShippingNote}

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ListItem>
                        <ListItemIcon>{<OrderComment />}</ListItemIcon>
                        <ListItemText primary={<h3 style={{whiteSpace: "normal", wordWrap: "break-word"}}>{this.state.comment}</h3>} />
                    </ListItem>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="Comment"
                            label="Comment"
                            type="text"
                            className={classes.textField}
                            margin="normal"
                            onChange={e => this.setState({updateComment: e.target.value})}
                        />
                            <Fab color="primary" variant="extended" aria-label="accActivate" onClick={()=>{this.updateComment(this.state.updateComment)}} className={classes.fab}>
                                <NextIcon className={classes.extendedIcon2} />
                                <h5>Update</h5>
                            </Fab>
                    </form>
                    <ListItem>
                        <ListItemIcon>{<Timer />}</ListItemIcon>
                        <ListItemText primary={<h3>{moment(this.state.order.createdAt).format('LLL')}</h3>} />
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemIcon>{<Euro />}</ListItemIcon>
                        <ListItemText primary={<h3>Grand Total: {<CurrencyFormat value={totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} />} EGP</h3>} />
                    </ListItem>
                    <Fab color="primary" variant="extended" aria-label="accActivate" onClick={()=>{this.endOrder(1)}} className={classes.fab}>
                        <Motorcycle className={classes.extendedIcon1} />
                        <h5>Order Delivered</h5>
                    </Fab>
                    <Fab color="primary" variant="extended" aria-label="accActivate" onClick={()=>{this.endOrder(2)}} className={classes.fab}>
                        <Failed className={classes.extendedIcon1} />
                        <h5>Order Failed</h5>
                    </Fab>
                    <Fab color="primary" variant="extended" aria-label="accActivate" onClick={()=>{this.endOrder(3)}} className={classes.fab}>
                        <Fake className={classes.extendedIcon1} />
                        <h5>Fake Order</h5>
                    </Fab>
                </MuiThemeProvider>
            </div>

            <div className="col-xs-12 col-md-5 col-lg-5">
                {this.state.order.cart.map((row, index) =>{
                return(
                <Card className={classes.card2} key={index}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media2}
                            image={row.defaultImage}
                            title={row.Name}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            {row.Name}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            <CurrencyFormat value={row.price.toFixed(2)} displayType={'text'} thousandSeparator={true} /> EGP
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            qty: x{row.quantity}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {row.size && `Size: ${row.size}` }
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {row.info && `Type: ${row.info}`}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                                {row.color && `Color: ${row.color}`}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                                {row.option && `Option: ${row.option}`}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                )})}
            </div>
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