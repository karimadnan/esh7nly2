import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import { ToastContainer, toast, Flip } from 'react-toastify';
import Loader from '../containers/loader';
import PickIcon from '@material-ui/icons/AssignmentTurnedIn';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#3e2723' }, // custom color in hex
        secondary: { 'A400': '#ffab00' }
    }
});

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#3e2723',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 16,
    },
}))(TableCell);

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit,
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
    chip: {
        margin: theme.spacing.unit,
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20,
        }
    },
    Avatar: {
        width: 60,
        height: 60,
    },
    viewOrder: {
          color: '#fff',
          cursor: 'pointer',
        '&:hover': {
          color: fade('#ffab00', 0.53),
        },
    },
    row: {
        backgroundColor: fade('#3e2723', 0.825),
      '&:nth-of-type(odd)': {
        backgroundColor: fade('#3e2723', 0.625),
      },
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
});

class Leads extends Component {

state = {
    headers: {
    'Content-Type': 'application/json',
    'authorization': this.props.loginData.token},
    Url: this.props.server.main,
    ordersData: {},
    loaded: false,
    ordersCount: 0
}

componentDidMount(){
    if(!this.state.loaded){
        this.getLeads()
    }
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

totalOrders(){
    var that = this
    axios.get(`${this.state.Url}getAdminOrders`, {headers: this.state.headers})
    .then(function (response) {
      that.setState({ordersCount: response.data.data.length})
    })
    .catch(function (error) {
        // console.log(error)
    })
}

getLeads(){
    var that = this
    axios.get(`${this.state.Url}getOrdersByType?status=pending`, {headers: this.state.headers})
    .then(function (response) {
      that.totalOrders();
      that.setState({ordersData: response.data.data, loaded: true});
    })
    .catch(function (error) {
      that.setState({loaded: true})
    })
}

assignLead(lead){
    var that = this
    axios.get(`${this.state.Url}assginlead?orderID=${lead}`, {headers: this.state.headers})
    .then(function (response) {
        that.getLeads();
        that.Success(response.data.message);
    })
    .catch(function (error) {
        that.getLeads();
        that.Error(error.response.data.message);
    })
}


render(){
  const { classes } = this.props;

  if(this.state.loaded){
    if(this.state.ordersData){
    return(
    <div>
        <MuiThemeProvider theme={theme}>
            <Grid container justify="center" alignItems="center">
                <Chip
                    color="primary"
                    label={`Orders Picked (${this.state.ordersCount})`}
                    className={classes.chip}
                />
            </Grid>
        </MuiThemeProvider>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <CustomTableCell align="center"></CustomTableCell>
                    <CustomTableCell align="center"><h4>Pick</h4></CustomTableCell>
                    <CustomTableCell align="center"><h4>Status</h4></CustomTableCell>
                    <CustomTableCell align="center"><h4>Type</h4></CustomTableCell>
                    <CustomTableCell align="center"><h4>Date</h4></CustomTableCell>
                </TableRow>
                </TableHead>
                <TableBody>

                {this.state.ordersData.map((row, index) => (
                    
                    <TableRow className={classes.row} key={index}>
                                        
                    <CustomTableCell align="center">
                        {row.paymentMethod === 'Vodafone Cash' ?
                            <Avatar className={classes.vodaAvatar}>Vodafone</Avatar>
                        :row.paymentMethod === 'Etisalat Cash' ?
                            <Avatar className={classes.etisAvatar}>Etisalat</Avatar>               
                        :row.paymentMethod === 'Fawry' ?
                            <Avatar className={classes.fawryAvatar}>Fawry</Avatar>                         
                        :           
                            <Avatar className={classes.cashAvatar}>Cash</Avatar>} 
                            
                    </CustomTableCell>
                    <CustomTableCell align="center" >
                        <Tooltip title={<h6>Take Order</h6>} aria-label={'Pick'} placement="bottom">
                            <PickIcon className={classes.viewOrder} onClick={()=>{this.assignLead(row._id)}}/>
                        </Tooltip>
                    </CustomTableCell>
                    <CustomTableCell align="center">{row.status}</CustomTableCell>
                    <CustomTableCell align="center">{row.orderType}</CustomTableCell>
                    <CustomTableCell align="center">{moment(row.createdAt).format('LL')}</CustomTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

        </Paper>
    </div>
    )
    }
    else {
        return(
        <div>
            <MuiThemeProvider theme={theme}>
                <Grid container justify="center" alignItems="center">
                    <Chip
                        color="primary"
                        label={`Orders Picked (${this.state.ordersCount})`}
                        className={classes.chip}
                    />
                </Grid>
            </MuiThemeProvider>
            <div className="WhiteBG" style={{color: "black"}}>

                <div className="container">
                    <h1>No Leads Found</h1>
                    <p>Refresh in few minutes.</p>
                </div>
            </div>
        </div>
      )
    }
}
else{
  return(
        <Loader />
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

export default withStyles(styles)(connect(mapStateToProps)(Leads));