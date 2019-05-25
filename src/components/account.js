import React, { Component } from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import {connect} from 'react-redux';
import CountUp from 'react-countup';
import axios from 'axios';
import Orders from '../containers/userOrders';
import {
    BrowserView,
    MobileView,
  } from "react-device-detect";
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';
import Person from '@material-ui/icons/VerifiedUser';
import Mood from '@material-ui/icons/Favorite';
import Email from '@material-ui/icons/Email';
import StayPrimaryPortrait from '@material-ui/icons/StayPrimaryPortrait';
import Whatshot from '@material-ui/icons/Redeem';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Pp from '../Images/avatar.png';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import NextIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import UploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import amumu from '../Images/amumusad.png';
import Modal from 'react-responsive-modal';
import Loader from '../containers/loader';
import {updateProfilePhoto} from '../actions/index';
import {bindActionCreators} from 'redux';
import {Helmet} from "react-helmet";

const ErrorStyle = {
    overlay: {
      background: "transparent"
    },
    modal: {
      backgroundColor: 'rgba(219, 105, 105, 0.9)',
      color: "white",
      borderRadius: '10px',
    },
}

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#3F51B5' }, // custom color in hex
        secondary: { 'A400': '#ff9800' },
        textColor: { 500: '#fafafa' }  // custom color in hex
    }
});

const styles = theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    Avatar: {
        margin: 10,
        width: 150,
        height: 150,
      },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon1: {
        marginRight: theme.spacing.unit,
    },
    extendedIcon2: {
        marginRight: theme.spacing.unit * 3,
    },
    appBar: {
        marginTop: theme.spacing.unit * 2
    }
});

class Account extends Component {

    state = {
        value: 0,
        ErrorModal: false,
        ErrorMsg: '',
        headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        status: '',
        email: '',
        phone: '',
        health: '',
        photo: '',
        fbStatus: '',
        vouchPoints: '',
        actKey: '',
        nav: 'profile'
    }

    componentDidMount(){
        this.loadFbApi();
        this.getUserData();
    }

    onOpenModal = (type) => {
        this.setState({[type]: true });
        };
        
    onCloseModal = (type) => {
        this.setState({[type]: false });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    updateInput(key, value) {
        this.setState({ [key]: value });
    }
    
    healthBar(health){
        var i;
        var hearts = []
            for (i = 0; i < health; i++) {
                hearts.push(<span key={i} className="svg-icon svg-icon-hearts"/>)
            }
            for (i = 0; i < 3-health; i++) {
                hearts.push(<span key={i} className="svg-icon svg-icon-emptyHearts"/>)
            }
          return hearts
    }

    // setPhoto(photo){
    //     let data = {photo: photo}
    //     var that = this
    //     axios.post(this.state.Url+"setUserPhoto", data, {headers: this.state.headers})
    //     .then(function (response) {
    //         that.props.updateProfilePhoto(photo)
    //     })
    //     .catch(function (error) {
    //         console.log(error, "ERROR")
    //     })
    // }

    // getFbPhoto (){
    //     var that = this
    //     window.FB.api(
    //         "/me/picture",
    //         {
    //             "redirect": false,
    //             "height": "150",
    //             "type": "normal",
    //             "width": "150"
    //         },
    //         function (response) {
    //           if (response && !response.error) {
    //               that.setPhoto(response.data.url);
    //           }
    //           else{
    //               console.log(response.error)
    //           }
    //         }
    //     );
    // }

    // updateFbPhoto (){
    //     const { t } = this.props;
    //     var that = this
    //     window.FB.api(
    //         "/me/picture",
    //         {
    //             "redirect": false,
    //             "height": "150",
    //             "type": "normal",
    //             "width": "150"
    //         },
    //         function (response) {
    //           if (response && !response.error) {
    //                 that.setPhoto(response.data.url);
    //           }
    //           else{
    //               console.log(response.error)
    //           }
    //         }
    //     );
    // }

    // fbCheckLogin(){
    //     var that = this
    //     window.FB.getLoginStatus(function(response) {
    //         that.setState({fbStatus: response.status})
    //     });
    // }

    // authFbLogin(){
    //     var that = this
    //     window.FB.login(function(response) {
    //           that.setState({fbStatus: response.status})
    //       }, {scope: 'public_profile'});
    // }
    
    validatePendingUser(){
        const { t } = this.props;
        var that = this
        if(this.state.actKey.length === 6){
            axios.get(this.state.Url+`validateUser?code=${this.state.actKey}`, {headers: this.state.headers})
            .then(function (response) {
                window.location.reload();
            })
            .catch(function (error) {
                that.setState({
                    ErrorModal:true,
                    ErrorMsg:error.response.data.message
                })
            })
        }
        else{
            this.setState({
                ErrorModal:true,
                ErrorMsg: `${t('actKeyError')}`
            })
        }
    }

    Current(){
        const { t } = this.props;
        const { classes } = this.props;
        const accountStatus = this.state.status
        const email = this.state.email
        const userName = this.props.loginData.userName
        // if(!this.state.fbStatus){
        //     this.fbCheckLogin();
        // }
        if(this.state.value === 0){
            return(
            <div>
                <Helmet>
                    <title>{t('profileTitle', {userName})}</title>
                    <meta name="description" content={t('profileTitle', {userName})} />
                </Helmet>

                <Grid container justify="center" alignItems="center">
                    <Avatar alt="Profile Picture" src={this.props.loginData.photo ? this.props.loginData.photo : Pp} className={classes.Avatar} />
                </Grid>

            {i18next.language === "EN" ?
            //  ENGLISH ALIGN
            <div>
               <h1 style={{color: "black"}}>
                <span style={{color: "#3F51B5"}}>
                {t('welcome')}
                </span>, {this.props.loginData.userName}</h1>
                    <ListItem>
                        <ListItemIcon>{<Person />}</ListItemIcon>
                        <ListItemText primary={<h4>{t('accStatus')}: <span style={{fontFamily: "arial", color: this.state.status === "active" ? "Lime" : this.state.status === "pending" ? "#3F51B5" : "red", fontWeight: "bold"}} >
                        {accountStatus === "pending" ? 
                        t('accountPendingStatus')
                        : accountStatus === "active" ?
                        t('accountActiveStatus')
                        : accountStatus === "banned" ?
                        t('accountBannedStatus')
                        : undefined}
                        </span>
                        </h4>} 
                        />
                        {accountStatus === "pending" ?
                            <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="accActivate"
                                label={t('actKeyLabel')}
                                type="number"
                                className={classes.textField}
                                helperText={<h6>{t('actKeyInfo', {email})}</h6>}
                                margin="normal"
                                onChange={e => this.setState({actKey: e.target.value})}
                            />
                            <Fab color="primary" variant="extended" aria-label="accActivate" onClick={()=>{this.validatePendingUser()}} className={classes.fab}>
                                <NextIcon className={classes.extendedIcon2} />
                                <h5>{t('actButtonLabel')}</h5>
                            </Fab>
                        </form>:undefined}
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>{<Mood />}</ListItemIcon>
                        <ListItemText primary={<h4>{t('health')}: {this.healthBar(this.state.health)}</h4>} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>{<Email />}</ListItemIcon>
                        <ListItemText primary={<h4>{t('email')}: {this.state.email}</h4>} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>{<StayPrimaryPortrait />}</ListItemIcon>
                        <ListItemText primary={<h4>{t('phone')}: {this.state.phone}</h4>} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>{<Whatshot />}</ListItemIcon>
                        <ListItemText primary={<h4>{t('ggPoints')}: <CountUp duration={5} end={this.state.vouchPoints}/></h4>} />
                    </ListItem>
                </div>
            :
            // ARABIC ALIGN
            <div>
            <h1 style={{color: "black", textAlign: "right"}}>
             <span style={{color: "#3F51B5"}}>
             {t('welcome')}
             </span>, {this.props.loginData.userName}</h1>
                 <ListItem>
                 {accountStatus === "pending" ?
                         <form className={classes.container} noValidate autoComplete="off">
                         <TextField
                             id="accActivate"
                             label={t('actKeyLabel')}
                             type="number"
                             className={classes.textField}
                             helperText={<h6>{t('actKeyInfo', {email})}</h6>}
                             margin="normal"
                             onChange={e => this.setState({actKey: e.target.value})}
                         />
                         <Fab color="primary" variant="extended" aria-label="accActivate" onClick={()=>{this.validatePendingUser()}} className={classes.fab}>
                             <NextIcon className={classes.extendedIcon2} />
                             <h5>{t('actButtonLabel')}</h5>
                         </Fab>
                     </form>:undefined}
                    <ListItemText style={{textAlign: "right"}} primary={<h4>{t('accStatus')}: 
                        <span style={{fontFamily: "arial", color: this.state.status === "active" ? "Lime" : this.state.status === "pending" ? "#3F51B5" : "red", fontWeight: "bold"}} >
                            {accountStatus === "pending" ? 
                            t('accountPendingStatus')
                            : accountStatus === "active" ?
                            t('accountActiveStatus')
                            : accountStatus === "banned" ?
                            t('accountBannedStatus')
                            : undefined}
                        </span>
                     </h4>} />

                     <ListItemIcon>{<Person />}</ListItemIcon>
                 </ListItem>
                 <Divider />
                 <ListItem>
                    <ListItemText style={{textAlign: "right"}} primary={<h4>{this.healthBar(this.state.health)} :{t('health')}</h4>} />
                     <ListItemIcon>{<Mood />}</ListItemIcon>
                 </ListItem>
                 <Divider />
                 <ListItem>
                     <ListItemText style={{textAlign: "right"}} primary={<h4>{this.state.email} :{t('email')}</h4>} />
                     <ListItemIcon>{<Email />}</ListItemIcon>
                 </ListItem>
                 <Divider />
                 <ListItem>
                     <ListItemText style={{textAlign: "right"}} primary={<h4> {this.state.phone} :{t('phone')}</h4>} />
                     <ListItemIcon>{<StayPrimaryPortrait />}</ListItemIcon>
                 </ListItem>
                 <Divider />
                 <ListItem>
                     <ListItemText style={{textAlign: "right"}} primary={<h4> <CountUp duration={5} end={this.state.vouchPoints}/> :{t('ggPoints')}</h4>} />
                     <ListItemIcon>{<Whatshot />}</ListItemIcon>
                 </ListItem>
             </div>
            }
            </div>

            )
        }
      else if (this.state.value === 1){
          const userName = this.props.loginData.userName
          return(
          <div>
            <Helmet>
                <title>{t('ordersTitle', {userName})}</title>
                <meta name="description" content={t('ordersTitle', {userName})} />
            </Helmet>
            <Orders/>
          </div>
        )
      }
      else if (this.state.value === 2){
        const userName = this.props.loginData.userName
        return(
          <div >
            <Helmet>
                <title>{t('historyTitle', {userName})}</title>
                <meta name="description" content={t('historyTitle', {userName})} />
            </Helmet>
          </div>
      )
    }
    }

    getUserData(){
        let Data = {token: this.props.loginData.token}
        var that = this
        axios.post(this.state.Url+"getUserbyId", Data, {headers: this.state.headers})
        .then(function (response) {
            const info = response.data.doc
            that.setState({status: info.status, 
                email: info.Email,
                phone: info.Phone,
                health: info.health,
                vouchPoints: info.VouchPoints,
                photo: info.Photo})
        })
        .catch(function (error) {
            // console.log(error.response.data.message, "FAIL")
        })
    }

    loadFbApi(){
        window.fbAsyncInit = function() {
            window.FB.init({
              appId: "1984023341904164",
              cookie: true,
              status: true,
              xfbml: true,
              version: "v3.2"
            });
          };
          (function(d, s, id) {
            var js, fjs=d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js=d.createElement(s); js.id=id;
            js.src="//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, "script", "facebook-jssdk"));
    }

render() {
    const { t } = this.props;
    const { classes } = this.props;
    const { value } = this.state;

    if (!this.props.loginData.loggedState || this.props.loginData.isAdmin){
        return (
            <div class ="GG-BG-INVERSE">
            <Helmet>
                <title>403 (Forbidden)</title>
                <meta name="description" content="403 (Forbidden)" />
            </Helmet>
            <div class="container">
              <div class="WhiteBG" style={{color: "black"}}>
                  <h1>403 (Forbidden)</h1>
                  <p> {t('403')}.</p>
              </div>
            </div>
            <Navbar />
          </div>
        )
        }
    else{
        return (
                <div className="GG-BG-INVERSE">
                       {!this.state.status ? <Loader />
                       :
                        <div className="container" style={{color: "white"}}>
                            <div className={classes.root}>
                                <MuiThemeProvider theme={theme}>
                                    <AppBar position="static" color="primary" className={classes.appBar}>
                                        <Tabs
                                        value={value}
                                        onChange={this.handleChange}
                                        variant="scrollable"
                                        scrollButtons="on"
                                        indicatorColor="secondary"
                                        textColor="secondary"
                                        >
                                        <Tab label={<h4 style={{fontWeight: "bold", color: value !== 0 && "white"}}>{t('profile')}</h4>} />
                                        <Tab label={<h4 style={{fontWeight: "bold", color: value !== 1 && "white"}}>{t('orders')}</h4>} />
                                        <Tab label={<h4 style={{fontWeight: "bold", color: value !== 2 && "white"}}>{t('history')}</h4>} />
                                        </Tabs>
                                    </AppBar>
                                </MuiThemeProvider>
                                <div className="ProfileBGW">
                                        {this.Current()}
                                </div>
                            </div>
                        </div>} 

                    <Navbar />
                    <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
                        styles={ErrorStyle}>
                        <h3 class="col-xs-6">{this.state.ErrorMsg}</h3>
                        <img style ={{width: 150, height: 120}} class="col-xs-6" src={amumu} alt=""></img> 
                    </Modal>
                </div>
            )
    }
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        loginData: state.loginSession,
        server: state.server
    }
  }
  
const matchDispatchToProps = dispatch => bindActionCreators(
    {
        updateProfilePhoto
    },
    dispatch,
)

  export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps, matchDispatchToProps),
  )(Account);