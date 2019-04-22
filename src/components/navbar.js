import React from 'react';
import '../Mycss.css';
import '../svg.css';
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
import Phone from '@material-ui/icons/Phone';
import Menu from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ReactRouter from 'flux-react-router';
import {loginFunction} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GlobalCart from '../containers/global-cart';
import LangIcon from '../containers/langIcon';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';

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

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 4,
  },
  tabs: {
    position: 'relative',
    display: 'none',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.025),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.03),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      marginLeft: theme.spacing.unit * 15,
      width: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'block',
      marginLeft: theme.spacing.unit * 40,
      width: 'auto',
    },
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit,
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
});

const theme = createMuiTheme({
  palette: {
      primary: { main: '#212121', contrastText: "#fff" },
      secondary: { main: '#3f51b5', contrastText: "#fff" }
  },
});

class Navbar extends React.Component {

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    Url: this.props.server.main,
    drawer: false,
    ErrorModal: false,
    ErrorMsg: ''
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

  profile() {
    if(!this.props.loginData.isAdmin){
        ReactRouter.goTo("/account")}
    else if(this.props.loginData.isAdmin && this.props.loginData.session === 1){
        ReactRouter.goTo("/agentdashboard")} 
    else if(this.props.loginData.isAdmin && this.props.loginData.session === 2){ 
        ReactRouter.goTo("/admindashboard")}
    else{
      undefined
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
    }
  };

  render() {
    const { classes } = this.props;
    const { page } = this.props;
    const { t } = this.props;

    const renderMobileDrawer = (
        <Drawer anchor="right" open={this.state.drawer} onClose={this.toggleDrawer('drawer', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('drawer', false)}
            onKeyDown={this.toggleDrawer('drawer', false)}
          >
          {this.props.loginData.loggedState ?
          <Chip
              icon={<FaceIcon />}
              label={<h4>{this.props.loginData.userName}</h4>}
              onClick={this.profile.bind(this)}
              onDelete={this.logoutClick.bind(this)}
              className={classes.chip}
          />
          : undefined}  

          {!this.props.loginData.loggedState ?  
          <Button onClick={()=>{ReactRouter.goTo("/login")}} variant="contained" color="secondary" className={classes.button}>
              <h6>{t('login')}</h6>
              <AccountCircle className={classes.rightIcon}/>
          </Button> : undefined}

          <Divider />

          <ListItem onClick={()=>{this.handleChange(null, 0)}} button key={"Home"} selected={page === 0}>
              <ListItemIcon>{<Home />}</ListItemIcon>
              <ListItemText primary={"Home"} />
          </ListItem>

          <ListItem onClick={()=>{this.handleChange(null, 1)}} button key={"Market"} selected={page === 1}>
              <ListItemIcon>{<ShoppingCart />}</ListItemIcon>
              <ListItemText primary={"Market"} />
          </ListItem>

          <ListItem onClick={()=>{this.handleChange(null, 2)}} button key={"Contact Us"} selected={page === 2}>
              <ListItemIcon>{<Phone />}</ListItemIcon>
              <ListItemText primary={"Contact Us"} />
          </ListItem>

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
              <Tab label={<h5 style={{color: "white"}}>{t('home')}</h5>} />
              <Tab label={<h5 style={{color: "white"}}>{t('market')}</h5>} />
              <Tab label={<h5 style={{color: "white"}}>{t('contact')}</h5>} />
            </Tabs>
            </div>
            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
                  <LangIcon />
                  <GlobalCart />

                  {this.props.loginData.loggedState ?
                  <Chip
                      icon={<FaceIcon />}
                      label={<h4>{this.props.loginData.userName}</h4>}
                      onClick={this.profile.bind(this)}
                      onDelete={this.logoutClick.bind(this)}
                      className={classes.chip}
                  />
                  : undefined}  

                  {!this.props.loginData.loggedState ?  
                  <Button onClick={()=>{ReactRouter.goTo("/login")}} variant="contained" color="secondary" className={classes.button}>
                      <h6>{t('login')}</h6>
                      <AccountCircle className={classes.rightIcon}/>
                  </Button> : undefined}  

            </div>
            <div className={classes.sectionMobile}>
              <LangIcon />
              <GlobalCart />
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
    extras: state.extras
  }
}


const matchDispatchToProps = dispatch => bindActionCreators(
{
  loginFunction
},
dispatch,
)

export default compose(
  withStyles(styles),
  withNamespaces(),
  connect(mapStateToProps, matchDispatchToProps),
)(Navbar);