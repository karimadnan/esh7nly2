import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/AddCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Phone from '@material-ui/icons/Phone';
import Menu from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ReactRouter from 'flux-react-router';
import {loginFunction, updateCart} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GlobalCart from '../containers/global-cart';
import ModeSwitcher from '../containers/modeSwitcher';
import LangIcon from '../containers/langIcon';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import Pp from '../Images/avatar.png';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import CurrencyFormat from 'react-currency-format';
import i18next from 'i18next';

const customStyles = {
  overlay: {
    background: "transparent"
  },
  modal: {
    backgroundColor: 'rgba(219, 105, 105, 0.9)',
    color: "white",
    borderRadius: '10px',
  }
}

const currencyStyle = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.9)'
  },
  modal: {
    marginTop: 80,
    backgroundColor: '#fff',
    color: "Black",
    borderRadius: '6.35px',
  }
}

const styles = theme => ({
  tabLabel:{
    color: '#b5b5b5',
    fontSize: 17,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  tabLabelActive:{
    
    fontSize: 17,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  balHeader:{
    fontWeight: 'bold',
    fontSize: 14
  },
  balInfo:{
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
    marginTop: 10
  },
  card: {
    border: "2px dashed grey",
    margin: 10,
    minHeight: 400
  },
  cardHighlighted: {
    border: "2px solid #3F51B5",
    margin: 10
  },
  billEgp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  avatar: {
    textAlign: 'center',
    backgroundColor: "#3F51B5",
    margin: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    height: 100,
    width: 100
  },
  balAvatar: {
    width: 35,
    height: 35,
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    backgroundColor: '#c4ccdf',
  },
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 4,
  },
  paper: {
    background: "#212121",
    maxWidth: 190
  },
  selected: {
    backgroundColor: "#fff"
  },
  divider: {
    background: "#fff"
  },
  textColor: {
    color: 'white'
  },
  logoutButton: {
    position: 'absolute',
    bottom: 0
  },
  tabs: {
    position: 'relative',
    display: 'none',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      marginLeft: theme.spacing.unit * 5,
      width: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'block',
      marginLeft: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit,
      width: 'auto',
    },
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  chipMobile: {
    margin: theme.spacing.unit,
  },
  chipDesktop: {
    margin: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  selectedListItem:{
      borderLeft: '4px solid #3F51B5'
  }
});

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const theme = createMuiTheme({
  palette: {
      primary: { main: '#212121', contrastText: "#fff" },
      secondary: { main: '#3f51b5', contrastText: "#fff" }
  },
});

const adminTheme = createMuiTheme({
  palette: {
      primary: { main: '#fafafa', contrastText: "#fff" },
      secondary: { main: '#3e2723', contrastText: "#fff" }
  },
});

class Navbar extends React.Component {

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    Url: this.props.server.main,
    drawer: false,
    ErrorModal: false,
    ErrorMsg: '',
    cart: '',
    totalPrice: '',
    currencyModal: false,
    balToAdd: 0
  };

  componentWillMount(){
    var that = this
    var token = this.props.loginData.token
    if (this.props.loginData.loggedState){
    if(token){
      axios.get(this.state.Url+"checkToken", 
      {
        headers: { 'Authorization': token }
      }
    )
      .then(function (response) {
      })
      .catch(function (error) {
        // console.log(error)
        that.setState({
          ErrorModal:true,
          ErrorMsg: "Login session expired, Please re-login",
        })
        that.props.loginFunction(null, 'logout')
      })
  }
  }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  updateInput(key, value) {
    if(value < 10000){
      this.setState({ [key]: value }, () => {
        console.log(this.state.balToAdd, "BALANCE")
      });
    }
    else{
      this.setState({ [key]: 10000 });
    }
  }

  onOpenModal = (type) => {
    this.setState({[type]: true });
  };
 
  onCloseModal = (type) => {
    this.setState({[type]: false });
  };
  
  logout =() =>{
    this.props.loginFunction(null, 'logout')
    ReactRouter.goTo("/main")
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cart.cart !== this.props.cart.cart){
          if(this.props.loginData.loggedState){
            this.props.updateCart( 
                {cart: nextProps.cart.cart, totalPrice: String(nextProps.cart.totalPrice)}, this.props.loginData.token)
            }
    }
  }

  profile() {
    if(!this.props.loginData.isAdmin){
        ReactRouter.goTo("/account")}
    else if(this.props.loginData.isAdmin && this.props.loginData.session === 1){
        ReactRouter.goTo("/agentdashboard")} 
    else if(this.props.loginData.isAdmin && this.props.loginData.session === 2){ 
        ReactRouter.goTo("/admindashboard")
    }
  }

  logoutClick() {
    this.logout();
  }

  handleChange = (event, value) => {
    switch(value){
      case 0:{
        ReactRouter.goTo("/main")
        break
      }
      case 1:{
        ReactRouter.goTo("/market")
        break
      }
      case 2:{
        ReactRouter.goTo("/contactus")
        break
      }
      default: 
        return undefined
    }
  };

  render() {
    const { classes } = this.props;
    const page  = this.props.page || 0;
    const { t } = this.props;
    const bill = Number(this.state.balToAdd)
    const renderMobileDrawer = (
        <Drawer anchor="right" classes={{ paper: classes.paper }} open={this.state.drawer} onClose={this.toggleDrawer('drawer', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('drawer', false)}
            onKeyDown={this.toggleDrawer('drawer', false)}
          >
          {this.props.loginData.loggedState ?
          <div>
          <MuiThemeProvider theme={this.props.loginData.isAdmin ? adminTheme : theme}>
          <div className="col-xs-12">
            <Chip
                color="secondary"
                avatar={<Avatar alt="PP" src={this.props.loginData.photo ? this.props.loginData.photo : Pp} />}
                label={<h4>{this.props.loginData.userName}</h4>}
                onClick={this.profile.bind(this)}
                className={classes.chipMobile}
            />
            </div>
            <div className="col-xs-12">
              <Chip
                  color="secondary"
                  avatar={<Avatar className={classes.balAvatar}>E£</Avatar>}
                  label={<h4>100 EGP</h4>}
                  onClick={this.profile.bind(this)}
                  onDelete={()=>{this.setState({currencyModal: true})}}
                  deleteIcon={<AddIcon />}
                  className={classes.chipMobile}
              />
            </div>
          </MuiThemeProvider>
          </div>
          : undefined}  

          {!this.props.loginData.loggedState ?  
          <Button onClick={()=>{ReactRouter.goTo("/login")}} variant="contained" color="secondary" className={classes.button}>
              <h6>{t('login')}</h6>
              <AccountCircle className={classes.rightIcon}/>
          </Button> : undefined}

          <Divider variant="middle" classes={{root: classes.divider}}/>

          <ListItem onClick={()=>{this.handleChange(null, 0)}} button key={t('home')} selected={page === 0} classes={{selected: classes.selectedListItem}}>
              <ListItemIcon className={classes.textColor}>{<Home />}</ListItemIcon>
              <ListItemText classes={{ primary: classes.textColor }} primary={t('home')} />
          </ListItem>

          <ListItem onClick={()=>{this.handleChange(null, 1)}} button key={t('market')} selected={page === 1} classes={{selected: classes.selectedListItem}}>
              <ListItemIcon className={classes.textColor}>{<ShoppingCart />}</ListItemIcon>
              <ListItemText classes={{ primary: classes.textColor }} primary={t('market')} />
          </ListItem>

          <ListItem onClick={()=>{this.handleChange(null, 2)}} button key={t('contact')} selected={page === 2} classes={{selected: classes.selectedListItem}}>
              <ListItemIcon className={classes.textColor}>{<Phone />}</ListItemIcon>
              <ListItemText classes={{ primary: classes.textColor }} primary={t('contact')} />
          </ListItem>
          

          <div className={classes.logoutButton}>
            {this.props.loginData.loggedState ?  
            <ListItem onClick={()=>{this.logout()}} button key={t('logout')}>
                <ListItemIcon className={classes.textColor}>{<PowerSettingsNew />}</ListItemIcon>
                <ListItemText classes={{ primary: classes.textColor }} primary={t('logout')} />
            </ListItem>: undefined}
          </div>

          </div>
        </Drawer>
    );

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography onClick={()=>{this.handleChange(null, 0)}} style={{cursor: "pointer"}} variant="h4" >
              <span className="svg-icon-logo svg-icon-logo"/>
            </Typography>
            <div className={classes.tabs} >


            <Tabs
              value={page}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label={<span className={page === 0 ? classes.tabLabelActive : classes.tabLabel}>{t('home')}</span>}/>
              <Tab label={<span className={page === 1 ? classes.tabLabelActive : classes.tabLabel}>{t('market')}</span>} />
              <Tab label={<span className={page === 2 ? classes.tabLabelActive : classes.tabLabel}>{t('contact')}</span>} />
            </Tabs>



            </div>
            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
                  <ModeSwitcher />
                  <LangIcon />
                  <GlobalCart/>

                  {this.props.loginData.loggedState ?
                  <MuiThemeProvider theme={this.props.loginData.isAdmin ? adminTheme : theme}>
                    <Chip
                        color="secondary"
                        avatar={<Avatar alt="PP" src={this.props.loginData.photo ? this.props.loginData.photo : Pp} />}
                        label={<h4>{this.props.loginData.userName}</h4>}
                        onClick={this.profile.bind(this)}
                        onDelete={this.logoutClick.bind(this)}
                        className={classes.chipDesktop}
                    />
                    {!this.props.loginData.isAdmin &&
                    <Chip
                        color="secondary"
                        avatar={<Avatar className={classes.balAvatar}>E£</Avatar>}
                        label={<h4>100 EGP</h4>}
                        onDelete={()=>{this.setState({currencyModal: true})}}
                        deleteIcon={<AddIcon />}
                        className={classes.chipDesktop}
                    />}
                  </MuiThemeProvider>

                  : undefined}  

                  {!this.props.loginData.loggedState ?  
                  <Button onClick={()=>{ReactRouter.goTo("/login")}} variant="contained" color="secondary" className={classes.button}>
                      <h6 style={{fontWeight: "bold"}}>{t('login')}</h6>
                      <AccountCircle className={classes.rightIcon}/>
                  </Button> : undefined}  

            </div>
            <div className={classes.sectionMobile}>
              <LangIcon />
              <GlobalCart/>
              <IconButton aria-haspopup="true" onClick={this.toggleDrawer('drawer', true)} color="inherit">
                <Menu />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileDrawer}
        </MuiThemeProvider>
        <Modal          
            open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
            styles={customStyles}>
            <h2>{this.state.ErrorMsg}</h2>
        </Modal>
        <Modal          
            open={this.state.currencyModal} onClose={this.onCloseModal.bind(this,'currencyModal')} center
            styles={currencyStyle}
            showCloseIcon={false}>
            <div className="contaier">
            <Grid container justify="center" alignItems="center">
                <Typography className={classes.balHeader}>
                  Current Balance: 100 EGP
                </Typography>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image="Null"
                      >
                        <Grid container justify="center" alignItems="center">
                          <Avatar aria-label="Bill" className={classes.avatar}>

                            {this.state.balToAdd > 0 ? 
                            <div>
                              <CurrencyFormat value={bill.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                              <Typography className={classes.billEgp}>
                                EGP
                              </Typography>
                            </div>
                            :
                            <div>
                              <CurrencyFormat value={0.00} displayType={'text'} thousandSeparator={true} />
                              <Typography className={classes.billEgp}>
                                EGP
                              </Typography>
                            </div>
                              
                              
                            } 


                          </Avatar>
                          <input style={{margin: 10}} className="form-control" type="number" min="10" max="10000" onChange={e => this.updateInput("balToAdd", e.target.value)} placeholder={t('Balance')} required></input>
                          <Button variant="contained" color="primary">
                              <h6>{t('Pay Now')}</h6>
                          </Button>
                        </Grid>
                        <Grid container justify="flex-start" alignItems="center">
                        <Typography className={classes.balInfo}>
                          * Minimum amount to add is 10 EGP.
                        </Typography>
                        <Typography className={classes.balInfo}>
                          * Your balance cannot be withdrawen later it will always remain in your GG-Account.
                        </Typography>
                        <Typography className={classes.balInfo}>
                          * Balance can only be spent in our store.
                        </Typography>
                        </Grid>
                      </CardMedia>
                    </Card>
                </div>
            </Grid>
            </div>
        </Modal>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return {
    loginData: state.loginSession,
    server: state.server,
    cart: state.cartItems,
    settings: state.settings
  }
}



const matchDispatchToProps = dispatch => bindActionCreators(
{
  loginFunction,
  updateCart
},
dispatch,
)

export default compose(
  withStyles(styles),
  withNamespaces(),
  connect(mapStateToProps, matchDispatchToProps),
)(Navbar);